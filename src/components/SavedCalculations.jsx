import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, List, ListItem, ListItemText, ListItemSecondaryAction,
    IconButton, Typography, Tooltip, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudIcon from '@mui/icons-material/Cloud';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { storageManager } from '../utils/storageManager';

const SavedCalculations = ({ savedCalculations, setSavedCalculations }) => {
    const [selectedCalculation, setSelectedCalculation] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [selectedItems, setSelectedItems] = useState([]);
    const [filenameDialogOpen, setFilenameDialogOpen] = useState(false);
    const [customFilename, setCustomFilename] = useState('');
    const [calculationsToExport, setCalculationsToExport] = useState([]);
    // Add these new states
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    // Sort the calculations by timestamp (newest)
    const sortedCalculations = [...savedCalculations].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
        };

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    // Reset selection when calculations change
    useEffect(() => {
        setSelectedItems([]);
    }, [savedCalculations]);

    const handleDelete = (id) => {
        const updatedCalculations = savedCalculations.filter(calc => calc.id !== id);
        setSavedCalculations(updatedCalculations);
        localStorage.setItem('savedCalculations', JSON.stringify(updatedCalculations));
        setDeleteConfirmOpen(false);
    };

    const confirmDelete = (id) => {
        setIdToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleShowDetails = (calculation) => {
        setSelectedCalculation(calculation);
        setShowDetails(true);
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
                // Place EE after the inch symbol
                centerOrEndExcess = `${decimalToFraction(calc.results.EE).replace('"', '" EE')}`;
            } else if (calc.results.CE !== 0) {
                // Place CE after the inch symbol
                centerOrEndExcess = `${decimalToFraction(calc.results.CE).replace('"', '" CE')}`;
            } else {
                centerOrEndExcess = `${decimalToFraction(0)}`;
            }

            csvContent += `"${calc.name}",` +  // EQUIPMENT NAME
                        `,` +                  // EQUIPMENT TYPE (empty cell)
                        `${decimalToFraction(calc.inputs.H)},` +  // HEIGHT OF EQUIP. FROM H.O.R.
                        `,` +                  // CHART LETTER (empty cell) 
                        `${decimalToFraction(calc.inputs.D)},` +  // DISTANCE TO G.O.R.
                        `,` +                  // TRACK (empty cell)
                        `${centerOrEndExcess},` + // CENTER OR END EXCESS with EE or CE appended
                        `${decimalToFraction(calc.inputs.SUPER)},` + // SUPER ELEVATION
                        `${decimalToFraction(calc.results.SE)},` + // SUPER ELEV. EXCESS
                        `${decimalToFraction(calc.results.LLLEClearance)},` + // MIN. DISTANCE REQUIRED
                        `${decimalToFraction(calc.results.clearance)}\n`;     // TOTAL CLEARANCE
        });
        return csvContent;
    };

    // Common export function that takes calculations as parameter
    const handleExportCalculations = async (calculations, fileName) => {
        if (!navigator.onLine) {
            alert("You're currently offline. Please connect to the internet to export calculations.");
            return;
        }

        try {
            if (calculations.length === 0) {
                alert("No calculations to export.");
                return;
            }

            // Generate CSV content
            const csvContent = convertToCSV(calculations);
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            
            // Use Web Share API if available
            if (navigator.share && navigator.canShare) {
                const file = new File([blob], fileName, { 
                    type: 'text/csv' 
                });
                
                // Use Web Share API
                await navigator.share({
                    files: [file],
                    title: 'Export Calculations',
                });
            } else {
                // Fallback to traditional download
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url); // Clean up
            }
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
        }
    };

    // Function to prepare export and show filename dialog
    const prepareExport = (calculations, defaultName) => {
        setCalculationsToExport(calculations);
        setCustomFilename(defaultName);
        setFilenameDialogOpen(true);
    };

    // Handler for exporting a single calculation
    const handleExportSingle = (calculation) => {
        const defaultName = `${calculation.name.replace(/\s+/g, '_')}_clearanceCalculation`;
        prepareExport([calculation], defaultName);
    };

    // Handler for exporting all or selected calculations
    const handleExportAll = () => {
        // Determine which calculations to export
        const calcsToExport = selectedItems.length > 0 
            ? savedCalculations.filter(calc => selectedItems.includes(calc.id))
            : savedCalculations;
        
        // Create default file name based on export type
        const defaultName = selectedItems.length > 0
            ? `${new Date().toISOString().split('T')[0]}_clearanceCalculations`
            : `${new Date().toISOString().split('T')[0]}_clearanceCalculations`;

        prepareExport(calcsToExport, defaultName);
    };

    // Function to execute export with custom filename
    const executeExport = async () => {
        let filename = customFilename.trim();
        
        // Ensure filename has .csv extension
        if (!filename.toLowerCase().endsWith('.csv')) {
            filename = `${filename}.csv`;
        }
        
        await handleExportCalculations(calculationsToExport, filename);
        setFilenameDialogOpen(false);
    };

    const handleToggleSelect = (event, id) => {
        event.stopPropagation();
        setSelectedItems(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(itemId => itemId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handleDeleteFromDetails = () => {
        if (selectedCalculation) {
            confirmDelete(selectedCalculation.id);
        }
    };

    return (
        <>
            <div className="saved-calculations-container">
                <div className="saved-calculations-header">
                    <div className="export-controls" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExportAll}
                            disabled={!isOnline || savedCalculations.length === 0}
                            startIcon={isOnline ? <CloudIcon /> : <CloudOffIcon />}
                            sx={{ width: '100%' }}
                        >
                            {selectedItems.length > 0 
                                ? `Export Selected (${selectedItems.length})` 
                                : "Export All"}
                        </Button>
                        {!isOnline && savedCalculations.length > 0 && (
                            <Typography variant="caption" color="error" style={{ marginLeft: 10 }}>
                                Connect to internet to export
                            </Typography>
                        )}
                    </div>
                </div>

                {savedCalculations.length === 0 ? (
                    <Typography variant="body2" style={{ padding: '20px 0', textAlign: 'center' }}>
                        No saved calculations yet
                    </Typography>
                ) : (
                    <List>
                        {sortedCalculations.map((calc) => (
                            <ListItem
                                key={calc.id}
                                button
                                onClick={() => handleShowDetails(calc)}
                                divider
                                selected={selectedItems.includes(calc.id)}
                                sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                    },
                                    paddingLeft: 1.5,
                                    paddingRight: 10, // Reserve space for action buttons
                                    position: 'relative'
                                }}
                            >
                                <Checkbox 
                                    size="small"
                                    checked={selectedItems.includes(calc.id)}
                                    onChange={(e) => handleToggleSelect(e, calc.id)}
                                    onClick={(e) => e.stopPropagation()}
                                    tabIndex={-1}
                                    disableRipple
                                    sx={{ 
                                        padding: '6px',
                                        marginRight: '8px',
                                        '& .MuiSvgIcon-root': {
                                            borderRadius: '50%'
                                        }
                                    }}
                                    icon={<div style={{ 
                                        width: 18, 
                                        height: 18, 
                                        border: '1px solid #bdbdbd', 
                                        borderRadius: '50%' 
                                    }}/>}
                                    checkedIcon={<div style={{ 
                                        width: 18, 
                                        height: 18, 
                                        backgroundColor: '#1976d2', 
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <span style={{
                                            color: 'white',
                                            fontSize: '12px',
                                            lineHeight: 1
                                        }}>✓</span>
                                    </div>}
                                />
                                <ListItemText
                                    primary={storageManager.truncateText(calc.name)}
                                    secondary={`${new Date(calc.timestamp).toLocaleString()}`}
                                    primaryTypographyProps={{ 
                                        title: calc.name,
                                        sx: { 
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: {
                                                xs: '150px',
                                                sm: '210px',
                                                md: '310px',
                                            }
                                        }
                                    }}
                                />
                                <ListItemSecondaryAction>
                                    <Tooltip title={isOnline ? "Export" : "Need internet to export"}>
                                        <span>
                                            <IconButton
                                                edge="end"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleExportSingle(calc);
                                                }}
                                                disabled={!isOnline}
                                            >
                                                <GetAppIcon color={isOnline ? "primary" : "disabled"} /> 
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    <IconButton
                                        edge="end"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            confirmDelete(calc.id);
                                        }}
                                    >
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>

            <Dialog open={showDetails} onClose={() => setShowDetails(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pr: 1,
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                }}>
                    <Typography
                        variant="h6"
                        className="calculation-details-title"
                        title={selectedCalculation?.name}
                        sx={{
                            maxWidth: 'calc(100% - 40px)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {selectedCalculation?.name}
                    </Typography>
                    <IconButton 
                        onClick={handleDeleteFromDetails}
                        size="small"
                        color="error"
                        title="Delete calculation"
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ pt: 2, pb: 1 }}>
                    {selectedCalculation && (
                        <div className="calculation-details">
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 500, 
                                    mb: 1, 
                                    color: 'primary.main',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                    pb: 0.5
                                }}
                            >
                                Input Values
                            </Typography>
                            
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 1.5,
                                mb: 2
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Train Division:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{selectedCalculation.inputs.division}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Track Type:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {selectedCalculation.inputs.trackType === 'tangent' ? 'Tangent' : 'Curved'}
                                    </Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Side of Track:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {selectedCalculation.inputs.direction === 'IN' ? 
                                            (selectedCalculation.inputs.trackType === 'tangent' ? 'Side of Lower Rail' : 'Inside of Curve') : 
                                            (selectedCalculation.inputs.trackType === 'tangent' ? 'Side of Higher Rail' : 'Outside of Curve')}
                                    </Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Height from T.O.R.:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.inputs.H)}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Distance to G.O.R.:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.inputs.D)}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Middle Ordinate:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.inputs.MO)}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Super Elevation:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.inputs.SUPER)}</Typography>
                                </div>
                            </div>

                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 500, 
                                    mb: 1, 
                                    color: 'primary.main',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                    pb: 0.5
                                }}
                            >
                                Results
                            </Typography>
                            
                            <div style={{ 
                                display: 'grid', 
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 1.5
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Curve Radius:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {selectedCalculation.results.R === 0 ? "∞" : `${decimalToFraction(selectedCalculation.results.R)}'`}
                                    </Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Super Elevation Excess:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.results.SE)}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">End Excess:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {decimalToFraction(selectedCalculation.results.EE)}
                                    </Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Center Excess:</Typography>
                                    <Typography variant="body2" fontWeight="medium">
                                        {decimalToFraction(selectedCalculation.results.CE)}
                                    </Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Min. Distance Required:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.results.LLLEMinReq)}</Typography>
                                </div>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="body2" color="text.secondary">Total Clearance:</Typography>
                                    <Typography variant="body2" fontWeight="medium">{decimalToFraction(selectedCalculation.results.LLLEClearance)}</Typography>
                                </div>
                                
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    gridColumn: '1 / -1',
                                    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
                                    paddingTop: 1,
                                    marginTop: 1
                                }}>
                                    <Typography variant="body1" fontWeight="medium" color="text.secondary">Calculated Clearance:</Typography>
                                    <Typography 
                                        variant="body1" 
                                        fontWeight="bold"
                                        color={selectedCalculation.results.clearance > 0 ? 'success.main' : 'error.main'}
                                    >
                                        {decimalToFraction(selectedCalculation.results.clearance)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions sx={{ borderTop: '1px solid rgba(0, 0, 0, 0.12)', px: 2 }}>
                    <Button onClick={() => setShowDetails(false)}>Close</Button>
                    <Button
                        onClick={() => handleExportSingle(selectedCalculation)}
                        variant="contained"
                        color="primary"
                        disabled={!isOnline}
                        startIcon={isOnline ? <CloudIcon /> : <CloudOffIcon />}
                    >
                        Export
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Filename Dialog */}
            <Dialog 
                open={filenameDialogOpen} 
                onClose={() => setFilenameDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>Name Your Export File</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Filename"
                        fullWidth
                        variant="outlined"
                        value={customFilename}
                        onChange={(e) => setCustomFilename(e.target.value)}
                        helperText="CSV extension will be added automatically if not included"
                        InputProps={{
                            endAdornment: !customFilename.toLowerCase().includes('.csv') ? 
                                <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>.csv</span> : null
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFilenameDialogOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={executeExport}
                        variant="contained" 
                        color="primary"
                        disabled={!customFilename.trim()}
                    >
                        Export
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete this calculation? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button 
                        onClick={() => handleDelete(idToDelete)} 
                        color="error" 
                        variant="contained"
                        autoFocus
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SavedCalculations;