import React, { useState, useEffect } from 'react';
import {
    Typography, Button, LinearProgress, 
    Paper, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudIcon from '@mui/icons-material/Cloud';
import { storageManager } from '../utils/storageManager';
import IonicAlert from './IonicAlert'; 
import IonicPrompt from './IonicPrompt';

const StorageManager = ({ savedCalculations, setSavedCalculations }) => {
    const [storageInfo, setStorageInfo] = useState({ usage: 0, quota: 1, percentUsed: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [filenameDialogOpen, setFilenameDialogOpen] = useState(false);
    const [customFilename, setCustomFilename] = useState('');
    const [promptKey, setPromptKey] = useState(0); // Add this for forcing re-renders
    
    // Add new state for delete confirmation dialog
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

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

    // Modified to use custom dialog instead of window.confirm
    const handleDeleteAll = async () => {
        setDeleteConfirmOpen(true);
    };
    
    // New function to actually perform deletion after confirmation
    const confirmDeleteAll = async () => {
        localStorage.removeItem('savedCalculations');
        setSavedCalculations([]);
        const info = await storageManager.checkStorageUsed();
        setStorageInfo(info);
        setDeleteConfirmOpen(false);
    };

    // Helper function to convert decimal inches to mixed number format with fractions
    const decimalToFraction = (decimal) => {
        if (decimal === 0) return '0"';
        
        // Get the whole number part
        const wholePart = Math.floor(decimal);
        
        // Get the decimal part
        let decimalPart = decimal - wholePart;
        
        // If decimal part is very small, treat as zero
        if (decimalPart < 0.001) return `${wholePart}"`;
        
        // Denominator limits to powers of 2, up to 16
        const denominators = [2, 4, 8, 16];
        
        // Find closest fraction with denominator up to 16
        let closestFraction = { numerator: 0, denominator: 16 };
        let minDifference = 1;
        
        // For each possible denominator
        for (const denominator of denominators) {
            // Calculate the numerator that would most closely match our decimal
            const numerator = Math.round(decimalPart * denominator);
            const difference = Math.abs(decimalPart - numerator / denominator);
            
            // If this is a better match, store it
            if (difference < minDifference) {
                minDifference = difference;
                closestFraction = { numerator, denominator };
                
                // If it's an exact match (or very close), break early
                if (difference < 0.0001) break;
            }
        }
        
        // Simplify the fraction
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(closestFraction.numerator, closestFraction.denominator);
        
        const simplifiedNumerator = closestFraction.numerator / divisor;
        const simplifiedDenominator = closestFraction.denominator / divisor;
        
        // Special case: if fraction equals 1, increment whole number and set fraction to 0
        if (simplifiedNumerator === simplifiedDenominator) {
            return `${wholePart + 1}"`;
        }
        
        // Return properly formatted string (whole number, space, fraction, inch symbol)
        if (wholePart === 0) {
            return `${simplifiedNumerator}/${simplifiedDenominator}"`;
        } else if (simplifiedNumerator === 0) {
            return `${wholePart}"`;
        } else {
            return `${wholePart} ${simplifiedNumerator}/${simplifiedDenominator}"`;
        }
    };

    // Helper function to convert calculations to CSV format
    const convertToCSV = (calculations) => {
        // Headers
        let csvContent = 'EQUIPMENT NAME,EQUIPMENT TYPE,HEIGHT OF EQUIP. FROM T.O.R.,CHART LETTER,DISTANCE TO G.O.R.,' +
                        'TRACK,CENTER OR END EXCESS,SUPER ELEVATION,SUPER ELEV. EXCESS,MIN. DISTANCE REQUIRED,TOTAL CLEARANCE\n';
        
        // Add data rows
        calculations.forEach(calc => {
            // For CENTER OR END EXCESS, use whichever value is not 0
            let centerOrEndExcess;
            if (calc.results.EE !== 0) {
                // Place the quotation mark before EE
                centerOrEndExcess = `${decimalToFraction(calc.results.EE)} EE`;
            } else if (calc.results.CE !== 0) {
                // Place the quotation mark before CE
                centerOrEndExcess = `${decimalToFraction(calc.results.CE)} CE`;
            } else {
                centerOrEndExcess = `${decimalToFraction(0)}`;
            }

            csvContent += `"${calc.name}",` +  // EQUIPMENT NAME
                        `,` +                  // EQUIPMENT TYPE (empty cell)
                        `${decimalToFraction(calc.inputs.H)},` +  // HEIGHT OF EQUIP. FROM T.O.R.
                        `,` +                  // CHART LETTER (empty cell) 
                        `${decimalToFraction(calc.inputs.D)},` +  // DISTANCE TO G.O.R.
                        `,` +                  // TRACK (empty cell)
                        `${centerOrEndExcess},` + // CENTER OR END EXCESS
                        `${decimalToFraction(calc.inputs.SUPER)},` + // SUPER ELEVATION
                        `${decimalToFraction(calc.results.SE)},` + // SUPER ELEV. EXCESS
                        `${decimalToFraction(calc.results.LLLEClearance)},` + // MIN. DISTANCE REQUIRED
                        `${decimalToFraction(calc.results.clearance)}\n`;     // TOTAL CLEARANCE
        });
        return csvContent;
    };

    const handleExportCalculations = async (fileName) => {
        if (!navigator.onLine) {
            alert("You're currently offline. Please connect to the internet to export calculations.");
            return false;
        }

        try {
            if (savedCalculations.length === 0) {
                alert("No calculations to export.");
                return false;
            }

            // Generate CSV content
            const csvContent = convertToCSV(savedCalculations);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            
            // Use Web Share API if available
            if (navigator.share && navigator.canShare) {
                const file = new File([blob], fileName, { 
                    type: 'text/csv' 
                });
                
                const shareData = {
                    files: [file],
                };
                
                if (navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                    return true;
                }
            }
            
            // Fallback for desktop or browsers without Web Share API
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return true;
            
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
            return false;
        }
    };

    const handleExportAndDelete = async () => {
        if (!isOnline) {
            alert("You're currently offline. Please connect to the internet to export calculations.");
            return;
        }
        
        if (savedCalculations.length === 0) {
            alert("No calculations to export.");
            return;
        }
        
        // Set default filename
        const defaultName = `${new Date().toISOString().split('T')[0]}`;
        setCustomFilename(defaultName);
        
        // Increment promptKey to ensure fresh instance
        setPromptKey(prevKey => prevKey + 1);
        
        // Open the dialog
        setFilenameDialogOpen(true);
    };
    
    const executeExportAndDelete = async (filename) => {
        let finalFilename = filename.trim();
        
        // Ensure filename has .csv extension
        if (!finalFilename.toLowerCase().endsWith('.csv')) {
            finalFilename = `${finalFilename}.csv`;
        }
        
        // Close the filename dialog immediately
        setFilenameDialogOpen(false);
        
        // Try to export
        const exportSuccess = await handleExportCalculations(finalFilename);
        
        // Only prompt for delete confirmation if export was successful
        if (exportSuccess) {
            setDeleteConfirmOpen(true);
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
        <>
            <Paper 
                elevation={2} 
                sx={{ 
                    p: 2,        // Reduced padding
                    mb: 2,       // Bottom margin
                    borderRadius: '4px 4px 0 0', // Rounded only at top
                    boxShadow: '0px -2px 4px rgba(0,0,0,0.1)' // Shadow only at top for separation
                }}
            >
                <Box sx={{ mt: 2, mb: 3 }}>
                    <Typography variant="body2" gutterBottom>
                        Storage Usage: {isLoading ? 'Calculating...' : 
                            `${Math.round(storageInfo.percentUsed)}%`}
                        {' '}({isLoading ? '...' : 
                            `${(storageInfo.usage / 1024 / 1024).toFixed(4)} MB of ${(storageInfo.quota / 1024 / 1024).toFixed(2)} MB`})
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
                        startIcon={isOnline ? <CloudIcon /> : <CloudOffIcon />}
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

            {/* Replace Dialog with IonicPrompt */}
            <IonicPrompt
                key={promptKey}
                isOpen={filenameDialogOpen}
                onDidDismiss={() => {
                    setFilenameDialogOpen(false);
                    setCustomFilename('');
                }}
                header="Export All"
                message="Enter a filename for the CSV export"
                placeholder={`${new Date().toISOString().split('T')[0]}`}
                value={customFilename}
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            setCustomFilename('');
                            setFilenameDialogOpen(false);
                            // Increment key to force a fresh instance next time
                            setPromptKey(prevKey => prevKey + 1);
                            return false;
                        }
                    },
                    {
                        text: 'Export All',
                        handler: (formData) => {
                            if (formData.input && formData.input.trim() !== '') {
                                executeExportAndDelete(formData.input.trim());
                            } else {
                                // Use default name if nothing was entered
                                const defaultName = `${new Date().toISOString().split('T')[0]}`;
                                executeExportAndDelete(defaultName);
                            }
                            // Increment key to force a fresh instance next time
                            setPromptKey(prevKey => prevKey + 1);
                            return true;
                        }
                    }
                ]}
            />
            
            {/* Delete Confirmation Dialog */}
            <IonicAlert
                isOpen={deleteConfirmOpen}
                onDidDismiss={() => setDeleteConfirmOpen(false)}
                header="Confirm Deletion"
                message="Are you sure you want to delete all saved calculations? This action cannot be undone."
                cssClass="delete-confirmation"
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => setDeleteConfirmOpen(false)
                    },
                    {
                        text: 'Delete All',
                        role: 'destructive',
                        cssClass: 'danger',
                        handler: () => {
                            confirmDeleteAll();
                            setDeleteConfirmOpen(false);
                        }
                    }
                ]}
            />
        </>
    );
};

export default StorageManager;