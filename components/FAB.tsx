import { motion } from 'framer-motion';

interface FABProps {
  onClick: () => void;
}

export default function FAB({ onClick }: FABProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center z-50 active:scale-90"
      style={{
        background: 'rgba(168, 85, 247, 0.9)',
        boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)',
      }}
    >
      <svg
        className="w-7 h-7 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
}
