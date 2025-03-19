import React, { useState, useEffect, useRef } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; // Adjust the path to where your function is located

const EITDashboard = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');
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
                const tableID = "tblVNsqiF3P7bTwTT";
                const response = await getPBILog(tableID);
                if (response && response.length > 0) {
                    setIframeSrc(response[0].url);
                } else {
                    console.error('No URL found in the response');
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

    const spinnerContainerStyle = {
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center', marginTop:20}}>
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
            )}

            {/* Full Screen Button Container */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', paddingRight: '10px' }}>
                <button 
                    onClick={handleFullScreen} 
                    style={{ padding: '8px 12px', cursor: 'pointer' }}
                >
                    Full Screen
                </button>
            </div>

            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    ref={iframeRef}
                    onLoad={handleIframeLoad}
                    className="airtable-embed airtable-dynamic-height"
                    src={iframeSrc}
                    width="100%"
                    height="750px"
                    title="Equipment Install Tracking Dashboard"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default EITDashboard;