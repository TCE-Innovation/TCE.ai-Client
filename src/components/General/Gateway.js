import React from 'react';
import { createTheme, ThemeProvider, Box, Button, GlobalStyles, Typography } from '@mui/material';
import backgroundImage from '../../img/Public/city.jpg';
import logo from '../../img/Utils/logo.png';
import { useMicrosoftSignIn } from "../Account/LoginFunc"; 
import styles from '../Account/signIn.module.css';

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
                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '1.4vw', textAlign:"center" }}>
                    Welcome to tcig.nyc
                </Typography>

                <Button
                    fullWidth
                    size="large"
                    onClick={MicrosoftSignIn}
                    sx={{ 
                        color: '#1b365f', 
                        borderColor: '#1b365f', 
                        backgroundColor: 'none', 
                        fontWeight: 500, 
                        borderRadius: '2vw', 
                        fontSize: '1.3vw',
                        width: '8.5vw', 
                        height: '2.5vw',
                        borderWidth: '.2vw',
                        whiteSpace: 'nowrap',
                        marginTop: '1.5vw',
                        '&:hover': { borderWidth: '.3vw', fontWeight: 700, color: '#003eab', borderColor: '#003eab' }, 
                    }}
                >
                    Sign in to the private site
                </Button>

                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '1.4vw', textAlign:"center", marginTop: ".3vw" }}>
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
                        backgroundColor: 'none', 
                        fontWeight: 500, 
                        borderRadius: '2vw', 
                        fontSize: '1.3vw',
                        width: '8.5vw', 
                        height: '2.5vw',
                        borderWidth: '.2vw',
                        whiteSpace: 'nowrap',
                        marginTop: '.0vw',
                        '&:hover': { borderWidth: '.3vw', fontWeight: 700, color: '#003eab', borderColor: '#003eab' }, 
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
