//REACT
import * as React from 'react';
import {useContext, useState, useEffect} from "react";
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
import logo from '../../img/logo.png'
import whiteLogo from '../../img/whiteLogo.png'
import noUser from '../../img/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../authentication/Auth";
import { useMsal } from "@azure/msal-react";
import PrivateContext from "../Private/PrivateContext";

//HOOKS
import {useMicrosoftSignOut} from "../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../Account/LoginFunc";

function ResponsiveAppBar() {

    //contexts
    const { setPrivateFunctionality } = useContext(PrivateContext);
    const { userPic } = useContext(AuthContext);

    //states
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentLogo, setCurrentLogo] = useState(logo);
    const [toolBoxColor, setToolBoxColor] = useState({ color: '#1b365f' });
    const [loginColor, setLoginColor] = useState({ backgroundColor: '#1b365f', textColor: 'white' });

    //hooks
    const navigate = useNavigate();
    const { accounts } = useMsal();

    const isAuthenticated = accounts.length > 0;
    const accSettings = ["Home", "Account", "Log Out"]

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
    
            if (scrollPosition > 1000) {
                setCurrentLogo(whiteLogo); 
                setToolBoxColor({color: 'white'});
                setLoginColor({backgroundColor: 'white', textColor: 'black'});
            } else {
                setCurrentLogo(logo); 
                setToolBoxColor({color: '#1b365f'});
                setLoginColor({backgroundColor: '#1b365f', textColor: 'white'});
            }
        };
    
        mainContainer.addEventListener('scroll', handleScroll);
        return () => mainContainer.removeEventListener('scroll', handleScroll);
        
    }, []);
    

    return (
        <>
        <AppBar position="fixed" elevation={0} sx={{background: 'none', height: '90px'}}>
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>       
                        <NavLink to="/">
                            <img
                                src={currentLogo}
                                alt='logo'
                                style={{
                                    width: '180px',
                                    marginLeft: '35px',
                                    marginTop: '25px'
                                }}
                                draggable="false"
                            />
                        </NavLink>
                    </Box>
                    <Box sx={{ display: 'flex', marginTop: '10px', marginLeft: '81%' }}>           
                            {isAuthenticated ? (
                                <>
                                    <IconButton onClick={() => {
                                        navigate('/private');
                                        setPrivateFunctionality('privateHome');
                                    }}>
                                        <HomeRepairServiceIcon sx={{ color: toolBoxColor.color, fontSize: '2.5rem' }} />
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
                                    sx={{ mr: 2, color: loginColor.textColor, borderColor: 'black', backgroundColor: loginColor.backgroundColor, 
                                        '&:hover': { backgroundColor: 'grey', color: 'black' }, fontWeight: 700 
                                    }}
                                >
                                    Log In
                                </Button>
                            )}
              
                        <Menu
                            sx={{ mt: '65px' }}
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
                                    {setting === "Home" && (
                                        <NavLink to="/" style={{color: 'black'}}>
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