import React, { useState, useEffect, useRef } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable';
import { Box } from '@mui/material';

const MonthlyExecutiveReports = () => {
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
                const tableID = "tblx3x0CUBoYVEkIj";
                const response = await getPBILog(tableID);
                console.log(response);
                if (response && response.url) {
                    setIframeSrc(response.url);
                } else {
                    console.error('Error fetching URL from Airtable');
                }
            } catch (error) {
                console.error('Error fetching the dashboard link:', error);
            }
        };
        fetchLink();
    }, []);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center', marginTop: 0 }}>
            {!iframeLoaded && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            <Box sx={{ width: '100%', display: 'flex', marginBottom: 2, height: '40px' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                    <button 
                        onClick={handleFullScreen} 
                        style={{ 
                            position: 'absolute', 
                            top: 0, 
                            right: 0, 
                            padding: '8px 12px', 
                            cursor: 'pointer',
                            borderRadius: '4px',
                        }}>
                        Full Screen
                    </button>
                </div>
            </Box>
            {iframeSrc && (
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '78vh', margin: 'auto' }}>
                    <iframe
                        ref={iframeRef}
                        onLoad={handleIframeLoad}
                        src={iframeSrc}
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent', display: 'block' }}
                        title="Monthly Executive Reports"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MonthlyExecutiveReports;