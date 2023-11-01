//REACT
import React from 'react';

const ContactUs = () => {
    return (
        <div className='container'>
            <div className="header">CONTACT US</div>
            <br />
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
            <iframe
                className="airtable-embed airtable-dynamic-height"
                src="https://airtable.com/embed/appA98lgpoCkM03ZU/shrvN5JsfEYgCz6at?backgroundColor=cyan"
                width="100%"
                height="500px"
                title="TCIG Asset Tracker"
                style={{ background: 'transparent', border: '1px solid #ccc' }}
            ></iframe>
        </div>
    );
};

export default ContactUs;
