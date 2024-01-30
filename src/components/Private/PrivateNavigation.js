//REACT
import * as React from 'react';
import {useContext, useState} from "react";
import { NavLink, useParams } from 'react-router-dom';
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

//HOOKS
import {useMicrosoftSignOut} from "../Account/LogOut/LogOutFunc";

function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { tool } = useParams(); // Get the current tool from URL
    const navigate = useNavigate();

    const { userPic } = useContext(AuthContext);
    const accSettings = ["Home", "Account", "Log Out"]

    function setTitle(tool) {
        switch(tool) {
            case 'generate-emails':
                return 'Generate an Email';
            case 'equipment-checkout':
                return 'Equipment Checkout';
            case 'cable-run-optimizer':
                return 'Cable Run Optimizer';
            case 'chat-bot':
                return 'Chat Bot';
            case 'info':
                return 'Information';
            case 'go-tracker':
                return 'GO Tracker';
            case 'overtime-tracker':
                return 'Overtime Tracker';
            case 'account':
                return 'My Account';
            case 'contact':
                return 'Idea Submission';
            case 'sub-automation':
                return 'Subcontractor Form Automation';
            case 'public':
                return 'TCE Innovation Group';
            case 'tech-partners':
                return 'Tech Partners';
            case 'welcome':
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
                                    width: '150px',
                                    marginLeft: '30px',
                                    marginTop: '11px',
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
                        {setTitle(tool)}
                    </Typography>
                    <Box sx={{  display: 'flex', alignItems: 'center', marginTop: '7px', marginRight: '30px'}}>           
                        <IconButton onClick={() => {
                            navigate('/private/welcome');
                        }}>
                            <Tooltip title="Toolbox">
                                <HomeRepairServiceIcon sx={{ color: 'white', fontSize: '55px' }} />
                            </Tooltip>
                        </IconButton>

                        <IconButton onClick={handleOpenUserMenu}>
                            <Tooltip title="User Menu">
                                <Avatar
                                    alt="You"
                                    src={userPic ? userPic : noUser}
                                    imgProps={{ referrerPolicy: "no-referrer" }}
                                    style={{height:"50px", width:"50px"}}
                                />
                            </Tooltip>
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