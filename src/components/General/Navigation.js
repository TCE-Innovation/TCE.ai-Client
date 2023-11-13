//REACT
import * as React from 'react';
import {useContext, useState} from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

//IMAGES
import logo from '../../img/logo.webp'
import noUser from '../../img/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../authentication/Auth";
import { useMsal } from "@azure/msal-react";
import PrivateContext from "../Private/PrivateContext";

//HOOKS
import {useMicrosoftSignOut} from "../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../Account/LoginFunc";

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { privateFunctionality, setPrivateFunctionality } = useContext(PrivateContext);
    const navigate = useNavigate();

    const { userPic } = useContext(AuthContext);
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;
    const accSettings = ["Public", "Account", "Log Out"]

    function setTitle(privateFunctionality) {
        switch(privateFunctionality) {
            case 'generateEmails':
                return 'Generate an Email';
            case 'assetTracker':
                return 'Equipment Checkout';
            case 'cro':
                return 'Cable Run Optimizer';
            case 'chatbot':
                return 'Chat Bot';
            case 'info':
                return 'Information';
            case 'account':
                return 'My Account';
            case 'public':
                return 'TCE Innovation Group';
            default:
                return 'TCE Innovation Group';  
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
            background: 'linear-gradient(to right, #609CCF, #1B365F)' 
        }}>
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>       
                        <NavLink to="/">
                        <img
                            src={logo}
                            alt='logo'
                            style={{
                                width: '150px',
                                marginLeft: '35px',
                            }}
                            draggable="false"
                        />
                        </NavLink>
                    </Box>
                    <Typography
                        variant="h1"
                        noWrap
                        fontSize="45px"
                        sx={{
                            flexGrow: 1,
                            fontfamily: "Helvetica",
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'white',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >
                        {setTitle(privateFunctionality)}
                    </Typography>
                    <Box sx={{  display: 'flex', alignItems: 'center'}}>           
                            {isAuthenticated ? (
                                <>
                                    <IconButton onClick={() => {
                                        navigate('/private');
                                        setPrivateFunctionality('privateHome');
                                    }}>
                                        <HomeRepairServiceIcon sx={{ color: 'white', fontSize: '2.5rem' }} />
                                    </IconButton>

                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Avatar
                                            style={{
                                                marginRight: '35px',
                                                marginLeft: '10px',
                                            }}
                                            alt="You"
                                            src={userPic ? userPic : noUser}
                                            imgProps={{ referrerPolicy: "no-referrer" }}
                                        />
                                    </IconButton>
                                </>
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

                            {accSettings.map((setting) => (
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