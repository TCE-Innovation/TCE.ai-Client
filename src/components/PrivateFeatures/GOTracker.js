//REACT
import React from 'react';

const GOTracker = () => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center'}}>
            <div>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/appomQIAmLveKxqCg/shrXsBBu4TbSHg2TC?backgroundColor=pink"
                    width="100%"
                    height="750px"
                    title="TCIG Asset Tracker"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default GOTracker;