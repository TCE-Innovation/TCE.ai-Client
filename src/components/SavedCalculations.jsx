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
        let csvContent = 'EQUIPMENT NAME,EQUIPMENT TYPE,HEIGHT OF EQUIP. FROM B.O.R.,CHART LETTER,DISTANCE TO G.O.R.,' +
                        'TRACK,CENTER OR END EXCESS,SUPER ELEVATION,SUPER ELEV. EXCESS,MIN. DISTANCE REQUIRED,TOTAL CLEARANCE\n';
        
        // Add data rows
        calculations.forEach(calc => {
            // For CENTER OR END EXCESS, use whichever value is not 0
            const centerOrEndExcess = calc.results.EE !== 0 ? calc.results.EE : calc.results.CE;
            
            csvContent += `"${calc.name}",` +  // EQUIPMENT NAME
                        `,` +                  // EQUIPMENT TYPE (empty cell)
                        `${decimalToFraction(calc.inputs.H)},` +  // HEIGHT OF EQUIP. FROM B.O.R.
                        `,` +                  // CHART LETTER (empty cell) 
                        `${decimalToFraction(calc.inputs.D)},` +  // DISTANCE TO G.O.R.
                        `,` +                  // TRACK (empty cell)
                        `${decimalToFraction(centerOrEndExcess)},` + // CENTER OR END EXCESS
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
            handleDelete(selectedCalculation.id);
            setShowDetails(false);
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
                                            handleDelete(calc.id);
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
                    pr: 1 // Reduce padding to accommodate the delete button
                }}>
                    <Typography
                        variant="h6"
                        className="calculation-details-title"
                        title={selectedCalculation?.name}
                        sx={{
                            maxWidth: 'calc(100% - 40px)', // Leave room for delete button
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
                <DialogContent>
                    {selectedCalculation && (
                        <div className="calculation-details">
                            <Typography variant="subtitle1">Input Values:</Typography>
                            <div className="detail-grid">
                                <Typography>Division: {selectedCalculation.inputs.division}</Typography>
                                <Typography>Track Type: {selectedCalculation.inputs.trackType}</Typography>
                                <Typography>Direction: {selectedCalculation.inputs.direction}</Typography>
                                <Typography>Height: {selectedCalculation.inputs.H} in.</Typography>
                                <Typography>Distance: {selectedCalculation.inputs.D} in.</Typography>
                                <Typography>Middle Ordinate: {selectedCalculation.inputs.MO} in.</Typography>
                                <Typography>Super Elevation: {selectedCalculation.inputs.SUPER} in.</Typography>
                            </div>

                            <Typography variant="subtitle1" style={{ marginTop: 20 }}>Results:</Typography>
                            <div className="detail-grid">
                                <Typography>Radius: {selectedCalculation.results.R.toFixed(3)} ft.</Typography>
                                <Typography>Super Elev. Excess: {selectedCalculation.results.SE.toFixed(3)} in.</Typography>
                                <Typography>End Excess: {selectedCalculation.results.EE.toFixed(3)} in.</Typography>
                                <Typography>Center Excess: {selectedCalculation.results.CE.toFixed(3)} in.</Typography>
                                <Typography>LLLE Min Req: {selectedCalculation.results.LLLEMinReq.toFixed(3)} in.</Typography>
                                <Typography>LLLE Clearance: {selectedCalculation.results.LLLEClearance.toFixed(3)} in.</Typography>
                                <Typography 
                                    style={{
                                        color: selectedCalculation.results.clearance > 0 ? 'green' : 'red',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Calculated Clearance: {selectedCalculation.results.clearance.toFixed(3)} in.
                                </Typography>
                            </div>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
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
        </>
    );
};

export default SavedCalculations;