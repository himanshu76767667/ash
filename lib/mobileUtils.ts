// Mobile gesture and navigation utilities

// Handle Android back button
export const setupBackButton = (callback: () => void) => {
  const handleBackButton = (event: PopStateEvent) => {
    event.preventDefault();
    callback();
  };

  window.addEventListener('popstate', handleBackButton);
  
  // Push a state to enable back button interception
  window.history.pushState(null, '', window.location.href);

  return () => {
    window.removeEventListener('popstate', handleBackButton);
  };
};

// Handle swipe gestures for navigation
export const detectSwipeGesture = (
  element: HTMLElement,
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeDown?: () => void
) => {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  };

  const handleSwipe = () => {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;

    // Horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > minSwipeDistance && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < -minSwipeDistance && onSwipeLeft) {
        onSwipeLeft();
      }
    }
    // Vertical swipe
    else {
      if (deltaY > minSwipeDistance && onSwipeDown) {
        onSwipeDown();
      }
    }
  };

  element.addEventListener('touchstart', handleTouchStart);
  element.addEventListener('touchend', handleTouchEnd);

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchend', handleTouchEnd);
  };
};

// Prevent accidental page refresh on mobile
export const preventPullToRefresh = () => {
  let lastTouchY = 0;
  let preventPullToRefresh = false;

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;
    lastTouchY = e.touches[0].clientY;
    preventPullToRefresh = window.pageYOffset === 0;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touchY = e.touches[0].clientY;
    const touchYDelta = touchY - lastTouchY;
    lastTouchY = touchY;

    if (preventPullToRefresh && touchYDelta > 0) {
      e.preventDefault();
    }
  };

  document.addEventListener('touchstart', handleTouchStart, { passive: true });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });

  return () => {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchmove', handleTouchMove);
  };
};

// Handle visibility change (app goes to background/foreground)
export const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
  const handleVisibilityChange = () => {
    callback(!document.hidden);
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};

// Haptic feedback for mobile
export const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
