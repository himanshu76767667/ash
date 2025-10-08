import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion';
import { format, addDays, subDays, isSameDay, parseISO, isAfter, startOfDay } from 'date-fns';
import { getDaySchedule } from '@/lib/schedule';
import { subscribeToEvents } from '@/lib/eventService';
import { UserEvent } from '@/lib/types';
import ClassBlock from '@/components/ClassBlock';
import EventModal from '@/components/EventModal';
import UpcomingList from '@/components/UpcomingList';
import FAB from '@/components/FAB';
import SettingsModal from '@/components/SettingsModal';
import { initializeNotifications, scheduleClassReminder, scheduleEventReminder } from '@/lib/notifications';
import { setupBackButton, onVisibilityChange } from '@/lib/mobileUtils';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UserEvent | null>(null);
  const [direction, setDirection] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Handle mobile back button
  useEffect(() => {
    const cleanup = setupBackButton(() => {
      if (isSettingsOpen) {
        setIsSettingsOpen(false);
      } else if (isModalOpen) {
        setIsModalOpen(false);
      } else if (!isSameDay(currentDate, new Date())) {
        // Go back to today
        setDirection(0);
        setCurrentDate(new Date());
      }
    });
    return cleanup;
  }, [isModalOpen, isSettingsOpen, currentDate]);

  // Handle app visibility (refresh notifications when app comes to foreground)
  useEffect(() => {
    const cleanup = onVisibilityChange((isVisible) => {
      if (isVisible && 'Notification' in window) {
        // Just refresh notification permission status
        setNotificationsEnabled(Notification.permission === 'granted');
      }
    });
    return cleanup;
  }, []);

  // Initialize notifications on mount
  useEffect(() => {
    const setupNotifications = async () => {
      if ('Notification' in window) {
        setNotificationsEnabled(Notification.permission === 'granted');
      }
    };
    setupNotifications();
  }, []);

  // Subscribe to events from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToEvents((updatedEvents) => {
      setEvents(updatedEvents);
    });
    return () => unsubscribe();
  }, []);

  // Schedule reminders for today's classes
  useEffect(() => {
    if (!notificationsEnabled) return;

    const schedule = getDaySchedule(new Date());
    Object.values(schedule).forEach((classItem) => {
      scheduleClassReminder(
        classItem.courseCode,
        classItem.courseName,
        classItem.time,
        classItem.classroom
      );
    });
  }, [notificationsEnabled]);

  // Schedule reminders for upcoming events
  useEffect(() => {
    if (!notificationsEnabled) return;

    events.forEach((event) => {
      if (!event.completed) {
        scheduleEventReminder(
          event.type,
          event.courseCode,
          event.title,
          event.date,
          event.time
        );
      }
    });
  }, [events, notificationsEnabled]);

  const schedule = getDaySchedule(currentDate);
  const todayEvents = events.filter((event) =>
    isSameDay(parseISO(event.date), currentDate)
  );

  const upcomingDeadlines = events
    .filter((e) => e.type === 'deadline' && !e.completed && isAfter(parseISO(e.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  const upcomingExams = events
    .filter((e) => e.type === 'exam' && !e.completed && isAfter(parseISO(e.date), new Date()))
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());

  // Check if viewing today
  const isToday = isSameDay(currentDate, new Date());

  // Handle pull-to-refresh
  const handlePullStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (scrollRef.current && scrollRef.current.scrollTop === 0 && info.offset.y > 0) {
      setIsPulling(true);
    }
  };

  const handlePullMove = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isPulling && scrollRef.current && scrollRef.current.scrollTop === 0) {
      const distance = Math.min(info.offset.y, 120);
      setPullDistance(distance);
    }
  };

  const handlePullEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isPulling && pullDistance > 80) {
      // Trigger refresh - go back to today
      await controls.start({ scale: 0.95, transition: { duration: 0.05 } });
      setDirection(0);
      setCurrentDate(new Date());
      await controls.start({ scale: 1, transition: { duration: 0.05 } });
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  const handleSwipe = (offset: number) => {
    if (offset > 80) {
      setDirection(-1);
      setCurrentDate((prev) => subDays(prev, 1));
    } else if (offset < -80) {
      setDirection(1);
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    handleSwipe(info.offset.x);
  };

  const goToToday = () => {
    setDirection(0);
    setCurrentDate(new Date());
  };

  const openModal = (event?: UserEvent) => {
    setEditingEvent(event || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Combine classes and events for the day
  const allDayItems = [
    ...Object.values(schedule),
    ...todayEvents.map((e) => ({ ...e, isEvent: true })),
  ].sort((a, b) => {
    const timeA = (a as any).time;
    const timeB = (b as any).time;
    return timeA.localeCompare(timeB);
  });

  return (
    <div 
      ref={scrollRef}
      className="min-h-screen bg-background text-white pb-24 overflow-y-auto relative"
      style={{ 
        paddingTop: isPulling ? `${pullDistance * 0.5}px` : '0',
        transition: isPulling ? 'none' : 'padding-top 0.1s ease-out'
      }}
    >
      {/* Static background gradients - optimized for Chrome */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-900/7 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.07, 0.09, 0.07],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-800/7 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.07, 0.05, 0.07],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-32 right-1/4 w-64 h-64 bg-pink-900/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Pull to refresh indicator - Enhanced */}
      {isPulling && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: pullDistance > 40 ? 1 : 0.5,
            y: 0,
            scale: pullDistance > 80 ? 1.05 : 1
          }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div 
            className="backdrop-blur-2xl rounded-2xl px-5 py-3 flex items-center gap-3"
            style={{
              background: pullDistance > 80 
                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.35))'
                : 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
              border: pullDistance > 80
                ? '2px solid rgba(168, 85, 247, 0.6)'
                : '1.5px solid rgba(168, 85, 247, 0.3)',
              boxShadow: pullDistance > 80
                ? '0 10px 40px rgba(168, 85, 247, 0.5), 0 0 20px rgba(236, 72, 153, 0.3)'
                : '0 8px 32px rgba(168, 85, 247, 0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: pullDistance > 80 ? 360 : pullDistance * 4 }}
              transition={{ duration: pullDistance > 80 ? 0.3 : 0 }}
              className="text-2xl"
            >
              🔄
            </motion.div>
            <span className="text-sm font-bold text-white">
              {pullDistance > 80 ? '✨ Release to refresh!' : '↓ Pull to refresh'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <header 
        className="sticky top-0 z-10 px-4 py-4 border-b"
        style={{
          background: 'linear-gradient(to bottom, rgba(10, 11, 18, 0.98), rgba(10, 11, 18, 0.95))',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(168, 85, 247, 0.15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <motion.h1
                key={currentDate.toISOString()}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className="text-2xl font-extrabold uppercase tracking-tight truncate"
                style={{
                  background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 50%, #A855F7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(168, 85, 247, 0.3)',
                }}
              >
                {format(currentDate, 'EEE, d MMM')}
              </motion.h1>
              
              {/* Today button - compact, only show if not viewing today */}
              {!isToday && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToToday}
                  className="px-3 py-1 rounded-full text-xs font-bold shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(236, 72, 153, 0.25))',
                    border: '1.5px solid rgba(168, 85, 247, 0.5)',
                    color: '#EC4899',
                    boxShadow: '0 2px 10px rgba(168, 85, 247, 0.3)',
                  }}
                >
                  Today
                </motion.button>
              )}
            </div>
            
            {/* Date subtitle */}
            <motion.p
              key={currentDate.toISOString() + '-year'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-500 font-medium mt-0.5"
            >
              {format(currentDate, 'MMMM yyyy')}
            </motion.p>
          </div>

          {/* Settings Button - rightmost */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSettingsOpen(true)}
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))',
              border: '1.5px solid rgba(168, 85, 247, 0.3)',
              boxShadow: '0 4px 15px rgba(168, 85, 247, 0.2)',
            }}
            title="Settings"
          >
            <span className="text-xl">⚙️</span>
          </motion.button>
        </div>

        {/* Swipe indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[10px] text-gray-600 mt-2 text-center font-medium flex items-center justify-center gap-1"
        >
          <span>←</span>
          <span>Swipe to navigate</span>
          <span>→</span>
        </motion.div>
      </header>

      {/* Daily Agenda with improved swipe */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentDate.toISOString()}
          custom={direction}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? 300 : -300,
              opacity: 0,
              scale: 0.95
            }),
            center: {
              x: 0,
              opacity: 1,
              scale: 1
            },
            exit: (direction: number) => ({
              x: direction > 0 ? -300 : 300,
              opacity: 0,
              scale: 0.95
            })
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={handlePullStart}
          onDrag={handlePullMove}
          onDragEnd={(e, info) => {
            handlePullEnd(e, info);
            handleDragEnd(e, info);
          }}
          className="px-6 py-6 space-y-4 cursor-grab active:cursor-grabbing"
        >
          {allDayItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📅</div>
              <p className="text-xl font-bold text-gray-300 mb-2">No classes or events today</p>
              <p className="text-sm text-gray-500 mb-6">Enjoy your free time!</p>
              <div className="text-xs text-gray-600">
                ← Swipe to navigate between days →
              </div>
            </div>
          ) : (
            allDayItems.map((item, index) => (
              <div key={index}>
                <ClassBlock 
                  item={item} 
                  onEdit={'isEvent' in item ? openModal : undefined}
                />
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      {/* Upcoming Lists */}
      <div className="px-6 space-y-8 mt-8">
        <UpcomingList
          title="Upcoming Deadlines"
          items={upcomingDeadlines}
          onItemClick={openModal}
        />
        <UpcomingList
          title="Upcoming Exams"
          items={upcomingExams}
          onItemClick={openModal}
        />
      </div>

      {/* FAB */}
      <FAB onClick={() => openModal()} />

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <EventModal
            event={editingEvent}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          // Refresh notification status
          if ('Notification' in window) {
            setNotificationsEnabled(Notification.permission === 'granted');
          }
        }}
      />
    </div>
  );
}
