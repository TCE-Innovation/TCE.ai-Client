import React, { useState } from 'react';
import { CircularProgress } from '@mui/material';

const ContactUs = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', 
        height: '1375px', 
        marginTop: '20px', 
    };

    return (
        <div className='container'>
            <br />
            <br />
            <div className="header">IDEA SUBMISSION</div>
            <br />
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <CircularProgress />
                </div>
            )}
            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/appA98lgpoCkM03ZU/shrvN5JsfEYgCz6at?backgroundColor=cyan"
                    onLoad={handleIframeLoad}
                    width="100%"
                    height="1375px"
                    title="Contact Us Form"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
