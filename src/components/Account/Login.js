import React from 'react';
import { createTheme, ThemeProvider, Box, Button, GlobalStyles, Typography } from '@mui/material';
import backgroundImage from '../../img/Public/city.webp';
import logo from '../../img/Utils/logo.png';
import { useMicrosoftSignIn } from "../Account/LoginFunc"; 

import styles from './login.module.css';

const mdTheme = createTheme();

function Login() {
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
        <img src={logo} alt="logo" className={styles.logo} />
        <Box className={styles.mainContainer}>
            <Box className={styles.textBox}>
                <Typography variant="h4" component="h1" gutterBottom sx={{marginBottom: '3vw', fontSize: '2vw'}}>
                    Please log in to continue
                </Typography>
                <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    onClick={MicrosoftSignIn}
                    sx={{ 
                        color: '#1b365f', 
                        borderColor: '#1b365f', 
                        backgroundColor: 'none', 
                        fontWeight: 500, 
                        borderRadius: '2vw', 
                        fontSize: '1.5vw',
                        width: '8vw', 
                        height: '2.5vw',
                        borderWidth: '.2vw',
                        '&:hover': { borderWidth: '.3vw', fontWeight: 700, color: '#003eab', borderColor: '#003eab' }, 
                    }}
                >
                    Login
                </Button>
            </Box>
        </Box>

    </ThemeProvider>
  );
}

export default Login;
