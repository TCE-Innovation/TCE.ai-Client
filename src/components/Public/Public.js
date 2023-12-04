//REACT
import * as React from 'react';
import { useContext, useEffect, useState } from "react";

//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { GlobalStyles } from '@mui/material';


//COMPONENTS
import PublicNavigation from "../General/PublicNavigation";
import IntroText from "../PublicFeatures/IntroText";
import AboutUs from "../PublicFeatures/AboutUs";
import ContactUs from '../PublicFeatures/ContactUs/ContactUs';

import backgroundImage from '../../img/city.webp'

import PrivateContext from "../Private/PrivateContext";

const mdTheme = createTheme();

function PublicContent() {
  const { setPrivateFunctionality } = useContext(PrivateContext);
  const [showAboutUs, setShowAboutUs] = useState(false);

  useEffect(() => {
    setPrivateFunctionality('public');
  }, [setPrivateFunctionality]);

  useEffect(() => {
    const mainContainer = document.getElementById('main-container');

    const handleScroll = () => {
      const scrollPosition = mainContainer.scrollTop; 
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 0.3) { 
        setShowAboutUs(true);
      } else {
        setShowAboutUs(false);
      }
    };
  
    mainContainer.addEventListener('scroll', handleScroll);
    return () => mainContainer.removeEventListener('scroll', handleScroll);
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
          '#main-container': {
            scrollSnapType: 'y mandatory', 
            height: '100vh', 
            overflowY: 'auto',
          }
        }}
      />

        <Box id='main-container' component="main" sx={{ flexGrow: 1 }}>
          <div className="App">
            <header className="App-header">
                <PublicNavigation />
            </header>
          </div>

          <Box id="intro-text"  sx={{ scrollSnapAlign: 'start' }}>
            <IntroText />
          </Box>

          <Box className={`content ${showAboutUs ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <AboutUs />
          </Box>
          <Box className={`content ${showAboutUs ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <ContactUs />
          </Box>
        </Box>
    </ThemeProvider>
  );
}

export default function Public() {
  return <PublicContent />;
}
