//REACT
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Button from "@mui/material/Button";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

//IMAGES
import whiteLogo from '../../../img/Utils/whiteLogo.png';
import noUser from '../../../img/Utils/noUser.webp';

//CONTEXTS
import { AuthContext } from "../../../authentication/Auth";
import { useMsal } from "@azure/msal-react";
import PrivateContext from "../../Private/PrivateContext";

//HOOKS
import { useMicrosoftSignOut } from "../../Account/LogOut/LogOutFunc";
import { useMicrosoftSignIn } from "../../Account/LoginFunc";

function StaticAppBar() {

    //contexts
    const { setPrivateFunctionality } = useContext(PrivateContext);
    const { userPic } = useContext(AuthContext);

    //states
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    //hooks
    const navigate = useNavigate();
    const { accounts } = useMsal();

    const isAuthenticated = accounts.length > 0;
    const accSettings = ["Home", "Account", "Log Out"];

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
            <AppBar position="fixed" elevation={0} sx={{ background: 'none', height: '2vw' }}>
                <Toolbar sx={{ width: '100%' }} disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>       
                        <NavLink to="/">
                            <img
                                src={whiteLogo}
                                alt='logo'
                                style={{ width: "10vw", marginLeft: "2vw", marginTop: "2.5vw" }}
                                draggable="false"
                            />
                        </NavLink>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'right',
                        marginTop: '1.5vw',
                        marginRight: '3vw',
                        width: '100%'
                    }}>
                        {isAuthenticated ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '1vw' }}>
                                <IconButton onClick={() => {
                                    navigate('/private');
                                    setPrivateFunctionality('privateHome');
                                }}>
                                    <Tooltip title="Toolbox">
                                        <HomeRepairServiceIcon sx={{ color: 'white', fontSize: '3.5vw' }} />
                                    </Tooltip>
                                </IconButton>

                                <IconButton onClick={handleOpenUserMenu}>
                                    <Tooltip title="User Menu">
                                        <Avatar
                                            alt="You"
                                            src={userPic ? userPic : noUser}
                                            imgProps={{ referrerPolicy: "no-referrer" }}
                                            style={{ width: '3vw', height: '3vw' }}
                                        />
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    onClick={MicrosoftSignIn}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'white',
                                        backgroundColor: 'none',
                                        fontWeight: 500,
                                        borderRadius: '2vw',
                                        width: '8vw',
                                        height: '2.5vw',
                                        borderWidth: '.2vw',
                                        '&:hover': { borderWidth: '.3vw', fontWeight: 700, color: '#003eab', borderColor: '#003eab' },
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        )}
                        <Menu
                            sx={{ mt: '4.5vw' }}
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
                                        <NavLink to="/" style={{ color: 'black' }}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Account" && (
                                        <NavLink to="/account" style={{ color: 'black' }}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </NavLink>
                                    )}
                                    {setting === "Log Out" && (
                                        <NavLink to="/" style={{ color: 'black' }} onClick={MicrosoftSignOut}>
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

export default StaticAppBar;
