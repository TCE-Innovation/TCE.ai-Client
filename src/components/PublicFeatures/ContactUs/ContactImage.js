import React from 'react';

import subway from '../../../img/Public/subway.png';

const ContactImage = () => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center' }}>
            <img src={subway} alt="Contact Us" 
                style={{ 
                    width: '85%', 
                    height: 'auto', 
                    objectFit: 'cover', 
                    objectPosition: 'center',
                    borderRadius: '10px',
                    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                    margin: 'auto',
            }} />
        </div>
    );
};

export default ContactImage;


