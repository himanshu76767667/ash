import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { UserEvent } from '@/lib/types';
import { createEvent, updateEvent, deleteEvent } from '@/lib/eventService';
import { vibrate } from '@/lib/mobileUtils';

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
  const [isSaving, setIsSaving] = useState(false);

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
    if (isSaving) return; // Prevent double submission
    
    setIsSaving(true);
    vibrate(50); // Haptic feedback
    
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
      vibrate([50, 50, 50]); // Success vibration
      onClose(); // Auto-close after saving
    } catch (error) {
      console.error('Error saving event:', error);
      vibrate([100, 50, 100, 50, 100]); // Error vibration
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (event?.id) {
      vibrate(100); // Haptic feedback
      try {
        await deleteEvent(event.id);
        vibrate([50, 50]); // Success vibration
        onClose();
      } catch (error) {
        console.error('Error deleting event:', error);
        vibrate([100, 50, 100]); // Error vibration
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
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
      />

      {/* Modal - Swipe down to close */}
      <motion.div
        initial={{ opacity: 0, y: '100%', scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: '100%', scale: 0.9 }}
        transition={{ type: 'tween', duration: 0.1 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 150) {
            onClose(); // Close if swiped down more than 150px
          }
        }}
        className="fixed inset-x-0 bottom-0 top-20 rounded-t-3xl z-50 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #10111A 0%, #0A0B12 100%)',
          boxShadow: '0 -10px 60px -10px rgba(168, 85, 247, 0.3)',
        }}
      >
        {/* Drag handle indicator */}
        <div className="w-full flex justify-center py-3 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
        </div>
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-accent-pink rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex justify-between items-center z-10">
            <motion.h2 
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-pink bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {event ? 'Edit Event' : 'Add New Event'}
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all"
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Type Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Event Type</label>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setType('deadline')}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                    type === 'deadline'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  📝 Deadline
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setType('exam')}
                  className={`flex-1 py-4 rounded-xl font-bold transition-all ${
                    type === 'exam'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  📚 Exam
                </motion.button>
              </div>
            </motion.div>

            {/* Course Code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">
                Course Code
              </label>
              <input
                type="text"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g., CS230"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none transition-all text-white placeholder-gray-500 font-medium"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">
                Title / Description
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Assignment 3"
                className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none transition-all text-white placeholder-gray-500 font-medium"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
              />
            </motion.div>

            {/* Date and Time - Side by side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none transition-all text-white font-medium"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <label className="block text-sm font-bold mb-3 text-gray-300 uppercase tracking-wider">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-primary focus:outline-none transition-all text-white font-medium"
                  style={{
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.div 
              className="flex gap-3 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
            >
              {event && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDelete}
                  className="flex-1 py-5 rounded-xl font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
                    color: '#EF4444',
                    border: '2px solid rgba(239, 68, 68, 0.3)',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.2)',
                  }}
                >
                  🗑️ Delete Event
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-5 rounded-xl text-white font-bold transition-all"
                style={{
                  background: isSaving 
                    ? 'linear-gradient(135deg, #6B21A8 0%, #9D174D 100%)'
                    : 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
                  opacity: isSaving ? 0.7 : 1,
                }}
              >
                {isSaving ? '⏳ Saving...' : (event ? '✅ Save Changes' : '➕ Add Event')}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
