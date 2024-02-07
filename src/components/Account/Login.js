import React from 'react';
import { createTheme, ThemeProvider, Box, Button, GlobalStyles, Typography } from '@mui/material';
import backgroundImage from '../../img/Public/city.webp';
import logo from '../../img/Utils/logo.png';
import { useMicrosoftSignIn } from "../Account/LoginFunc"; 

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
        <img src={logo} alt="logo" style={{height: "5vw", width: "11vw", marginLeft: "2vw", marginTop: "1vw"}} />
        <Box
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    height: '15vw',
                    width: '30vw',
                    padding: '2vw',
                    borderRadius: '30px',
                    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
                    marginTop: '25vh',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom sx={{marginBottom: "5vw"}}>
                    Please login to continue
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
