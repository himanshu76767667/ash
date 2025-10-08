import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ClassSession, UserEvent } from '@/lib/types';

interface ClassBlockProps {
  item: (ClassSession | (UserEvent & { isEvent?: boolean }));
  onEdit?: (event: UserEvent) => void;
}

// Unified color scheme
const CLASS_COLOR = '#A855F7'; // Purple for all classes
const DEADLINE_COLOR = '#3B82F6'; // Blue for deadlines
const EXAM_COLOR = '#EF4444'; // Red for exams

export default function ClassBlock({ item, onEdit }: ClassBlockProps) {
  const [showFullName, setShowFullName] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Check if it's a class or an event
  const isClass = 'courseCode' in item && !('isEvent' in item);

  // Local storage key for completion state
  const getLocalStorageKey = (event: UserEvent) => {
    return `event_completed_${event.id || `${event.courseCode}_${event.date}_${event.title}`}`;
  };

  // Load completion state from localStorage on mount
  useEffect(() => {
    if (!isClass) {
      const eventItem = item as UserEvent;
      const storageKey = getLocalStorageKey(eventItem);
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        setIsCompleted(stored === 'true');
      }
    }
  }, [item, isClass]);

  // Toggle completion state (only local)
  const toggleCompletion = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!isClass) {
      const eventItem = item as UserEvent;
      const newState = !isCompleted;
      setIsCompleted(newState);
      const storageKey = getLocalStorageKey(eventItem);
      localStorage.setItem(storageKey, String(newState));
    }
  };

  // Handle edit click
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isClass && onEdit) {
      onEdit(item as UserEvent);
    }
  };

  if (isClass) {
    const classItem = item as ClassSession;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowFullName(!showFullName)}
        className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group"
        style={{ 
          background: `linear-gradient(135deg, ${CLASS_COLOR}15 0%, ${CLASS_COLOR}08 100%)`,
          borderLeft: `4px solid ${CLASS_COLOR}`,
          boxShadow: `0 4px 20px -4px ${CLASS_COLOR}40, 0 0 0 1px ${CLASS_COLOR}20`,
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
          style={{
            background: `radial-gradient(circle at top right, ${CLASS_COLOR}20, transparent 70%)`,
          }}
        />
        
        <div className="relative flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-2xl font-bold tracking-tight" style={{ color: CLASS_COLOR }}>
              {classItem.courseCode}
            </h3>
            <motion.p
              initial={false}
              animate={{ 
                height: showFullName ? 'auto' : 0, 
                opacity: showFullName ? 1 : 0,
                marginTop: showFullName ? 8 : 0
              }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className="text-sm text-gray-300 font-medium overflow-hidden"
            >
              {classItem.courseName}
            </motion.p>
            <div className="flex items-center gap-2 mt-3">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-400">{classItem.classroom}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <svg className="w-5 h-5" style={{ color: CLASS_COLOR }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xl font-bold" style={{ color: CLASS_COLOR }}>
                {classItem.time}
              </p>
            </div>
          </div>
        </div>
        
        {/* Subtle tap hint */}
        <motion.div 
          className="absolute bottom-2 right-2 text-xs text-gray-500"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Tap for details
        </motion.div>
      </motion.div>
    );
  }

  // Event rendering - now styled like class blocks
  const eventItem = item as UserEvent;
  const eventColor = eventItem.type === 'exam' ? EXAM_COLOR : DEADLINE_COLOR;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isCompleted ? 0.4 : 1, 
        y: 0,
        scale: isCompleted ? 0.98 : 1
      }}
      whileHover={{ scale: isCompleted ? 0.98 : 1.02, y: isCompleted ? 0 : -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-2xl p-5 cursor-pointer group"
      style={{ 
        background: `linear-gradient(135deg, ${eventColor}15 0%, ${eventColor}08 100%)`,
        borderLeft: `4px solid ${eventColor}`,
        boxShadow: isCompleted 
          ? `0 2px 10px -4px ${eventColor}20` 
          : `0 4px 20px -4px ${eventColor}40, 0 0 0 1px ${eventColor}20`,
        transition: 'all 0.1s ease'
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at top right, ${eventColor}20, transparent 70%)`,
        }}
      />
      
      <div className="relative flex justify-between items-start">
        <div className="flex-1">
          {/* Checkbox for completion */}
          <div className="flex items-center gap-3 mb-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={toggleCompletion}
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 rounded-md cursor-pointer transition-all"
                style={{ accentColor: eventColor }}
              />
            </motion.div>
            <div className="flex items-center gap-2">
              <span 
                className="text-xs uppercase font-bold tracking-wider px-2 py-1 rounded-lg"
                style={{ 
                  color: eventColor,
                  backgroundColor: `${eventColor}20`,
                }}
              >
                {eventItem.type}
              </span>
            </div>
          </div>
          
          <h3 
            className={`text-2xl font-bold tracking-tight ${isCompleted ? 'line-through' : ''}`}
            style={{ color: eventColor }}
          >
            {eventItem.courseCode}
          </h3>
          <p className={`text-sm text-gray-300 mt-2 font-medium ${isCompleted ? 'line-through' : ''}`}>
            {eventItem.title}
          </p>
        </div>
        
        <div className="text-right flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: eventColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl font-bold" style={{ color: eventColor }}>
              {eventItem.time}
            </p>
          </div>
          
          {/* Edit button */}
          {onEdit && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEditClick}
              className="p-2 rounded-xl transition-all"
              style={{ 
                backgroundColor: `${eventColor}15`,
                color: eventColor 
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Completion badge */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-3 right-3"
        >
          <div 
            className="px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            style={{
              backgroundColor: `${eventColor}25`,
              color: eventColor
            }}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Done
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
