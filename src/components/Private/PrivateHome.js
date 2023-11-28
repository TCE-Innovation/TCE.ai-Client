//REACT
import React from 'react';

//MUI
import { Container} from '@mui/material';

//COMPONENTS
import ContactUs from '../PrivateFeatures/ContactUs';
import Welcome from '../PrivateFeatures/Welcome';

const PrivateHome = () => {
    return (
        <Container>
            <Welcome/>
            <ContactUs/>
        </Container>
    );
};

export default PrivateHome;
