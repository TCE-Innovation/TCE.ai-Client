import React, { useState, useEffect } from 'react';
import TrainLoader from '../General/TrainLoader';

const ProcoreDashboards = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignContent: 'center', marginTop: 20 }}>
            {!iframeLoaded && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            <div style={{ width: '100%', height: '75vh', margin: 'auto' }}>
                <iframe
                    onLoad={handleIframeLoad}
                    src={'https://app.powerbi.com/view?r=eyJrIjoiOGQ1NjY0YTQtNWIwMC00ODcwLTk5ZGQtNjQ5MGU5ZmQwMjU5IiwidCI6IjM1MzkyOTNlLTU4ZmEtNGJhYi1hMDJlLTE4ZGM1N2ZhOTczNyIsImMiOjN9'}
                    style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                    title='Training'
                ></iframe>
            </div>
        </div>
    );
};

export default ProcoreDashboards;