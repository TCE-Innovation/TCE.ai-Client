import { useEffect } from 'react';

const NativeFeeling = () => {
  useEffect(() => {
    // Prevent bounce/rubber-banding effect on iOS
    const preventScroll = function(e) {
      // Allow scrolling in specific containers that should scroll
      const scrollableContainers = [
        '.saved-calculations-container',
        '.pwa-input-container',
        '.calculator-container'
      ];
      
      // Check if the event target is within any scrollable container
      const isInScrollableContainer = scrollableContainers.some(selector => 
        e.target.closest(selector) !== null
      );
      
      // If we're not in a scrollable container, prevent default behavior
      if (!isInScrollableContainer) {
        e.preventDefault();
        return;
      }
      
      // Get the scrollable container
      const container = e.target.closest(scrollableContainers.join(','));
      
      // Allow natural scrolling within scrollable containers regardless of content height
      // This ensures scrollable containers will scroll if they need to
    };
    
    // Apply to both touchmove and wheel events to prevent all scrolling
    document.body.addEventListener('touchmove', preventScroll, { passive: false });
    document.body.addEventListener('wheel', preventScroll, { passive: false });
    
    // Add iOS-style class to dialogs
    document.querySelectorAll('.MuiDialog-root').forEach(dialog => {
      dialog.classList.add('ios-sheet');
    });
    
    // Handle iOS PWA installation detection
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || 
                              window.navigator.standalone || 
                              document.referrer.includes('ios-app://');
    
    if (isInStandaloneMode) {
      document.body.classList.add('ios-standalone-mode');
    }
    
    return () => {
      document.body.removeEventListener('touchmove', preventScroll);
      document.body.removeEventListener('wheel', preventScroll);
    };
  }, []);

  return null;
};

export default NativeFeeling;