import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [notifyClasses, setNotifyClasses] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [notifyExams, setNotifyExams] = useState(true);
  const [notificationsGranted, setNotificationsGranted] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const classes = localStorage.getItem('notify_classes');
    const deadlines = localStorage.getItem('notify_deadlines');
    const exams = localStorage.getItem('notify_exams');
    
    if (classes !== null) setNotifyClasses(classes === 'true');
    if (deadlines !== null) setNotifyDeadlines(deadlines === 'true');
    if (exams !== null) setNotifyExams(exams === 'true');
    
    // Check if notification permission is granted
    if ('Notification' in window) {
      setNotificationsGranted(Notification.permission === 'granted');
    }
  }, [isOpen]);

  const handleToggle = (type: 'classes' | 'deadlines' | 'exams', value: boolean) => {
    switch (type) {
      case 'classes':
        setNotifyClasses(value);
        localStorage.setItem('notify_classes', String(value));
        break;
      case 'deadlines':
        setNotifyDeadlines(value);
        localStorage.setItem('notify_deadlines', String(value));
        break;
      case 'exams':
        setNotifyExams(value);
        localStorage.setItem('notify_exams', String(value));
        break;
    }
  };

  const requestPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsGranted(permission === 'granted');
      
      if (permission === 'granted') {
        // Show test notification
        new Notification('🎓 Notifications Enabled!', {
          body: "You'll get reminders for your classes and events",
          icon: '/logo.jpg',
        });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-96 z-50"
            style={{
              background: 'linear-gradient(135deg, #0A0B12 0%, #15161F 100%)',
              borderLeft: '1px solid rgba(168, 85, 247, 0.2)',
            }}
          >
            {/* Header */}
            <div className="sticky top-0 px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">⚙️ Settings</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-3xl text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6 overflow-y-auto h-full pb-32">
              {/* Notification Permission */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  🔔 Notifications
                </h3>
                
                {!notificationsGranted ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={requestPermission}
                    className="w-full px-5 py-4 rounded-2xl font-bold text-white transition-all"
                    style={{
                      background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
                      border: '2px solid rgba(168, 85, 247, 0.5)',
                      boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    🔕 Enable Notifications
                  </motion.button>
                ) : (
                  <div className="px-5 py-4 rounded-2xl bg-green-500/10 border-2 border-green-500/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <p className="font-bold text-green-400">Notifications Enabled</p>
                        <p className="text-xs text-gray-400">You'll receive reminders</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-white/10"></div>

              {/* Notification Settings */}
              {notificationsGranted && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                    Reminder Settings
                  </h3>

                  {/* Class Reminders */}
                  <ToggleItem
                    icon="🎓"
                    title="Class Reminders"
                    description="30 minutes before each class"
                    enabled={notifyClasses}
                    onChange={(value) => handleToggle('classes', value)}
                  />

                  {/* Deadline Reminders */}
                  <ToggleItem
                    icon="⏰"
                    title="Deadline Reminders"
                    description="1 day before deadlines"
                    enabled={notifyDeadlines}
                    onChange={(value) => handleToggle('deadlines', value)}
                  />

                  {/* Exam Reminders */}
                  <ToggleItem
                    icon="📝"
                    title="Exam Reminders"
                    description="1 day before exams"
                    enabled={notifyExams}
                    onChange={(value) => handleToggle('exams', value)}
                  />
                </div>
              )}

              {/* Divider */}
              <div className="border-t border-white/10"></div>

              {/* App Info */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  About
                </h3>
                <div className="text-sm text-gray-400 space-y-2">
                  <p><strong className="text-white">App:</strong> ash Daily Agenda</p>
                  <p><strong className="text-white">Version:</strong> 1.0.0</p>
                  <p><strong className="text-white">Made for:</strong> IITB Students</p>
                  <p><strong className="text-white">Developer:</strong> Himanshu</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Features
                </h3>
                <div className="space-y-2">
                  <FeatureItem icon="📅" text="Daily agenda with class schedule" />
                  <FeatureItem icon="⏰" text="Deadline & exam tracking" />
                  <FeatureItem icon="🔔" text="Smart notifications" />
                  <FeatureItem icon="🔄" text="Pull-to-refresh" />
                  <FeatureItem icon="👆" text="Swipe navigation" />
                  <FeatureItem icon="📱" text="PWA - Works offline" />
                  <FeatureItem icon="✅" text="Task completion tracking" />
                </div>
              </div>

              {/* Instructions */}
              <div className="px-4 py-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <p className="text-xs text-gray-300 leading-relaxed">
                  <strong className="text-purple-400">💡 Tip:</strong> Install this app to your home screen for the best experience. Notifications work even when the app is closed!
                </p>
              </div>

              {/* Credits */}
              <div className="text-center py-4">
                <p className="text-xs text-gray-500">
                  Made with 💜 by <strong className="text-purple-400">Himanshu</strong>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  for IITB Students
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Feature Item Component
interface FeatureItemProps {
  icon: string;
  text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <span className="text-sm">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

// Toggle Item Component
interface ToggleItemProps {
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}

function ToggleItem({ icon, title, description, enabled, onChange }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
      </div>
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(!enabled)}
        className="relative w-14 h-8 rounded-full transition-all"
        style={{
          background: enabled 
            ? 'linear-gradient(135deg, #A855F7, #EC4899)' 
            : 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
        />
      </motion.button>
    </div>
  );
}
