import React, { useState, useEffect, useRef } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; // Adjust the path to where your function is located
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const ExecutiveDashboards = () => {
    const [nameUrlMap, setNameUrlMap] = useState({});
    const [dashboardNames, setDashboardNames] = useState([]);
    const [selectedDashboard, setSelectedDashboard] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const iframeRef = useRef(null);
    
    const handleFullScreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            } else if (iframeRef.current.mozRequestFullScreen) { // Firefox
                iframeRef.current.mozRequestFullScreen();
            } else if (iframeRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                iframeRef.current.webkitRequestFullscreen();
            } else if (iframeRef.current.msRequestFullscreen) { // IE/Edge
                iframeRef.current.msRequestFullscreen();
            }
        }
    };

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const tableID = "tblClSMqs3WKoFNoq";
                const response = await getPBILog(tableID);
                console.log(response);
                if (response) {
                    // set states upon sucessful api response
                    const tmpMap = response;
                    const tmpNames = Object.keys(response);
                    const firstName = tmpNames[0];
                    const iframeSrc = response[firstName];
                    setNameUrlMap(tmpMap);
                    setDashboardNames(tmpNames);
                    setSelectedDashboard(firstName);
                    setIframeSrc(iframeSrc);
                } else {
                    console.error('Error fetching URLs from Airtable');
                }
            } catch (error) {
                console.error('Error fetching the dashboard link:', error);
            }
        };
        fetchLink();
    }, []);

    useEffect(() => {
        if (selectedDashboard && nameUrlMap[selectedDashboard]) {
            // Set URL of iframe if dashboard selection changed
            setIframeSrc(nameUrlMap[selectedDashboard]);
        }
    }, [selectedDashboard, nameUrlMap]);

    const handleDashboardChange = (event) => {
        setSelectedDashboard(event.target.value);
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center', marginTop:20}}>
            {!iframeLoaded && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            <Box sx={{ width: '100%', display: 'flex', marginBottom: 2 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="Dashboard-Name">Dashboard Name</InputLabel>
                    <Select
                        labelId="Dashboard Name"
                        id="Dashboard-Name"
                        value={selectedDashboard}
                        onChange={handleDashboardChange}
                        label="Name"
                    >
                        {dashboardNames.map((name) => (
                            <MenuItem key={name} value={name}>{name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Full Screen Button */}
                <div style={{ position: 'relative', width: '100%' }}>
                    <button 
                        onClick={handleFullScreen} 
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            right: 0, 
                            padding: '8px 12px', 
                            cursor: 'pointer' 
                        }}>
                        Full Screen
                    </button>
                </div>
            </Box>
            {iframeSrc && (
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '75vh', margin: 'auto' }}>
                    <iframe
                        ref={iframeRef}
                        onLoad={handleIframeLoad}
                        src={iframeSrc}
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                        title='Training'
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default ExecutiveDashboards;