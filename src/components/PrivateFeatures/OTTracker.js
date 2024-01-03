import React, { useState } from 'react';
import TrainLoader from '../General/TrainLoader';

const OTTracker = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true)
    };

    const spinnerContainerStyle = {
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)' 
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center'}}>
            {!iframeLoaded && (
                <div style={ spinnerContainerStyle }>
                    <TrainLoader/>
                </div>
            )}
            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    onLoad={handleIframeLoad}
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/appxRXOvuEzjmVlTS/shrWbApsfP6fzj47m?backgroundColor=tealDusty"
                    width="100%"
                    height="1770px"
                    title="OverTime Tracker"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default OTTracker;
