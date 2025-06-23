import React, { useState, useEffect } from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, List, ListItem, ListItemText, ListItemSecondaryAction,
    IconButton, Typography, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudIcon from '@mui/icons-material/Cloud';

const SavedCalculations = ({ savedCalculations, setSavedCalculations }) => {
    const [selectedCalculation, setSelectedCalculation] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    // Sort the calculations by timestamp (newest first)
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

    const handleDelete = (id) => {
        const updatedCalculations = savedCalculations.filter(calc => calc.id !== id);
        setSavedCalculations(updatedCalculations);
        localStorage.setItem('savedCalculations', JSON.stringify(updatedCalculations));
    };

    const handleShowDetails = (calculation) => {
        setSelectedCalculation(calculation)
        setShowDetails(true);
    };

    const handleExportSingle = async (calculation) => {
        if (!navigator.onLine) {
            alert("You're currently offline. Please connect to the internet to export calculations.");
            return;
        }

        try {
            // TODO: Implement export logic here
            console.log("Exporting calculation.");
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
        }
    };

    const handleExportAll = async () => {
        if (!navigator.onLine) {
            alert("You're currently offline. Please connect to the internet to export calculations.");
            return;
        }

        try {
            // TODO: Implement export logic here
            console.log("Exporting all calculations.");
        } catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
        }
    };

    return (
        <>
            <div className="saved-calculations-container">
                <div className="saved-calculations-header">
                    <div className="export-controls">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleExportAll}
                            disabled={!isOnline || savedCalculations.length === 0}
                            startIcon={isOnline ? <CloudIcon /> : <CloudOffIcon />}
                            sx={{ width: '100%' }}
                        >
                            Export All
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
                            >
                                <ListItemText
                                    primary={calc.name}
                                    secondary={`${new Date(calc.timestamp).toLocaleString()} - ${calc.inputs.division}`}
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

            <Dialog open={showDetails} onClose={() => setShowDetails(false)} maxWidth="md">
                <DialogTitle>{selectedCalculation?.name}</DialogTitle>
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
                        startIcon={isOnline ? <CloudIcon /> : <CloudOffIcon /> }
                    >
                        Export
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SavedCalculations;