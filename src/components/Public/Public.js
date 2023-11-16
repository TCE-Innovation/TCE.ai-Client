//REACT
import * as React from 'react';
import { useContext, useEffect } from "react";

//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


//COMPONENTS
import Image from "../PublicFeatures/Image";
import AboutUs from "../PublicFeatures/AboutUs";
import TechPartners from "../PublicFeatures/TechPartners";
import ContactUs from '../PublicFeatures/ContactUs';
import Copyright from '../General/Copyright';

import PrivateContext from "../Private/PrivateContext";

const mdTheme = createTheme();

function PublicContent() {
  const { setPrivateFunctionality } = useContext(PrivateContext);

  useEffect(() => {
    setPrivateFunctionality('public');
  }, [setPrivateFunctionality]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box component="main" className="main-scroll-container" sx={{ 
          flexGrow: 1, 
          height: '100vh', // Make sure the container has a height
        }}>
          <Box sx={{ scrollSnapAlign: 'start' }}>
            <Image/>
          </Box>
          <Box sx={{ scrollSnapAlign: 'start' }}>
            <AboutUs/>
          </Box>
          <Box sx={{ scrollSnapAlign: 'start' }}>
            <TechPartners/>
          </Box>
          <Box sx={{ scrollSnapAlign: 'start' }}>
            <ContactUs/>
          </Box>
          <Copyright sx={{ mt: 20, mb: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Public() {
  return <PublicContent />;
}
