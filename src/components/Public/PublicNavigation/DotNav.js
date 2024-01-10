import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

const DotNav = ({ sections, currentSection, onDotClick }) => {
  return (
    <Box sx={{ position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 1000, display: 'flex', flexDirection: "column", marginRight: "3vw" }}>
      {sections.map((section, index) => (
        <IconButton 
            key={section} 
            onClick={() => onDotClick(section)}
            sx={{
                '&:not(:last-child)': { mb: 1 }
            }}
            >
            <div style={{ 
                width: ".8vw", 
                height: ".8vw", 
                borderRadius: '50%', 
                backgroundColor: currentSection === section ? '#FFCF00' : 'transparent',
                border: currentSection === section ? 'none' : '2px solid white' 
            }} />
        </IconButton>
      ))}
    </Box>
  );
};

export default DotNav;
