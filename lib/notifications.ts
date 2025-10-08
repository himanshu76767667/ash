// Notification service for class and event reminders

// Store scheduled notification IDs to prevent duplicates
const scheduledNotifications = new Set<string>();

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
  
  // Create unique ID for this notification
  const notificationId = `class-${courseCode}-${time}-${now.toDateString()}`;
  
  // Only schedule if not already scheduled and time is in the future
  if (timeUntilReminder > 0 && !scheduledNotifications.has(notificationId)) {
    scheduledNotifications.add(notificationId);
    
    setTimeout(() => {
      showNotification(`Class Starting Soon! 🎓`, {
        body: `${courseCode} - ${courseName}\nStarts in 30 minutes at ${time}\nLocation: ${classroom}`,
        tag: notificationId,
        requireInteraction: false,
        silent: false,
      });
      scheduledNotifications.delete(notificationId);
    }, timeUntilReminder);
    
    console.log(`✅ Scheduled reminder for ${courseCode} at ${time} (in ${Math.round(timeUntilReminder / 60000)} mins)`);
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
  
  // Create unique ID for this notification
  const notificationId = `event-${type}-${courseCode}-${date}`;
  
  // Only schedule if within 30 days, in the future, and not already scheduled
  if (timeUntilReminder > 0 && 
      timeUntilReminder < 30 * 24 * 60 * 60 * 1000 && 
      !scheduledNotifications.has(notificationId)) {
    
    scheduledNotifications.add(notificationId);
    
    setTimeout(() => {
      const emoji = type === 'exam' ? '📝' : '⏰';
      showNotification(`${emoji} ${type.toUpperCase()} Tomorrow!`, {
        body: `${courseCode} - ${title}\nDue: ${new Date(date).toLocaleDateString()} at ${time}`,
        tag: notificationId,
        requireInteraction: true,
        silent: false,
      });
      scheduledNotifications.delete(notificationId);
    }, timeUntilReminder);
    
    console.log(`✅ Scheduled ${type} reminder for ${courseCode} - ${title} (in ${Math.round(timeUntilReminder / 3600000)} hours)`);
  }
};

// Clear all scheduled notifications
export const clearScheduledNotifications = () => {
  scheduledNotifications.clear();
  console.log('🧹 Cleared all scheduled notifications');
};

// Schedule all reminders for today's classes and upcoming events
export const initializeNotifications = async () => {
  const hasPermission = await requestNotificationPermission();
  
  if (hasPermission) {
    console.log('✅ Notification permission granted');
    
    // Don't show test notification on every init
    // Only show if notifications were just enabled
  } else {
    console.log('❌ Notification permission denied');
  }
  
  return hasPermission;
};
