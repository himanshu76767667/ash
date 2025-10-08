// Network status monitoring for offline/online detection

import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      console.log('🟢 Back online - Syncing data...');
      setIsOnline(true);
      setWasOffline(true);
      // Clear the "was offline" flag after 3 seconds
      setTimeout(() => setWasOffline(false), 3000);
    };

    const handleOffline = () => {
      console.log('🔴 Offline - Working with cached data');
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, wasOffline };
};
