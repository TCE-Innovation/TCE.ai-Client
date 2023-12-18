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
import Tooltip from '@mui/material/Tooltip';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

//IMAGES
import logo from '../../img/Utils/whiteLogo.png'
import noUser from '../../img/Utils/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../authentication/Auth";
import PrivateContext from "./PrivateContext";

//HOOKS
import {useMicrosoftSignOut} from "../Account/LogOut/LogOutFunc";

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { privateFunctionality, setPrivateFunctionality } = useContext(PrivateContext);
    const navigate = useNavigate();

    const { userPic } = useContext(AuthContext);
    const accSettings = ["Home", "Account", "Log Out"]

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
            case 'go':
                return 'GO Tracker';
            case 'overtime':
                return 'Overtime Tracker';
            case 'account':
                return 'My Account';
            case 'contact':
                return 'Idea Submission';
            case 'subAuto':
                return 'Subcontractor Form Automation';
            case 'public':
                return 'TCE Innovation Group';
            case 'tech':
                return 'Tech Partners';
            case 'privateHome':
                return 'Welcome';
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

    return (
        <>
        <AppBar position="fixed" sx={{
            background: '#1b365f', height: '90px'
        }}>
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>       
                        <NavLink to="/">
                            <img
                                src={logo}
                                alt='logo'
                                style={{
                                    width: '180px',
                                    marginLeft: '30px',
                                    marginTop: '4px'
                                }}
                                draggable="false"
                            />
                        </NavLink>
                    </Box>
                    <Typography
                        variant="h1"
                        noWrap
                        fontSize="50px"
                        sx={{
                            marginTop: '10px',
                            flexGrow: 1,
                            fontfamily: "Roboto",
                            fontWeight: 'bold',
                            letterSpacing: '.1rem',
                            color: 'white',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >
                        {setTitle(privateFunctionality)}
                    </Typography>
                    <Box sx={{  display: 'flex', alignItems: 'center', marginTop: '10px'}}>           
                        <IconButton onClick={() => {
                            navigate('/private');
                            setPrivateFunctionality('privateHome');
                        }}>
                        <Tooltip title="Home">
                            <HomeRepairServiceIcon sx={{ color: 'white', fontSize: '2.5rem' }} />
                        </Tooltip>
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