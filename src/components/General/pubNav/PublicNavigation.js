import styles from "./pubNav.module.css"

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
import logo from '../../../img/Utils/logo.png'
import whiteLogo from '../../../img/Utils/whiteLogo.png'
import noUser from '../../../img/Utils/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../../authentication/Auth";
import { useMsal } from "@azure/msal-react";
import PrivateContext from "../../Private/PrivateContext";

//HOOKS
import {useMicrosoftSignOut} from "../../Account/LogOut/LogOutFunc";
import {useMicrosoftSignIn} from "../../Account/LoginFunc";

function ResponsiveAppBar() {

    //contexts
    const { setPrivateFunctionality } = useContext(PrivateContext);
    const { userPic } = useContext(AuthContext);

    //states
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentLogo, setCurrentLogo] = useState(logo);
    const [toolBoxColor, setToolBoxColor] = useState({ color: '#1b365f' });
    const [loginColor, setLoginColor] = useState({ textColor: 'white', borderColor: 'white', backgroundColor: 'none' });

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
            const viewportHeight = window.innerHeight;
    
            if (scrollPosition > viewportHeight) { 
                setCurrentLogo(whiteLogo); 
                setToolBoxColor({color: 'white'});
                setLoginColor({ textColor: 'white', borderColor: 'white'});
            } else {
                setCurrentLogo(logo); 
                setToolBoxColor({color: '#1b365f'});
                setLoginColor({ textColor: '#1b365f'});
            }
        };
    
        mainContainer.addEventListener('scroll', handleScroll);
        return () => mainContainer.removeEventListener('scroll', handleScroll);
    
    }, []);
    
    return (
        <>
        <AppBar position="fixed" elevation={0} sx={{background: 'none', height: '90px'}}>
                <Toolbar sx={{width:'100%'}} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>       
                        <NavLink to="/">
                            <img
                                src={currentLogo}
                                alt='logo'
                                className={styles.logo}
                                draggable="false"
                            />
                        </NavLink>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexGrow: 1,
                        justifyContent: 'flex-end',
                        marginTop: '35px',
                        marginLeft: '55vw',
                        marginRight: '3%', // Responsive right margin
                    }}>           
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
                                    sx={{ color: loginColor.textColor, borderColor: loginColor.borderColor, backgroundColor: loginColor.backgroundColor, 
                                        '&:hover': { borderWidth: '3px', fontWeight: 700 }, fontWeight: 500, borderRadius: '50px', width: '120px', borderWidth: '2px'
                                    }}
                                >
                                    Login
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