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

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UserEvent | null>(null);
  const [direction, setDirection] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Subscribe to events from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToEvents((updatedEvents) => {
      setEvents(updatedEvents);
    });
    return () => unsubscribe();
  }, []);

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
      await controls.start({ scale: 0.95, transition: { duration: 0.1 } });
      setDirection(0);
      setCurrentDate(new Date());
      await controls.start({ scale: 1, transition: { duration: 0.1 } });
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
        transition: isPulling ? 'none' : 'padding-top 0.15s ease-out'
      }}
    >
      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
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
              transition={{ duration: 0.2 }}
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
          <motion.h1
            key={currentDate.toISOString()}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="text-3xl font-bold uppercase tracking-wide bg-gradient-to-r from-primary via-accent-pink to-primary bg-clip-text text-transparent"
          >
            {format(currentDate, 'EEEE, d MMMM')}
          </motion.h1>
          
          {/* Today button - only show if not viewing today */}
          {!isToday && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToToday}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
                border: '2px solid rgba(168, 85, 247, 0.4)',
                color: '#A855F7',
                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
              }}
            >
              📅 Today
            </motion.button>
          )}
        </div>

        {/* Swipe indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs text-gray-500 mt-3 text-center font-medium"
        >
          ← Swipe to navigate →
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
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-6xl mb-6"
              >
                📅
              </motion.div>
              <p className="text-xl font-bold text-gray-300 mb-2">No classes or events today</p>
              <p className="text-sm text-gray-500 mb-6">Enjoy your free time!</p>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-xs text-gray-600"
              >
                ← Swipe to navigate between days →
              </motion.div>
            </motion.div>
          ) : (
            allDayItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ClassBlock 
                  item={item} 
                  onEdit={'isEvent' in item ? openModal : undefined}
                />
              </motion.div>
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <EventModal
            event={editingEvent}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
