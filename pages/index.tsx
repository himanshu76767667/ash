import { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { format, addDays, subDays, isSameDay, parseISO, isAfter } from 'date-fns';
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

  const handleSwipe = (offset: number) => {
    if (offset > 50) {
      setDirection(-1);
      setCurrentDate((prev) => subDays(prev, 1));
    } else if (offset < -50) {
      setDirection(1);
      setCurrentDate((prev) => addDays(prev, 1));
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    handleSwipe(info.offset.x);
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
    const timeA = 'time' in a ? a.time : a.time;
    const timeB = 'time' in b ? b.time : b.time;
    return timeA.localeCompare(timeB);
  });

  return (
    <div className="min-h-screen bg-background text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-white/10 px-6 py-4">
        <motion.h1
          key={currentDate.toISOString()}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold uppercase tracking-wide"
        >
          {format(currentDate, 'EEEE, d MMMM')}
        </motion.h1>
      </header>

      {/* Daily Agenda */}
      <motion.div
        key={currentDate.toISOString()}
        initial={{ opacity: 0, x: direction * 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -direction * 100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className="px-6 py-6 space-y-4"
      >
        {allDayItems.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No classes or events today</p>
            <p className="text-sm mt-2">Swipe to navigate between days</p>
          </div>
        ) : (
          allDayItems.map((item, index) => (
            <ClassBlock key={index} item={item} />
          ))
        )}
      </motion.div>

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
