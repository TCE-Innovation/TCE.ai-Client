//REACT
import * as React from 'react';
import {useContext, useState} from "react";
import { NavLink } from 'react-router-dom';

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Button from "@mui/material/Button";

//IMAGES
import logo from '../../img/logo.webp'
import noUser from '../../img/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../authentication/Auth";
import PrivateContext from "../Private/PrivateContext";
import PublicContext from "../Public/PublicContext";

//HOOKS
import {useMicrosoftSignOut} from "../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../Account/LoginFunc";

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { setPrivateFunctionality } = useContext(PrivateContext);
    const { setPublicFunctionality } = useContext(PublicContext);

    const { isAuthenticated } = useContext(AuthContext);
    const settings = ["Account", "Dashboard", "Public", "Log Out"]


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const MicrosoftSignOut = useMicrosoftSignOut();
    const MicrosoftSignIn = useMicrosoftSignIn();

    return (
        <AppBar position="static" sx={{
            backgroundImage: 'linear-gradient(to right, lightblue, darkblue)', 
          }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, width: '150px', height: '150px', display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <NavLink to="/">
                        <img
                            src={logo}
                            alt='logo'
                            style={{
                            width: '250px', 
                            height: '150px', 
                            padding: '20px',
                            }}
                            draggable="false"
                            onClick={() => setPrivateFunctionality('privateHome')}
                        />
                        </NavLink>
                    </Box>
                    <Typography
                        variant="h1"
                        noWrap
                        fontSize="45px"
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            ml: 2,
                            paddingLeft: '150px'
                        }}
                    >
                        TCE Innovation
                    </Typography>
                    <NavLink to='/' style={{color: 'inherit'}} onClick={() => setPrivateFunctionality('privateHome')}>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </NavLink>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => setPrivateFunctionality('privateHome')}
                    >
                        TCE Innovation
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>

                            {isAuthenticated ? (
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                alt="You"
                                src={noUser}
                                imgProps={{ referrerPolicy: "no-referrer" }}
                                />
                            </IconButton>
                            ) : (
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    onClick={MicrosoftSignIn}
                                    sx={{ mr: 2, color: 'black', borderColor: 'black', backgroundColor: 'white', 
                                        '&:hover': { backgroundColor: 'grey', color: 'black' }, fontWeight: 700 
                                    }}
                                >
                                    Log In
                                </Button>
                            )}
              
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    {setting === "Public" && (
                                        <NavLink to="/" style={{color: 'black'}} onClick={() => setPublicFunctionality('publicHome')}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Account" && (
                                        <NavLink to="/account" style={{color: 'black'}}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Dashboard" && (
                                        <NavLink to="/private" style={{color: 'black'}} onClick={() => setPrivateFunctionality('privateHome')} >
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Log Out" && (
                                        <NavLink to="/" style={{color: 'black'}} onClick={MicrosoftSignOut} >
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;