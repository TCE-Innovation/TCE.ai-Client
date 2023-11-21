//REACT
import * as React from 'react';
import { useContext, useEffect, useState } from "react";

//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { GlobalStyles } from '@mui/material';


//COMPONENTS
import IntroText from "../PublicFeatures/IntroText";
import AboutUs from "../PublicFeatures/AboutUs";
import TechPartners from "../PublicFeatures/TechPartners";
import ContactUs from '../PublicFeatures/ContactUs';
import Copyright from '../General/Copyright';

import backgroundImage from '../../img/tunnelImage.jpg'

import PrivateContext from "../Private/PrivateContext";

const mdTheme = createTheme();

function PublicContent() {
  const { setPrivateFunctionality } = useContext(PrivateContext);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showTechPartners, setShowTechPartners] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);

  useEffect(() => {
    setPrivateFunctionality('public');
  }, [setPrivateFunctionality]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY > windowHeight * 0.3) { 
        setShowAboutUs(true);
      }
      if (scrollY > windowHeight * 0.7) {
        setShowTechPartners(true);
      }
      if (scrollY > windowHeight * 0.9) {
        setShowContactUs(true);
      }

      if (scrollY === 0) {
        setShowAboutUs(false);
        setShowTechPartners(false);
        setShowContactUs(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <ThemeProvider theme={mdTheme}>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          },
        }}
      />
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box id="intro-text">
            <IntroText />
          </Box>
          <Box className={`content ${showAboutUs ? 'fade-in' : ''}`} sx={{ mb: 5 }}>
            <AboutUs />
          </Box>
          <Box className={`content ${showTechPartners ? 'fade-in' : ''}`} sx={{ mb: 5 }}>
            <TechPartners />
          </Box>
          <Box className={`content ${showContactUs ? 'fade-in' : ''}`} sx={{ mb: 5 }}>
            <ContactUs />
          </Box>
          <Box>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Public() {
  return <PublicContent />;
}
