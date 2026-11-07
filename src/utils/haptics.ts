/**
 * Tiện ích kích hoạt rung nhẹ (Haptic Feedback) trên thiết bị di động
 */
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'light') => {
  try {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      switch (type) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(25);
          break;
        case 'heavy':
          navigator.vibrate([40, 20, 40]);
          break;
      }
    }
  } catch {
    // Ignore if not supported
  }
};
