import React from 'react';
import { createTheme, ThemeProvider, Box, Button, GlobalStyles, Typography } from '@mui/material';
import backgroundImage from '../../../img/Public/tunnelPic.webp';
import logo from '../../../img/Utils/whiteLogo.png';
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
                <Typography variant="h1" component="h1" gutterBottom className={styles.text}>
                    Welcome to the home of <br/> TCE Innovation Tools
                </Typography>
                <img src={logo} alt="TCE Innovation Group Logo" className={styles.smallLogo} />
            <Box className={styles.buttonBox}>
                <Button
                    fullWidth
                    size="large"
                    onClick={MicrosoftSignIn}
                    sx={{ 
                        color: '#1b365f', 
                        borderColor: '#1b365f', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        boxShadow:'0px 0px 20px 0px rgba(0, 0, 0, 0.75)',
                        fontWeight: 500, 
                        borderRadius: '.5vw', 
                        fontSize: '1.3vw',
                        width: '21.5vw', 
                        height: '3vw',
                        borderWidth: '.2vw',
                        whiteSpace: 'nowrap',
                        transition: 'ease-intransform 0.2s ease-in-out, border-width 0.2s ease-in-out, font-weight 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',
                        '&:hover': { borderWidth: '.3vw', borderColor: '#003eab', backgroundColor: 'rgba(255, 255, 255, 0.9)', transform: 'scale(1.05)' }, 
                    }}
                >
                    Employee Sign In
                </Button>

                <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: '1.4vw', textAlign:"center", marginTop: "1vw", color: 'white' }}>
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
                        boxShadow:'0px 0px 20px 0px rgba(0, 0, 0, 0.75)',
                        fontWeight: 500, 
                        borderRadius: '.5vw', 
                        fontSize: '1.3vw',
                        width: '21.5vw', 
                        height: '3vw',
                        borderWidth: '.2vw',
                        whiteSpace: 'nowrap',
                        marginTop: '.5vw',
                        '&:hover': { borderWidth: '.3vw', borderColor: '#003eab', backgroundColor: 'rgba(255, 255, 255, 0.9)', transform: 'scale(1.05)' }, 
                    }}
                >
                    Continue to public site
                </Button>
            </Box>
        </Box>

    </ThemeProvider>
  );
}

export default Gateway;
