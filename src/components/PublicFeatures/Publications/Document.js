import styles from './whitepaper.module.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TrainLoader from '../../General/TrainLoader';

const getIframeUrl = (documentName) => {
    const urls = {
      'prdc-ripper': 'https://tceaiblob.blob.core.windows.net/whitepapers/PRDC Ripper White Paper R3.pdf',
      'airtable': 'https://tceaiblob.blob.core.windows.net/whitepapers/AirTable White Paper.pdf',
      'openspace': "https://tceaiblob.blob.core.windows.net/whitepapers/OpenSpace White Paper .pdf",
      "openspace-sop": "https://tceaiblob.blob.core.windows.net/whitepapers/OpenSpace Standard Operating Procedure.pdf",
      'go-tracker': "https://tceaiblob.blob.core.windows.net/whitepapers/GO Tracker White Paper.pdf",
      "go-tracker-sop": "https://tceaiblob.blob.core.windows.net/whitepapers/GO Tracker Standard Operating Procedure.pdf",
      "bridgit": "https://tceaiblob.blob.core.windows.net/whitepapers/Bridgit Bench White Paper.pdf",
      


    };
    return urls[documentName];
  };

const Document = ( ) => { 
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const documentName = searchParams.get('file');

    const iframeUrl = getIframeUrl(documentName); 
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    return (      
        <div className={styles.container}>
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
            )}
            <iframe 
                src={iframeUrl} 
                height="100%"
                width="100%"
                onLoad={handleIframeLoad}
                title="White Paper">
            </iframe>
        </div>
    );
};

export default Document;
