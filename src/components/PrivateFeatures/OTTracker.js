//REACT
import React from 'react';

const OTTracker = () => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center'}}>
            <div>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/appxRXOvuEzjmVlTS/shrWbApsfP6fzj47m?backgroundColor=tealDusty"
                    width="100%"
                    height="1770px"
                    title="TCIG Asset Tracker"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default OTTracker;