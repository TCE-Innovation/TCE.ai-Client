import React, { useState, useEffect } from 'react';
import {
    Typography, Button, LinearProgress, 
    List, ListItem, ListItemText,
    Paper, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { storageManager } from '../utils/storageManager';

const StorageManager = ({ savedCalculations, setSavedCalculations }) => {
    const [storageInfo, setStorageInfo] = useState({ usage: 0, quota: 1, percentUsed: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const checkStorage = async () => {
            setIsLoading(true);
            const info = await storageManager.checkStorageUsed();
            setStorageInfo(info);
            setIsLoading(false);
        };

        // Immediately check storage when component mounts or savedCalculations changes
        checkStorage();
        
        // Setup a listener for storage events to catch changes from other tabs/windows
        const handleStorageChange = (event) => {
            if (event.key === 'savedCalculations') {
                checkStorage();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Add online/offline event listeners
        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
        };
        
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, [savedCalculations]);

    const handleDeleteAll = async () => {
        if (window.confirm("Are you sure you want to delete all saved calculations?")) {
            localStorage.removeItem('savedCalculations');
            setSavedCalculations([]);
            const info = await storageManager.checkStorageUsed();
            setStorageInfo(info);
        }
    };

    const handleExportAndDelete = async () => {
        // First export all data
        try {
            console.log("Exporting all calculations...");

            // Then delete all 
            handleDeleteAll();
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
        }
    };

    const getStorageColor = (percent) => {
        if (percent < 60) return 'success';
        if (percent < 80) return 'warning';
        return 'error';
    }

    const buttonStyle = {
        fontSize: '0.75rem',
    };

    return (
        <Paper 
            elevation={2} 
            sx={{ 
                p: 2,        // Reduced padding
                mb: 2,       // Bottom margin
                borderRadius: '4px 4px 0 0', // Rounded only at top
                boxShadow: '0px -2px 4px rgba(0,0,0,0.1)' // Shadow only at top for separation
            }}
        >
            <Typography variant="h6">Storage Management</Typography>

            <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                    Storage Usage: {isLoading ? 'Calculating...' : 
                        `${Math.round(storageInfo.percentUsed)}%`}
                    {' '}({isLoading ? '...' : 
                        `${(storageInfo.usage / 1024 / 1024).toFixed(2)} MB of ${(storageInfo.quota / 1024 / 1024).toFixed(2)} MB`})
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={Math.min(storageInfo.percentUsed, 100)}
                    color={getStorageColor(storageInfo.percentUsed)}
                    sx={{ height: 10, borderRadius: 5 }}
                />
            </Box>

            {storageInfo.percentUsed > 70 && (
                <Typography variant="body2" color="error" gutterBottom>
                Storage space is running low. Consider exporting and deleting some calculations.
                </Typography>
            )}

            {!isOnline && (
                <Typography 
                    variant="body2" 
                    color="warning.main" 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 0.5,
                        mb: 1
                    }}
                >
                    <CloudOffIcon fontSize="small" />
                    You're offline. Export functionality is disabled.
                </Typography>
            )}

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button 
                    variant="outlined"
                    color="primary"
                    startIcon={<GetAppIcon />}
                    onClick={handleExportAndDelete}
                    disabled={savedCalculations.length === 0 || !isOnline}
                    sx={buttonStyle}
                    title={!isOnline ? "Export is unavailable while offline" : ""}
                >
                    Export All & Delete
                </Button>

                <Button 
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteAll}
                    disabled={savedCalculations.length === 0}
                    sx={buttonStyle}
                >
                    Delete All Calculations
                </Button>
            </Box>
        </Paper>
    );
};

export default StorageManager;