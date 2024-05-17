import React, { useState } from 'react';
import TrainLoader from '../General/TrainLoader';

const ToolUsage = () => {
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
                <iframe
                    onLoad={handleIframeLoad}
                    src="https://app.powerbi.com/reportEmbed?reportId=3b0298ad-530a-40b9-b337-911f35150e8d&autoAuth=true&ctid=3539293e-58fa-4bab-a02e-18dc57fa9737"
                    width="100%"
                    height="750px"
                    title="Data Dashboard"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default ToolUsage;