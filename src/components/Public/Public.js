//REACT
import * as React from 'react';

//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


//COMPONENTS
import AboutUs from "../PublicFeatures/AboutUs/AboutUs";
import ContactUs from '../PublicFeatures/ContactUs';
import Copyright from '../General/Copyright';

const mdTheme = createTheme();

function PublicContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AboutUs/>
          <ContactUs/>

          <Copyright sx={{ mt: 70, mb: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Public() {
  return <PublicContent />;
}
