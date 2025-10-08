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
      {/* Static background - no animations for performance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-900/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-800/5 rounded-full blur-3xl" />
      </div>

      {/* Pull to refresh indicator */}
      {isPulling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: pullDistance > 40 ? 1 : 0.3 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div 
            className="backdrop-blur-xl rounded-2xl px-6 py-3 flex items-center gap-3 border"
            style={{
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
              borderColor: 'rgba(168, 85, 247, 0.3)',
              boxShadow: '0 8px 32px rgba(168, 85, 247, 0.3)',
            }}
          >
            <motion.div
              animate={{ rotate: pullDistance > 80 ? 360 : 0 }}
              transition={{ duration: 0.1 }}
              className="text-2xl"
            >
              🔄
            </motion.div>
            <span className="text-sm font-bold text-white">
              {pullDistance > 80 ? 'Release to go to Today' : 'Pull to refresh'}
            </span>
          </div>
        </motion.div>
      )}

      {/* Header */}
      <header 
        className="sticky top-0 z-10 px-6 py-5 border-b"
        style={{
          background: 'linear-gradient(to bottom, rgba(16, 17, 26, 0.95), rgba(16, 17, 26, 0.8))',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
            {format(currentDate, 'EEEE, d MMMM')}
          </h1>
          
          <div className="flex items-center gap-3">
            {/* Settings Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSettingsOpen(true)}
              className="p-2.5 rounded-full transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
              }}
              title="Settings"
            >
              <span className="text-xl">⚙️</span>
            </motion.button>
            
            {/* Today button - only show if not viewing today */}
            {!isToday && (
              <button
                onClick={goToToday}
                className="px-5 py-2.5 rounded-full text-sm font-bold active:opacity-70"
                style={{
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: '#A855F7',
                }}
              >
                📅 Today
              </button>
            )}
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="text-xs text-gray-600 mt-3 text-center font-medium">
          ← Swipe to navigate →
        </div>
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
