import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import { UserEvent } from '@/lib/types';

interface UpcomingListProps {
  title: string;
  items: UserEvent[];
  onItemClick: (event: UserEvent) => void;
}

// Unified color scheme - matching ClassBlock
const DEADLINE_COLOR = '#3B82F6'; // Blue for deadlines
const EXAM_COLOR = '#EF4444'; // Red for exams

export default function UpcomingList({ title, items, onItemClick }: UpcomingListProps) {
  // Track completion state for each item using localStorage
  const [completedStates, setCompletedStates] = useState<{ [key: string]: boolean }>({});

  // Local storage key for completion state
  const getLocalStorageKey = (event: UserEvent) => {
    return `event_completed_${event.id || `${event.courseCode}_${event.date}_${event.title}`}`;
  };

  // Load completion states from localStorage on mount
  useEffect(() => {
    const states: { [key: string]: boolean } = {};
    items.forEach((item) => {
      const storageKey = getLocalStorageKey(item);
      const stored = localStorage.getItem(storageKey);
      if (stored !== null) {
        states[storageKey] = stored === 'true';
      }
    });
    setCompletedStates(states);
  }, [items]);

  const handleCheckboxChange = (event: UserEvent, checked: boolean) => {
    const storageKey = getLocalStorageKey(event);
    localStorage.setItem(storageKey, String(checked));
    setCompletedStates(prev => ({ ...prev, [storageKey]: checked }));
  };

  if (items.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
        <h2 className="text-xl font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-accent-pink bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => {
          const storageKey = getLocalStorageKey(item);
          const isCompleted = completedStates[storageKey] || false;
          const eventColor = item.type === 'exam' ? EXAM_COLOR : DEADLINE_COLOR;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isCompleted ? 0.4 : 1, 
                x: 0,
                scale: isCompleted ? 0.98 : 1
              }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: isCompleted ? 0.98 : 1.02, x: isCompleted ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-2xl p-4 cursor-pointer group"
              style={{ 
                background: `linear-gradient(135deg, ${eventColor}12 0%, ${eventColor}05 100%)`,
                borderLeft: `4px solid ${eventColor}`,
                boxShadow: isCompleted 
                  ? `0 2px 10px -4px ${eventColor}15` 
                  : `0 4px 20px -4px ${eventColor}30, 0 0 0 1px ${eventColor}15`,
                transition: 'all 0.3s ease'
              }}
              onClick={() => onItemClick(item)}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top left, ${eventColor}15, transparent 60%)`,
                }}
              />
              
              <div className="relative flex items-start gap-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={(e) => handleCheckboxChange(item, e.target.checked)}
                    className="mt-1 w-6 h-6 rounded-md cursor-pointer transition-all"
                    style={{ accentColor: eventColor }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span 
                      className="text-xs uppercase font-bold tracking-wider px-2 py-1 rounded-lg"
                      style={{ 
                        color: eventColor,
                        backgroundColor: `${eventColor}20`,
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h3 
                    className={`text-lg font-bold ${isCompleted ? 'line-through' : ''}`}
                    style={{ color: eventColor }}
                  >
                    {item.courseCode}
                  </h3>
                  <p className={`text-sm text-gray-300 mt-1 font-medium ${isCompleted ? 'line-through' : ''}`}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{format(parseISO(item.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
                
                {/* Edit icon */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onItemClick(item);
                  }}
                  className="p-2 rounded-xl transition-all shrink-0"
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
              </div>
              
              {/* Completion badge */}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute top-3 right-3"
                >
                  <div 
                    className="px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
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
        })}
      </div>
    </div>
  );
}
