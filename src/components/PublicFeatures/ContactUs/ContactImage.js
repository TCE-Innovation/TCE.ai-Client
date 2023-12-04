import React from 'react';

import logo from '../../../img/whiteLogo.png';

const ContactImage = () => {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center'}}>
            <img src={logo} alt="Contact Us" style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'center' }} />
        </div>
    );
};

export default ContactImage;


