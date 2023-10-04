//REACT
import React from 'react';

//COMPONENTS
import ItemCarousel from './ItemCarousel';

const AssetTracker = () => {
    return (
        <div style={{ width: '100%'}}>
            <ItemCarousel />
            <div>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
                <iframe
                    className="airtable-embed airtable-dynamic-height"
                    src="https://airtable.com/embed/apphQBuS3DFnPYMFm/shrsO3SBO3YKOJRIX?backgroundColor=purple"
                    width="100%"
                    height="750px"
                    title="TCIG Asset Tracker"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default AssetTracker;
