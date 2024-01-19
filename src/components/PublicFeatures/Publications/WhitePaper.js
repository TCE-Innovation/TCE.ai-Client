import styles from './whitepaper.module.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TrainLoader from '../../General/TrainLoader';
import StaticAppBar from './Navigation';

const getIframeUrl = (documentName) => {
    const urls = {
      'prdc-ripper': 'https://tceaiblob.blob.core.windows.net/whitepapers/PRDC Ripper White Paper R3.pdf',
      'airtable': 'https://tceaiblob.blob.core.windows.net/whitepapers/AirTable White Paper.pdf',
      'openspace': "https://tceaiblob.blob.core.windows.net/whitepapers/OpenSpace White Paper .pdf"
    };
    return urls[documentName];
  };

const WhitePaper = ( ) => { 
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const documentName = searchParams.get('document');

    const iframeUrl = getIframeUrl(documentName); 
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const handleBackClick = () => {
        navigate('/', { state: { fromWhitePaper: true, scrollTo: 'whitepapers' } });
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    return (
        <div className={`full-window-component ${styles.backgroundImage}`}>
            <div className="black-container">
                <StaticAppBar />
                
                <div className={styles.container}>
                <Button onClick={handleBackClick}>Return to Publications</Button>
                    {!iframeLoaded && (
                        <div style={spinnerContainerStyle}>
                            <TrainLoader />
                        </div>
                    )}
                    <iframe 
                        src={iframeUrl} 
                        height="90%"
                        width="100%"
                        onLoad={handleIframeLoad}
                        title="White Paper"
                        style={{ borderRadius: "1vw" }}>
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default WhitePaper;
