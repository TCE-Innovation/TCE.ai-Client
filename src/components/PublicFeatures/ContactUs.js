//REACT
import React from 'react';

const ContactUs = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
            <iframe
                className="airtable-embed airtable-dynamic-height"
                src="https://airtable.com/embed/appA98lgpoCkM03ZU/shrvN5JsfEYgCz6at?backgroundColor=cyan"
                width="60%"
                height="100%"
                title="TCIG Asset Tracker"
                style={{ background: 'transparent', border: '1px solid #ccc' }}
            ></iframe>
        </div>
    );
};

export default ContactUs;
