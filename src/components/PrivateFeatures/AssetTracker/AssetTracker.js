//REACT
import React from 'react';

//COMPONENTS
import AssetCarousel from './AssetCarousel';
import AssetFormiFrame from './AssetFormiFrame';

const AssetTracker = () => {
    return (
        <div>
            <div style={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
            }}>
                <AssetCarousel />
            </div>
            <div style={{ display: 'block', marginTop: 30 }}>
                <AssetFormiFrame />
            </div>
        </div>
    );
};

export default AssetTracker;
