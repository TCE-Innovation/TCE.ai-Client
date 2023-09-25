import React from 'react';

const AssetTracker = () => {
    return (
        <>
            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
            <iframe
                className="airtable-embed airtable-dynamic-height"
                src="https://airtable.com/embed/apphQBuS3DFnPYMFm/shrsO3SBO3YKOJRIX?backgroundColor=purple"
                width="100%"
                height="100%"
                title="TCIG Asset Tracker"
                style={{ background: 'transparent', border: '1px solid #ccc' }}
            ></iframe>
        </>
    );
};

export default AssetTracker;
