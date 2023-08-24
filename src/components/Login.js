import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {MicrosoftSignIn} from "../firebase/FirebaseFunctions";
import {useContext} from "react";
import {AuthContext} from "../firebase/Auth";
import {Navigate} from "react-router-dom";
import { TiVendorMicrosoft } from 'react-icons/ti';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                TCE.ai
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to='/' />
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>                   
                    <br />
                    <Grid container justifyContent="center">
                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            startIcon={<TiVendorMicrosoft style={{ color: '#F25022'}} />}
                            onClick={() => MicrosoftSignIn()}
                        >
                            Log In with Microsoft
                        </Button>              
                    </Grid>
                </Box>
                <Copyright sx={{ mt: 70, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}