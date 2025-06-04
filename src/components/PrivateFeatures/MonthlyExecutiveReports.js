import React, { useState, useEffect, useRef } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; // Adjust the path to where your function is located

const MonthlyExecutiveReports = () => {
    const [iframeSrc, setIframeSrc] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const iframeRef = useRef(null);

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const tableID = "tblx3x0CUBoYVEkIj";
                const response = await getPBILog(tableID);
                console.log(response);
                if (response && response.url) {
                    setIframeSrc(response.url);
                } else {
                    console.error('Error fetching URL from Airtable');
                }
            } catch (error) {
                console.error('Error fetching the dashboard link:', error);
            }
        };
        fetchLink();
    }, []);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', height: 'calc(100vh - 168px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {!iframeLoaded && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            {iframeSrc && (
                <div style={{ flex: 1, width: '100%', height: '100%', display: iframeLoaded ? 'block' : 'none', overflow: 'auto' }}>
                    <iframe
                        ref={iframeRef}
                        onLoad={handleIframeLoad}
                        src={iframeSrc}
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent', display: 'block' }}
                        title="Monthly Executive Reports"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default MonthlyExecutiveReports;