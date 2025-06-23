import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

const ServiceWorkerStatus = () => {
  const [swStatus, setSwStatus] = useState({
    show: false,
    message: '',
    severity: 'info'
  });

  useEffect(() => {
    // Listen for service worker registration status
    const handleSWSuccess = () => {
      setSwStatus({
        show: true,
        message: "App ready for offline use!",
        severity: "success"
      });
    };

    const handleSWUpdate = () => {
      setSwStatus({
        show: true,
        message: "New version available",
        severity: "info"
      });
    };

    // Listen for custom events from service worker registration
    window.addEventListener('swSuccess', handleSWSuccess);
    window.addEventListener('swUpdate', handleSWUpdate);

    // Listen for online/offline status changes from service worker
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CONNECTION_STATUS_UPDATE') {
          setSwStatus({
            show: true,
            message: event.data.online ? "Back online" : "You are offline",
            severity: event.data.online ? "success" : "warning"
          });
        }
      });
    }

    return () => {
      window.removeEventListener('swSuccess', handleSWSuccess);
      window.removeEventListener('swUpdate', handleSWUpdate);
    };
  }, []);

  return (
    <Snackbar
      open={swStatus.show}
      autoHideDuration={6000}
      onClose={() => setSwStatus({...swStatus, show: false})}
      anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
    >
      <Alert
        onClose={() => setSwStatus({...swStatus, show: false})}
        severity={swStatus.severity}
        sx={{ width: '100%' }}
      >
        {swStatus.message}
      </Alert>
    </Snackbar>
  );
};

export default ServiceWorkerStatus;