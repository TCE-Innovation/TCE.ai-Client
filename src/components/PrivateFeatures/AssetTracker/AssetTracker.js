//REACT
import React from 'react';

import style from './assetForm.module.css';

//COMPONENTS
import AssetCarousel from './AssetCarousel';
import AssetForm from './AssetForm';

const AssetTracker = () => {
    return (
        <div style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center',
        }}>
            <div className={style.formDescription}>
                To request any specialty equipment for your project, please submit this form and Rory will reach out ASAP to confirm your request and coordinate handoff. 
            </div>
            
                <AssetCarousel />

            <div style={{ display: 'block' }}>
                <AssetForm />
            </div>
        </div>
    );
};

export default AssetTracker;
