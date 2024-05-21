import React, { useContext, useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Box, Toolbar, Tooltip, IconButton, Typography, Menu, MenuItem, 
  ListItemIcon, Avatar, Button
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import logo from '../../../img/Utils/logo.png';
import whiteLogo from '../../../img/Utils/whiteLogo.png';
import noUser from '../../../img/Utils/noUser.webp';

import { AuthContext } from "../../../authentication/Auth";
import { useMsal } from "@azure/msal-react";
import {useMicrosoftSignOut} from "../../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../../Account/LoginFunc";

function ResponsiveAppBar() {
    // Contexts
    const { userPic } = useContext(AuthContext);
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;

    // Hooks for sign in and sign out
    const MicrosoftSignOut = useMicrosoftSignOut();
    const MicrosoftSignIn = useMicrosoftSignIn();
    
    // Memoize login button styles
    const originalLoginColor = useMemo(() => ({
        color: '#1b365f',
        border: '1px solid #1b365f',
        backgroundColor: 'transparent',
        '&:hover': {
            color: 'white',
            backgroundColor: '#1b365f'
        }
    }), []);

    const whiteLoginColor = useMemo(() => ({
        color: 'white',
        border: '1px solid white',
        backgroundColor: 'transparent',
        '&:hover': {
            color: '#1b365f',
            backgroundColor: 'white'
        }
    }), []);

    // States
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentLogo, setCurrentLogo] = useState(logo);
    const [loginColor, setLoginColor] = useState(originalLoginColor);

    const handleLogoClick = () => {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Handle scroll to adjust logo
    useEffect(() => {
        const mainContainer = document.getElementById('main-container');
        const handleScroll = () => {
            const scrollPosition = mainContainer.scrollTop;
            const viewportHeight = window.innerHeight;
    
            //console.log("Scroll position: ", scrollPosition);  // Debug log
    
            if (scrollPosition > viewportHeight) {
                //console.log("Switch to white logo and login color");  // Debug log
                setCurrentLogo(whiteLogo);
                setLoginColor(whiteLoginColor);
            } else {
                //console.log("Switch to original logo and login color");  // Debug log
                setCurrentLogo(logo);
                setLoginColor(originalLoginColor);
            }
        };
    
        mainContainer.addEventListener('scroll', handleScroll);
        return () => mainContainer.removeEventListener('scroll', handleScroll);
    }, [ originalLoginColor, whiteLoginColor]);
    
    

    const accSettings = [
        { label: "Toolbox", icon: <HomeIcon />, link: "/private/welcome" },
        { label: "Log Out", icon: <ExitToAppIcon />, action: () => MicrosoftSignOut() }
    ];

    return (
        <>
            <AppBar position="fixed" elevation={0} sx={{ background: 'none', height: '3rem' }}>
                <Toolbar sx={{ width: '100%' }} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>       
                        <div onClick={handleLogoClick}>
                            <img src={currentLogo} alt='logo' style={{ width: "10rem", marginLeft: "2em", marginTop: "3em" }} draggable="false" />
                        </div>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginTop: '3em',
                        marginRight: '2em',
                        width: '100%',
                    }}>
                        {isAuthenticated ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>    
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Tooltip title="User Menu">
                                        <Avatar alt="You" src={userPic || noUser} style={{ width: '2.5em', height: '2.5em' }} />
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        ) : (
                            <Button onClick={MicrosoftSignIn} sx={ loginColor }>
                                Sign In
                            </Button>
                        )}
                        <Menu
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            sx={{
                                '& .MuiPaper-root': {
                                    transform: 'translateX(-30px) !important', 
                                }
                            }}
                        >
                            {accSettings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                                    <ListItemIcon>{setting.icon}</ListItemIcon>
                                    {setting.link ? (
                                        <NavLink to={setting.link} style={{ color: '#1b365f', textDecoration: 'none' }}>
                                            <Typography textAlign="center">{setting.label}</Typography>
                                        </NavLink>
                                    ) : (
                                        <Typography textAlign="center" style={{ color: '#1b365f' }} onClick={setting.action}>
                                            {setting.label}
                                        </Typography>
                                    )}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}

export default ResponsiveAppBar;
