import { motion } from 'framer-motion';
import { useState } from 'react';
import { ClassSession, UserEvent } from '@/lib/types';

interface ClassBlockProps {
  item: (ClassSession | (UserEvent & { isEvent?: boolean }));
}

export default function ClassBlock({ item }: ClassBlockProps) {
  const [showFullName, setShowFullName] = useState(false);

  // Check if it's a class or an event
  const isClass = 'courseCode' in item && !('isEvent' in item);

  if (isClass) {
    const classItem = item as ClassSession;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowFullName(!showFullName)}
        className="relative overflow-hidden rounded-2xl p-4 cursor-pointer"
        style={{ backgroundColor: classItem.color + '20', borderLeft: `4px solid ${classItem.color}` }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold" style={{ color: classItem.color }}>
              {classItem.courseCode}
            </h3>
            <motion.p
              initial={false}
              animate={{ height: showFullName ? 'auto' : 0, opacity: showFullName ? 1 : 0 }}
              className="text-sm text-gray-300 mt-1 overflow-hidden"
            >
              {classItem.courseName}
            </motion.p>
            <p className="text-sm text-gray-400 mt-2">{classItem.classroom}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold" style={{ color: classItem.color }}>
              {classItem.time}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Event rendering
  const eventItem = item as UserEvent;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-primary">
              {eventItem.type}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1">{eventItem.title}</h3>
          <p className="text-sm text-gray-400 mt-1">{eventItem.courseCode}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-primary">{eventItem.time}</p>
        </div>
      </div>
    </motion.div>
  );
}
