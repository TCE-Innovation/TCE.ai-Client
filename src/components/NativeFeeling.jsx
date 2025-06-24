import { useEffect } from 'react';

const NativeFeeling = () => {
  useEffect(() => {
    // Prevent bounce/rubber-banding effect on iOS
    document.body.addEventListener('touchmove', function(e) {
      // Allow scrolling in elements that should scroll
      if (e.target.closest('.saved-calculations-container, .calculator-container')) {
        return;
      }
      e.preventDefault();
    }, { passive: false });
    
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
      document.body.removeEventListener('touchmove', function(e) {
        if (e.target.closest('.saved-calculations-container, .calculator-container')) {
          return;
        }
        e.preventDefault();
      });
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default NativeFeeling;