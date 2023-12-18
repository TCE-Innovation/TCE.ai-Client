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
                    src="https://judlauent.sharepoint.com/sites/TCEInnovation/_layouts/15/embed.aspx?UniqueId=6e8aad5a-a430-45a0-9c5b-24159ce9a449" 
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
