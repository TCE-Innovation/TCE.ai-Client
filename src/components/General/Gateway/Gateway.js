import React from 'react';
import { createTheme, ThemeProvider, Box, Button, GlobalStyles, Typography } from '@mui/material';
import backgroundImage from '../../../img/Public/city.jpg';
import logo from '../../../img/Utils/logo.png';
import { useMicrosoftSignIn } from "../../Account/LoginFunc";
import styles from './gateway.module.css';

const mdTheme = createTheme();

function Gateway() {
  const MicrosoftSignIn = useMicrosoftSignIn();

  return (
    <ThemeProvider theme={mdTheme}>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column', 
          }
        }}
      />
        <Box className={styles.mainContainer}>
            <Box className={styles.textBox}>
                <img src={logo} alt="logo" className={styles.smallLogo} />
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '1.8vw', textAlign:"center" }}>
                    Welcome to the home of the <br/> TC Innovation Group
                </Typography>
            </Box>
            <Box className={styles.buttonBox}>
                <Button
                    fullWidth
                    size="large"
                    onClick={MicrosoftSignIn}
                    sx={{ 
                        color: '#1b365f', 
                        borderColor: '#1b365f', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        fontWeight: 500, 
                        borderRadius: '1vw', 
                        fontSize: '1.3vw',
                        width: '20.5vw', 
                        height: '2.5vw',
                        borderWidth: '.2vw',
                        whiteSpace: 'nowrap',
                        transition: 'ease-intransform 0.2s ease-in-out, border-width 0.2s ease-in-out, font-weight 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
                        '&:hover': { borderWidth: '.3vw', borderColor: '#003eab', backgroundColor: 'rgba(255, 255, 255, 0.9)', transform: 'scale(1.05)' }, 
                    }}
                >
                    Sign in to the private site
                </Button>

                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '1.4vw', textAlign:"center", marginTop: ".3vw", color: 'white' }}>
                    OR
                </Typography>

                <Button
                    fullWidth
                    size="large"
                    onClick={() => {
                        window.location.href = '/public';
                    }}
                    sx={{ 
                        color: '#1b365f', 
                        borderColor: '#1b365f', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        fontWeight: 500, 
                        borderRadius: '1vw', 
                        fontSize: '1.3vw',
                        width: '21.5vw', 
                        height: '2.5vw',
                        borderWidth: '.2vw',
                        whiteSpace: 'nowrap',
                        '&:hover': { borderWidth: '.3vw', borderColor: '#003eab', backgroundColor: 'rgba(255, 255, 255, 0.9)', transform: 'scale(1.05)' }, 
                    }}
                >
                    Continue to the public site
                </Button>
            </Box>
        </Box>

    </ThemeProvider>
  );
}

export default Gateway;
