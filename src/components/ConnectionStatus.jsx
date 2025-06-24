import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';

const ConnectionStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setMessage('You are back online. Your saved calculations can now be exported.');
            setSeverity('success');
            setShowNotification(true);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setMessage('You are offline. Calculations will be saved locally.');
            setSeverity('warning');
            setShowNotification(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <>
            <div className="connection-status-indicator">
                {isOnline ? (
                    <WifiIcon style={{ color: '#4CAF50', fontSize: '18px' }} />
                ) : (
                    <WifiOffIcon style={{ color: '#FF9800' }} />
                )}
            </div>
            <Snackbar
                open={showNotification}
                autoHideDuration={6000}
                onClose={() => setShowNotification(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowNotification(false)}
                    severity={severity}
                    sx={{ width: '100%'}}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ConnectionStatus;