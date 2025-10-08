// Notification service for class and event reminders

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    // Use service worker if available
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: '/logo.jpg',
          badge: '/logo.jpg',
          ...options,
        });
      });
    } else {
      // Fallback to regular notification
      new Notification(title, {
        icon: '/logo.jpg',
        badge: '/logo.jpg',
        ...options,
      });
    }
  }
};

export const scheduleClassReminder = (
  courseCode: string,
  courseName: string,
  time: string,
  classroom: string
) => {
  // Check if class notifications are enabled
  const notifyClasses = localStorage.getItem('notify_classes');
  if (notifyClasses === 'false') return;
  
  const now = new Date();
  const [hours, minutes] = time.split(':').map(Number);
  
  const classTime = new Date(now);
  classTime.setHours(hours, minutes, 0, 0);
  
  // If class time has passed today, skip
  if (classTime <= now) {
    return;
  }
  
  // Schedule notification 30 minutes before
  const reminderTime = new Date(classTime.getTime() - 30 * 60 * 1000);
  const timeUntilReminder = reminderTime.getTime() - now.getTime();
  
  if (timeUntilReminder > 0) {
    setTimeout(() => {
      showNotification(`Class Starting Soon! 🎓`, {
        body: `${courseCode} - ${courseName}\nStarts in 30 minutes at ${time}\nLocation: ${classroom}`,
        tag: `class-${courseCode}-${time}`,
        requireInteraction: false,
        silent: false,
      });
    }, timeUntilReminder);
    
    console.log(`Scheduled reminder for ${courseCode} at ${time} (30 mins before)`);
  }
};

export const scheduleEventReminder = (
  type: 'deadline' | 'exam',
  courseCode: string,
  title: string,
  date: string,
  time: string
) => {
  // Check if this type of notification is enabled
  const notifySetting = type === 'deadline' ? 'notify_deadlines' : 'notify_exams';
  const isEnabled = localStorage.getItem(notifySetting);
  if (isEnabled === 'false') return;
  
  const now = new Date();
  const eventDate = new Date(date);
  const [hours, minutes] = time.split(':').map(Number);
  eventDate.setHours(hours, minutes, 0, 0);
  
  // Schedule notification 1 day before
  const reminderTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000);
  const timeUntilReminder = reminderTime.getTime() - now.getTime();
  
  if (timeUntilReminder > 0 && timeUntilReminder < 30 * 24 * 60 * 60 * 1000) { // Within 30 days
    setTimeout(() => {
      const emoji = type === 'exam' ? '📝' : '⏰';
      showNotification(`${emoji} ${type.toUpperCase()} Tomorrow!`, {
        body: `${courseCode} - ${title}\nDue: ${new Date(date).toLocaleDateString()} at ${time}`,
        tag: `event-${type}-${courseCode}-${date}`,
        requireInteraction: true,
        silent: false,
      });
    }, timeUntilReminder);
    
    console.log(`Scheduled ${type} reminder for ${courseCode} - ${title} (1 day before)`);
  }
};

// Schedule all reminders for today's classes and upcoming events
export const initializeNotifications = async () => {
  const hasPermission = await requestNotificationPermission();
  
  if (hasPermission) {
    console.log('✅ Notification permission granted');
    
    // Show a test notification
    showNotification('🎓 ash Notifications Enabled!', {
      body: "You'll get reminders 30 mins before classes and 1 day before deadlines/exams",
      tag: 'welcome',
      silent: true,
    });
  } else {
    console.log('❌ Notification permission denied');
  }
  
  return hasPermission;
};
