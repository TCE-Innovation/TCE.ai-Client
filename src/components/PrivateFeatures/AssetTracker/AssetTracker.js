import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';
import ItemCarousel from './ItemCarousel';

const AssetTracker = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '750px', 
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center' }}>
            <ItemCarousel />
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <CircularProgress />
                </div>
            )}
            <div style={{ display: iframeLoaded ? 'block' : 'none', marginTop: 40}}>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/apphQBuS3DFnPYMFm/shrsO3SBO3YKOJRIX?backgroundColor=purple"
                    onLoad={handleIframeLoad}
                    width="100%"
                    height="750px"
                    title="TCIG Asset Tracker"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default AssetTracker;
