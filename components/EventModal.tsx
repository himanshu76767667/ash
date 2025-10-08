import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { UserEvent } from '@/lib/types';
import { createEvent, updateEvent, deleteEvent } from '@/lib/eventService';

interface EventModalProps {
  event: UserEvent | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  const [type, setType] = useState<'deadline' | 'exam'>('deadline');
  const [courseCode, setCourseCode] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (event) {
      setType(event.type);
      setCourseCode(event.courseCode);
      setTitle(event.title);
      setDate(event.date.split('T')[0]);
      setTime(event.time);
    } else {
      // Default to today
      setDate(format(new Date(), 'yyyy-MM-dd'));
      setTime('09:00');
    }
  }, [event]);

  const handleSave = async () => {
    const eventData = {
      type,
      courseCode,
      title,
      date: new Date(date).toISOString(),
      time,
      completed: false,
    };

    try {
      if (event?.id) {
        await updateEvent(event.id, eventData);
      } else {
        await createEvent(eventData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (event?.id) {
      try {
        await deleteEvent(event.id);
        onClose();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 top-20 bg-gradient-to-b from-background to-background/95 rounded-t-3xl z-50 overflow-y-auto"
      >
        <div className="sticky top-0 bg-background/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {event ? 'Edit Event' : 'Add Event'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Type Toggle */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setType('deadline')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  type === 'deadline'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Deadline
              </button>
              <button
                onClick={() => setType('exam')}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  type === 'exam'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Exam
              </button>
            </div>
          </div>

          {/* Course Code */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">
              Course Code
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g., CS230"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">
              Title / Description
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Assignment 3"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-300">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            {event && (
              <button
                onClick={handleDelete}
                className="flex-1 py-4 rounded-xl bg-red-500/20 text-red-400 font-semibold hover:bg-red-500/30 transition"
              >
                Delete
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex-1 py-4 rounded-xl bg-gradient-to-r from-primary to-accent-pink text-white font-semibold hover:shadow-lg transition"
            >
              {event ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
