import styles from './whitepaper.module.css';
import React, { useState, useEffect } from 'react';
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
      "union-new-hire-package-2024": "https://tceaiblob.blob.core.windows.net/whitepapers/Fillable 2024 TC Electric Union New Hire Package.pdf",
      "union-new-hire-package-2025":"https://tceaiblob.blob.core.windows.net/whitepapers/Fillable 2025 TC Electric Union New Hire Package.pdf",
      "union-new-hire-package-p7-2024": "https://tceaiblob.blob.core.windows.net/whitepapers/Union New Hire Package - Page 7.pdf",
      "local-363-enrollment": "https://tceaiblob.blob.core.windows.net/whitepapers/Local 363-Enrollment Documents - FILLABLE.pdf",
      "bank-deposit-info": "https://tceaiblob.blob.core.windows.net/whitepapers/Bank Deposit Info.pdf"
    };
    return urls[documentName];
  };

const Document = () => { 
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const documentName = searchParams.get('file');

    const iframeUrl = getIframeUrl(documentName); 
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        if (!iframeUrl) {
            window.location.href = 'https://tce.tools/public'; // Redirect if document name is invalid
        }
    }, [iframeUrl]);

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
            {iframeUrl && (
                <iframe 
                    src={iframeUrl} 
                    height="100%"
                    width="100%"
                    onLoad={handleIframeLoad}
                    title="White Paper">
                </iframe>
            )}
        </div>
    );
};

export default Document;
