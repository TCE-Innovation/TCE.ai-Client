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
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";

//IMAGES
import logo from '../../img/logo.webp'
import noUser from '../../img/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../Authentication/Auth";
import PrivateContext from "../Private/PrivateContext";

//HOOKS
import {useMicrosoftSignOut} from "../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../Account/LoginFunc";


function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { privateFunctionality, setPrivateFunctionality } = useContext(PrivateContext);

    const { isAuthenticated, userPic } = useContext(AuthContext);
    const settings = ["Account", "Dashboard", "Public", "Log Out"]

    function setTitle(privateFunctionality) {
        switch(privateFunctionality) {
            case 'generateEmails':
                return 'Generate an Email';
            case 'assetTracker':
                return 'Equipment Checkout';
            case 'cro':
                return 'Cable Run Optimizer';
            default:
                return 'TCE Innovation Group';  // default text
        }
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const MicrosoftSignOut = useMicrosoftSignOut();
    const MicrosoftSignIn = useMicrosoftSignIn();

    return (
        <>
        <AppBar position="fixed" sx={{
            backgroundImage: 'linear-gradient(to right, lightblue, darkblue)', 
        }}>
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>       
                        <NavLink to="/">
                        <img
                            src={logo}
                            alt='logo'
                            style={{
                                width: '150px',
                                marginLeft: '35px',
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
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            textAlign: 'center',
                        }}
                    >
                        {setTitle(privateFunctionality)}
                    </Typography>
                    <Box sx={{  display: 'flex', alignItems: 'center' }}>           
                            {isAuthenticated ? (
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar
                                        style={{
                                            marginRight: '35px'
                                        }}
                                        alt="You"
                                        src={userPic ? userPic : noUser}
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
                                        <NavLink to="/" style={{color: 'black'}}>
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
        </AppBar>
        <Toolbar />
        </>    
    );
}

export default ResponsiveAppBar;