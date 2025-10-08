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
      <div
        onClick={() => setShowFullName(!showFullName)}
        className="relative overflow-hidden rounded-2xl p-5 active:opacity-80 mb-4"
        style={{ 
          background: `linear-gradient(135deg, ${CLASS_COLOR}12 0%, ${CLASS_COLOR}06 100%)`,
          borderLeft: `3px solid ${CLASS_COLOR}`,
          boxShadow: `0 2px 8px ${CLASS_COLOR}20`,
        }}
      >
        
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold" style={{ color: CLASS_COLOR }}>
              {classItem.courseCode}
            </h3>
            {showFullName && (
              <p className="text-sm text-gray-400 font-medium mt-2">
                {classItem.courseName}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{classItem.classroom}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold" style={{ color: CLASS_COLOR }}>
              {classItem.time}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Event rendering - simplified for performance
  const eventItem = item as UserEvent;
  const eventColor = eventItem.type === 'exam' ? EXAM_COLOR : DEADLINE_COLOR;
  
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 active:opacity-70 mb-4"
      style={{ 
        background: `linear-gradient(135deg, ${eventColor}12 0%, ${eventColor}06 100%)`,
        borderLeft: `3px solid ${eventColor}`,
        boxShadow: `0 2px 8px ${eventColor}20`,
        opacity: isCompleted ? 0.5 : 1
      }}
    >
      
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Checkbox for completion */}
          <div className="flex items-center gap-3 mb-3">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={toggleCompletion}
              onClick={(e) => e.stopPropagation()}
              className="w-5 h-5 rounded"
              style={{ accentColor: eventColor }}
            />
            <span 
              className="text-xs uppercase font-bold px-2 py-0.5 rounded"
              style={{ 
                color: eventColor,
                backgroundColor: `${eventColor}15`,
              }}
            >
              {eventItem.type}
            </span>
          </div>
          
          <h3 
            className={`text-xl font-bold ${isCompleted ? 'line-through' : ''}`}
            style={{ color: eventColor }}
          >
            {eventItem.courseCode}
          </h3>
          <p className={`text-sm text-gray-400 mt-1 ${isCompleted ? 'line-through' : ''}`}>
            {eventItem.title}
          </p>
        </div>
        
        <div className="text-right flex flex-col items-end gap-2">
          <p className="text-lg font-bold" style={{ color: eventColor }}>
            {eventItem.time}
          </p>
          
          {/* Edit button */}
          {onEdit && (
            <button
              onClick={handleEditClick}
              className="p-1.5 rounded-lg active:opacity-70"
              style={{ 
                backgroundColor: `${eventColor}12`,
                color: eventColor 
              }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-4 h-4"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Completion badge */}
      {isCompleted && (
        <div className="absolute top-3 right-3">
          <div 
            className="px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1"
            style={{
              backgroundColor: `${eventColor}20`,
              color: eventColor
            }}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Done
          </div>
        </div>
      )}
    </div>
  );
}
