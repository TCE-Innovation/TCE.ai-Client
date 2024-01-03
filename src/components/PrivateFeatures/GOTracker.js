import React, { useState } from 'react';
import TrainLoader from '../General/TrainLoader';

const GOTracker = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

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
