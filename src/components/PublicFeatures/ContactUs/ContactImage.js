import React from 'react';

import subway from '../../../img/Public/subway.png';

const ContactImage = () => {
    return (
        <img src={subway} alt="Contact Us" 
            style={{ 
                width: '30vw', 
                height: 'auto', 
                objectFit: 'cover', 
                objectPosition: 'center',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                marginBottom: '2.5vw'
                
        }} />
    );
};

export default ContactImage;


