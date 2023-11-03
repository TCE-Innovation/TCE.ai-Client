//REACT
import * as React from 'react';
import { useContext, useEffect } from "react";

//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


//COMPONENTS
import AboutUs from "../PublicFeatures/AboutUs";
import TechPartners from "../PublicFeatures/TechPartners";
import ContactUs from '../PublicFeatures/ContactUs';
import Press from '../PublicFeatures/Press';
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
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AboutUs/>
          <TechPartners/>
          <Press/>
          <ContactUs/>
          <Copyright sx={{ mt: 20, mb: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Public() {
  return <PublicContent />;
}
