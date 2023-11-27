//REACT
import React from 'react';

//MUI
import { Container} from '@mui/material';

//COMPONENTS
import Copyright from '../General/Copyright';
import ContactUs from '../PrivateFeatures/ContactUs';
import Welcome from '../PrivateFeatures/Welcome';

const PrivateHome = () => {
    return (
        <Container>
            <Welcome/>
            <ContactUs/>
            <Copyright sx={{ mt: 10, mb: 4 }} />
        </Container>
    );
};

export default PrivateHome;
