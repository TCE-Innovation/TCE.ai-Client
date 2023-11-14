import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

const GOTracker = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const spinnerContainerStyle = {
        position: 'fixed', // Fixed position to place it relative to the viewport
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Offset the spinner to the exact center
        zIndex: 100, // Ensure the spinner is above other elements
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center'}}>
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <CircularProgress />
                </div>
            )}
            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    onLoad={handleIframeLoad}
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/appomQIAmLveKxqCg/shrXsBBu4TbSHg2TC?backgroundColor=pink"
                    width="100%"
                    height="750px"
                    title="TCIG Asset Tracker"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default GOTracker;
