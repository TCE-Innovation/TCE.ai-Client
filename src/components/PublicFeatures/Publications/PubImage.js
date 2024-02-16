import React from 'react';

import subway from '../../../img/Public/pubImage.png';

const PubImage = () => {
    return (
        <img src={subway} alt="subwayTunnel" 
            style={{ 
                width: '18.5vw', 
                height: 'auto', 
                objectFit: 'cover', 
                objectPosition: 'center',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',    
                cursor: 'default'           
        }} />
    );
};

export default PubImage;
