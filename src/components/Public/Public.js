//REACT
import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

//MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { GlobalStyles } from '@mui/material';

//COMPONENTS
import PublicNavigation from "../Public/PublicNavigation/PublicNavigation";
import IntroText from "../PublicFeatures/IntroText";
import AboutUs from "../PublicFeatures/AboutUs/AboutUs";
import ContactUs from '../PublicFeatures/ContactUs/ContactUs';
import Press from '../PublicFeatures/Press/Press';
import Publications from '../PublicFeatures/Publications/Publications';
import DotNav from './PublicNavigation/DotNav';

import backgroundImage from '../../img/Public/city.webp'

const mdTheme = createTheme();

function PublicContent() {
  const [showContent, setShowContent] = useState(true);

  const sections = ['intro-text', 'about-us','tech-partners', 'whitepapers', 'contact-us']; //'whitepapers',
  const [currentSection, setCurrentSection] = useState(sections[0]);

  const handleDotClick = (section) => {
    const sectionElement = document.getElementById(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(section);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const state = window.history.state;
    const fromWhitePaper = state?.usr?.fromWhitePaper;
    const scrollToSection = state?.usr?.scrollTo;

    if (fromWhitePaper && scrollToSection) {
      const sectionElement = document.getElementById(scrollToSection);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });

        // Clear the state after scrolling
        navigate(window.location.pathname, { replace: true, state: {} });
      }
    }
  }, [navigate]);
  

  useEffect(() => {
    const mainContainer = document.getElementById('main-container');

    const handleScroll = () => {
      const scrollPosition = mainContainer.scrollTop; 
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight * 0.3) { 
        setShowContent(true);
      } else {
        setShowContent(false);
      }

      const aboutUsSection = document.getElementById('about-us');
      const contactUsSection = document.getElementById('contact-us');
      const techPartnersSection = document.getElementById('tech-partners');
      const whitepapersSection = document.getElementById('whitepapers');

      if (mainContainer.scrollTop >= contactUsSection.offsetTop) {
        setCurrentSection('contact-us');
      } else if (mainContainer.scrollTop >= whitepapersSection.offsetTop) {
        setCurrentSection('whitepapers');
      } 
      else if (mainContainer.scrollTop >= techPartnersSection.offsetTop) {
        setCurrentSection('tech-partners');
      } else if (mainContainer.scrollTop >= aboutUsSection.offsetTop) {
        setCurrentSection('about-us');
      } else {
        setCurrentSection('intro-text');
      }
    };

    mainContainer.addEventListener('scroll', handleScroll);
    return () => mainContainer.removeEventListener('scroll', handleScroll);
  }, [currentSection]); 
  
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
          <Box id="about-us" className={`content ${showContent ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <AboutUs />
          </Box>
          <Box id="tech-partners" className={`content ${showContent ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <Press />
          </Box>
          <Box id="whitepapers" className={`content ${showContent ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
            <Publications />
          </Box>
          <Box id="contact-us" className={`content ${showContent ? 'fade-in' : ''}`} sx={{ scrollSnapAlign: 'start' }}>
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
