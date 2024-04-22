//REACT
import * as React from 'react';
import {useContext, useState, useEffect} from "react";
import { NavLink } from 'react-router-dom';

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";

//IMAGES
import logo from '../../../img/Utils/logo.png'
import whiteLogo from '../../../img/Utils/whiteLogo.png'
import noUser from '../../../img/Utils/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../../authentication/Auth";
import { useMsal } from "@azure/msal-react";

//HOOKS
import {useMicrosoftSignOut} from "../../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../../Account/LoginFunc";

function ResponsiveAppBar() {

    //contexts
    const { userPic } = useContext(AuthContext);

    //states
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentLogo, setCurrentLogo] = useState(logo);
    const [loginColor, setLoginColor] = useState({ textColor: 'white', borderColor: 'white', backgroundColor: 'none' });

    const handleLogoClick = () => {
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.scrollTo({
                top: 0,
                behavior: 'smooth'  // Adds smooth scrolling animation
            });
        }
    };    

    const { accounts } = useMsal();

    const isAuthenticated = accounts.length > 0;
    const accSettings = ["Toolbox", "Account", "Log Out"]

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const MicrosoftSignOut = useMicrosoftSignOut();
    const MicrosoftSignIn = useMicrosoftSignIn();

    //useEffect to change the logo and toolbox colors after scroll
    useEffect(() => {
        const mainContainer = document.getElementById('main-container');
    
        const handleScroll = () => {
            const scrollPosition = mainContainer.scrollTop;
            const viewportHeight = window.innerHeight;
            
            //second page (where it turns white)
            if (scrollPosition > viewportHeight) { 
                setCurrentLogo(whiteLogo); 
                setLoginColor({ textColor: 'white', borderColor: 'white'});
            } 
            //first page (where it turns blue)
            else {
                setCurrentLogo(logo); 
                setLoginColor({ textColor: '#1b365f'});
            }
        };
    
        mainContainer.addEventListener('scroll', handleScroll);
        return () => mainContainer.removeEventListener('scroll', handleScroll);
    
    }, []);
    
    return (
        <>
            <AppBar position="fixed" elevation={0} sx={{ background: 'none', height: '3rem' }}>
                <Toolbar sx={{ width: '100%' }} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>       
                        <div onClick={handleLogoClick}>
                                <img
                                    src={currentLogo}
                                    alt='logo'
                                    style={{
                                        width: "10rem", 
                                        marginLeft: "2em",
                                        marginTop: "3em",
                                    }}
                                    draggable="false"
                                />
                            </div>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'right',
                        marginTop: '3em',
                        marginRight: '2em',
                        width: '100%'
                    }}>           
                            {isAuthenticated ? (
                                <Box sx={{ display: 'flex', alignItems: 'center'}}>    
                                    <IconButton onClick={handleOpenUserMenu}>
                                        <Tooltip title="User Menu">
                                            <Avatar
                                                alt="You"
                                                src={userPic ? userPic : noUser}
                                                imgProps={{ referrerPolicy: "no-referrer" }}
                                                style={{ width: '2.5em', height: '2.5em' }}
                                            />
                                        </Tooltip>
                                    </IconButton>
                                </Box>
                            ) : (
                                <Box sx={{display: "flex", flexDirection: "row"}}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        onClick={MicrosoftSignIn}
                                        sx={{ 
                                            color: loginColor.textColor, 
                                            borderColor: loginColor.borderColor, 
                                            backgroundColor: loginColor.backgroundColor, 
                                            fontWeight: 500, 
                                            borderRadius: '1em', 
                                            width: '12em', 
                                            height: '2em',
                                            borderWidth: '0.1em',
                                            whiteSpace: 'nowrap',
                                            '&:hover': { borderWidth: '0.1em', fontWeight: 700, color: '#003eab', borderColor: '#003eab' }, 
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            )}             
                        <Menu
                            sx={{ mt: '5rem' }}
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
                                    {setting === "Toolbox" && (
                                        <NavLink to="/private/welcome" style={{color: 'black'}}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Account" && (
                                        <NavLink to="/account" style={{color: 'black'}}>
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