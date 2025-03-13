//REACT
import * as React from 'react';
import {useContext, useState} from "react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';

//MUI
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

//IMAGES
import logo from '../../img/Utils/whiteLogo.png'
import noUser from '../../img/Utils/noUser.webp'

//CONTEXTS
import {AuthContext} from "../../authentication/Auth";

//COMPONENTS
import Support from "../PrivateFeatures/Support";
import Account from "../Account/AccountPage/Account";
import IdeaSubmission from "../PrivateFeatures/IdeaSubmission";

function ResponsiveAppBar() {
    const [openDialog, setOpenSupportDialog] = useState(false);
    const [openAccountDialog, setOpenAccountDialog] = useState(false);
    const [openIdeaDialog, setOpenIdeaDialog] = useState(false);
      

    const { tool } = useParams();
    const { userPic } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleOpenSupportDialog = () => setOpenSupportDialog(true);
    const handleCloseSupportDialog = () => setOpenSupportDialog(false);
    const handleOpenAccountDialog = () => setOpenAccountDialog(true);
    const handleCloseAccountDialog = () => setOpenAccountDialog(false);
    const handleOpenIdeaDialog = () => setOpenIdeaDialog(true);
    const handleCloseIdeaDialog = () => setOpenIdeaDialog(false);

    const handleGoToPublic = () => {
        navigate('/public');
    }

    function setTitle(tool) {
        switch(tool) {
            case 'home':
                return 'Home';
            case 'generate-emails':
                return 'Generate an Email';
            case 'chatbot':
                return 'Chatbot - BETA';   
            case 'cable-run-optimizer':
                return 'Cable Run Optimizer';
            case 'go-tracker':
                return 'GO Tracker';
            case 'equipment-checkout':
                return 'Equipment Checkout';
            case 'sub-automation':
                return 'Subcontractor Form Automation';
            case 'tool-usage':
                return 'Tool Usage Statistics';
            case 'schedule-dashboards':
                return 'Schedule Dashboards';
            case '3d-printing-request':
                return '3D Prototyping';
            case 'drone-captures':
                return 'Drone Captures';
            case 'clearance-calculator': 
                return 'LLLE Clearance Calculator'
            case 'training':
                return 'Training'
            case 'admin':
                return 'Admin Panel';
            case 'equip-install-dashboard':
                return 'Equipment Install Tracker Dashboard';
            case 'executive-dashboards':
                return 'Executive Dashboards';
            case 'procore-dashboards':
                return 'Procore Dashboards';
            case 'chatbot-dashboard':
                return 'Chatbot Dashboard';
            default:
                return 'TCE Innovation Group';  
        }
    }

    return (
        <>
        <Dialog open={openDialog} onClose={handleCloseSupportDialog} fullWidth maxWidth="md">
            <DialogContent>
                <Support />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseSupportDialog} style={{color: "#1b365f"}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openAccountDialog} onClose={handleCloseAccountDialog} fullWidth maxWidth="md">
            <DialogContent>
                <Account />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAccountDialog} style={{color: "#1b365f"}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

        <Dialog open={openIdeaDialog} onClose={handleCloseIdeaDialog} fullWidth maxWidth="md">
            <DialogContent>
                <IdeaSubmission />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseIdeaDialog} style={{color: "#1b365f"}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>

        <AppBar position="fixed" sx={{
            background: '#1b365f', 
            height: '90px',
        }}>
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:"center"}}>       
                        <NavLink to="/private/home">
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
                        fontSize="40px"
                        sx={{
                            marginTop: '10px',
                            flexGrow: 1,
                            fontfamily: "Roboto",
                            letterSpacing: '.1rem',
                            color: 'white',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }}
                    >
                        {setTitle(tool)}
                    </Typography>
                    <Box sx={{  display: 'flex', alignItems: 'center', marginTop: '7px', marginRight: '30px'}}>           


                        <IconButton onClick={handleOpenSupportDialog}>
                            <Tooltip title="Need help?">
                                <HelpOutlineIcon sx={{ color: 'white', fontSize: '60px' }} />
                            </Tooltip>
                        </IconButton>

                        <IconButton onClick={handleOpenIdeaDialog}>
                            <Tooltip title="Got an idea?">
                                <LightbulbOutlinedIcon sx={{ color: 'white', fontSize: '60px' }} />
                            </Tooltip>
                        </IconButton>

                        <IconButton onClick={handleGoToPublic}>
                            <Tooltip title="Go to Public Site">
                                <LanguageOutlinedIcon sx={{ color: 'white', fontSize: '60px', marginRight: '.3vw' }} />
                            </Tooltip>
                        </IconButton>

                        <IconButton onClick={handleOpenAccountDialog}>
                            <Tooltip title="Account">
                                <Avatar
                                    alt="You"
                                    src={userPic ? userPic : noUser}
                                    imgProps={{ referrerPolicy: "no-referrer" }}
                                    style={{height:"55px", width:"55px"}}
                                />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Toolbar>
        </AppBar>
        <Toolbar />
        </>    
    );
}

export default ResponsiveAppBar;