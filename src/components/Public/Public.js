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
import Press from '../PublicFeatures/Press/Press';
import DotNav from '../General/DotNav';

import backgroundImage from '../../img/city.webp'

import PrivateContext from "../Private/PrivateContext";

const mdTheme = createTheme();

function PublicContent() {
  const { setPrivateFunctionality } = useContext(PrivateContext);
  const [showAboutUs, setShowAboutUs] = useState(false);

  
  const sections = ['intro-text', 'about-us','tech-partners', 'contact-us'];
  const [currentSection, setCurrentSection] = useState(sections[0]);

  const handleDotClick = (section) => {
    const sectionElement = document.getElementById(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(section);
  };

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

      const aboutUsSection = document.getElementById('about-us');
      const contactUsSection = document.getElementById('contact-us');
      const techPartnersSection = document.getElementById('tech-partners');

      if (mainContainer.scrollTop >= contactUsSection.offsetTop) {
        setCurrentSection('contact-us');
      } else if (mainContainer.scrollTop >= techPartnersSection.offsetTop) {
        setCurrentSection('tech-partners');
      } else if (mainContainer.scrollTop >= aboutUsSection.offsetTop) {
        setCurrentSection('about-us');
      } else {
        setCurrentSection('intro-text');
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

        <Box id='main-container' component="main" sx={{ flexGrow: 0 }}>
          <div className="App">
            <header className="App-header">
                <PublicNavigation />
            </header>
          </div>

          <Box id="intro-text" sx={{ scrollSnapAlign: 'start' }}>
            <IntroText />
          </Box>
          <Box id="about-us" className={`content ${showAboutUs ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <AboutUs />
          </Box>
          <Box id="tech-partners" className={`content ${showAboutUs ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <Press />
          </Box>
          <Box id="contact-us" className={`content ${showAboutUs ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <ContactUs />
          </Box>
          <DotNav sections={sections} currentSection={currentSection} onDotClick={handleDotClick} />
        </Box>
    </ThemeProvider>
  );
}

export default function Public() {
  return <PublicContent />;
}
