import React, { useState, useRef, useEffect, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import TrainLoader from '../General/TrainLoader';
import { AuthContext } from '../../authentication/Auth';
import { getUserProjectsArray } from '../../data/SQL';
import { getPBILog } from '../../data/Airtable';

const ProcoreDashboards = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [selectedDashboard, setSelectedDashboard] = useState('');
    const [availableDashboards, setAvailableDashboards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const iframeRef = useRef(null);
    const { userEmail } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get user's projects
                const userProjects = await getUserProjectsArray(userEmail, 'procore_dashboards');

                // Get PBI dashboard data 
                const pbiData = await getPBILog('tblktn0TTQNN2v3zM');

                // Filter dashboards that contain user's projects
                const userDashboards = pbiData.filter(dashboard => 
                    dashboard.projects.some(project => 
                        userProjects.includes(project)
                    )
                );
                
                setAvailableDashboards(userDashboards);
                if (userDashboards.length > 0) {
                    setSelectedDashboard(userDashboards[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setAvailableDashboards([]);
            } finally {
                setIsLoading(false);
            }
        };

        if (userEmail) {
            fetchData();
        }
    }, [userEmail]);

    const handleDashboardChange = (event) => {
        const selected = availableDashboards.find(dash => dash.name === event.target.value);
        setSelectedDashboard(selected);
        setIframeLoaded(false);
    };

    const handleFullScreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            } else if (iframeRef.current.mozRequestFullScreen) {
                iframeRef.current.mozRequestFullScreen();
            } else if (iframeRef.current.webkitRequestFullscreen) {
                iframeRef.current.webkitRequestFullscreen();
            } else if (iframeRef.current.msRequestFullscreen) {
                iframeRef.current.msRequestFullscreen();
            }
        }
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    if (isLoading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <TrainLoader />
            </Box>
        );
    }

    if (availableDashboards.length === 0) {
        return (
            <Box sx={{
                textAlign: 'center',
                padding: 3
            }}>
                <h2>No Dashboards Available</h2>
                <p>You don't have access to any Procore dashboards. Please contact your administrator.</p>
            </Box>
        );
    }

    return (
        <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2
        }}>
            {!iframeLoaded && selectedDashboard && (
                <Box sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 100
                }}>
                    <TrainLoader />
                </Box>
            )}
            
            <Box sx={{ 
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 0
            }}>
                <FormControl variant="standard" sx={{ minWidth: 200 }}>
                    <InputLabel id="dashboard-label">Dashboard</InputLabel>
                    <Select
                        labelId="dashboard-label"
                        id="dashboard-select"
                        value={selectedDashboard?.name || ''}
                        onChange={handleDashboardChange}
                        label="Dashboard"
                    >
                        {availableDashboards.map((dashboard) => (
                            <MenuItem key={dashboard.name} value={dashboard.name}>
                                {dashboard.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <button 
                    onClick={handleFullScreen} 
                    style={{ 
                        padding: '8px 12px', 
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}>
                    Full Screen
                </button>
            </Box>

            {selectedDashboard && (
                <Box sx={{ 
                    display: iframeLoaded ? 'block' : 'none',
                    width: '100%',
                    height: '78vh',
                    margin: 'auto'
                }}>
                    <iframe
                        ref={iframeRef}
                        onLoad={handleIframeLoad}
                        src={selectedDashboard ? selectedDashboard.url : ''}
                        style={{
                            width: '100%',
                            height: '100%',
                            border: '1px solid #ccc',
                            background: 'transparent',
                            display: 'block'
                        }}
                        title={`${selectedDashboard.name} Dashboard`}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ProcoreDashboards;