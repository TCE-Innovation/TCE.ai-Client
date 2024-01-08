import styles from './whitepaper.module.css';
import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

const WhitePaper = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
    };

    return (
        <div className={styles.container}>
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <CircularProgress />
                </div>
            )}
            <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '100%'}}>
                <iframe 
                    src="https://tceaiblob.blob.core.windows.net/whitepapers/PRDC Ripper White Paper R1.0.pdf" 
                    height="100%"
                    width="100%"
                    onLoad={handleIframeLoad}
                    className={styles.fullscreenIframe}
                    title="PRDC Ripper White Paper R1.0.pdf">
                </iframe>
            </div>
        </div>
    );
};

export default WhitePaper;
