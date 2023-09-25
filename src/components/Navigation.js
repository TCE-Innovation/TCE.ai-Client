import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from '../img/logo.webp'
import {useContext, useState} from "react";
import {AuthContext} from "../AzureAuth/Auth";
import { NavLink } from 'react-router-dom';
import noUser from '../img/noUser.webp'
import DashboardContext from "./Dashboard/DashboardContext";

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { setSelectedFunctionality } = useContext(DashboardContext);

    const { isAuthenticated } = useContext(AuthContext);
    const settings = isAuthenticated
        ? ["Account", "Dashboard"]
        : ["Login", "Signup"];


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{
            backgroundImage: 'linear-gradient(to right, lightblue, darkblue)', // Adjust the colors as needed
          }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 0, width: '150px', height: '150px', display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <NavLink to="/">
                        <img
                            src={logo}
                            alt='logo'
                            style={{
                            width: '250px', // Adjust the width as needed
                            height: '150px', // Adjust the height as needed
                            padding: '0',
                            margin: '0', // To remove any default margins
                            marginLeft: '0px',
                            }}
                            draggable="false"
                            onClick={() => setSelectedFunctionality('home')}
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
                    <NavLink to='/' style={{color: 'inherit'}} onClick={() => setSelectedFunctionality('home')}>
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
                        onClick={() => setSelectedFunctionality('home')}
                    >
                        TCE Innovation
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open navigation menu">
                            {isAuthenticated ? (
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="You"
                                            src={ noUser}
                                            imgProps={{ referrerPolicy: "no-referrer" }}
                                    />
                                </IconButton>
                            ) : (
                                <IconButton onClick={handleOpenUserMenu}
                                            size="large"
                                            edge="start"
                                            color="inherit"
                                            aria-label="menu"
                                            sx={{ mr: 2, p: 0 }}
                                >
                                    <MenuIcon sx={{fontSize: '2.5rem'}} />
                                </IconButton>
                            )}

                        </Tooltip>
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
                                    {setting === "Logout" && (
                                        <NavLink to="/logout" style={{color: 'black'}}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Account" && (
                                        <NavLink to="/account" style={{color: 'black'}}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Dashboard" && (
                                        <NavLink to="/" style={{color: 'black'}} onClick={() => setSelectedFunctionality('home')} >
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