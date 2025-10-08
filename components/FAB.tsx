import { motion } from 'framer-motion';

interface FABProps {
  onClick: () => void;
}

export default function FAB({ onClick }: FABProps) {
  return (
    <motion.button
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.15, rotate: 90 }}
      whileTap={{ scale: 0.9, rotate: 45 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary via-accent-pink to-primary rounded-full flex items-center justify-center z-50 group"
      style={{
        boxShadow: '0 10px 40px -10px rgba(168, 85, 247, 0.6), 0 0 20px rgba(168, 85, 247, 0.3)',
      }}
    >
      {/* Animated ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4))',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Icon */}
      <motion.svg
        className="w-8 h-8 text-white relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M12 4v16m8-8H4"
        />
      </motion.svg>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent-pink opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300" />
    </motion.button>
  );
}
