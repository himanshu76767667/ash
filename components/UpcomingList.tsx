import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { UserEvent } from '@/lib/types';
import { updateEvent } from '@/lib/eventService';

interface UpcomingListProps {
  title: string;
  items: UserEvent[];
  onItemClick: (event: UserEvent) => void;
}

export default function UpcomingList({ title, items, onItemClick }: UpcomingListProps) {
  const handleCheckboxChange = async (event: UserEvent, checked: boolean) => {
    if (event.id) {
      await updateEvent(event.id, { completed: checked });
    }
  };

  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 uppercase tracking-wide text-primary">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 transition-all ${
              item.completed ? 'opacity-50' : ''
            }`}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e) => handleCheckboxChange(item, e.target.checked)}
              className="mt-1 w-5 h-5 rounded accent-primary cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-1" onClick={() => onItemClick(item)}>
              <h3 className={`font-semibold ${item.completed ? 'line-through' : ''}`}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">{item.courseCode}</p>
              <p className="text-xs text-gray-500 mt-1">
                {format(parseISO(item.date), 'MMM d, yyyy')} at {item.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
