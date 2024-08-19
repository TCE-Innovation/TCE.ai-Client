import React, { useState, useEffect } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; // Adjust the path to where your function is located

const OverviewDashboard = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const tableID = "tblVJiExefKAL9xyM";
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
            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    onLoad={handleIframeLoad}
                    className="airtable-embed airtable-dynamic-height"
                    src={iframeSrc}
                    width="100%"
                    height="750px"
                    title="TCIG Overview Dashboard"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default OverviewDashboard;
