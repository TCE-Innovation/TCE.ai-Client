import { setupIonicReact } from '@ionic/react';

// Call this function at the beginning of your app
export function initializeIonic() {
  setupIonicReact({
    mode: 'ios', // Forces iOS style on all platforms for consistency
    animated: true
  });
}