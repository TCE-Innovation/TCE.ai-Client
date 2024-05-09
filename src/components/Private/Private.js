//REACT
import React, { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

//MUI
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {ChevronRight} from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

//COMPONENTS
import Home from '../PrivateFeatures/Home/Home';
import PrivateListItems from "./privateItems";
import CRO from '../PrivateFeatures/CRO/CRO';
import ChatBot from '../PrivateFeatures/ChatBot';
import AssetTracker from '../PrivateFeatures/AssetTracker/AssetTracker';
import GenerateEmails from "../PrivateFeatures/GenerateEmails";
import GOTracker from '../PrivateFeatures/GOTracker';
import PrivateNavigation from "../Private/PrivateNavigation";
import SubAuto from "../PrivateFeatures/SubAuto/SubAuto";
import PBIDashboards from '../PrivateFeatures/PBIDashboards';
import ToolUsage from "../PrivateFeatures/ToolUsage";
import Admin from '../PrivateFeatures/AdminPanel/AdminPanel';

//AUTH
import { adminList } from '../../admin/lists';
import { AuthContext } from '../../authentication/Auth';

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'fixed',
      whiteSpace: 'nowrap',
      marginTop: '90px',
      width: 'auto',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      height: '100vh',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function PrivateContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { tool } = useParams();
  const navigate = useNavigate();
  
  const { userName } = useContext(AuthContext);
  const isAdmin = adminList.includes(userName); 

  // Memorize toolComponentMap to avoid recalculating it on every render
  const toolComponentMap = useMemo(() => ({
    'home': Home,
    'generate-emails': GenerateEmails,
    'cable-run-optimizer': CRO,
    'chat-bot': ChatBot,
    'equipment-checkout': AssetTracker,
    'go-tracker': GOTracker,
    'sub-automation': SubAuto,
    'pbi-dashboards': PBIDashboards, 
    'tool-usage': isAdmin ? ToolUsage : null, // Admin access only
    'admin': isAdmin ? Admin : null // Admin access only
  }), [isAdmin]); // Only recalculate if isAdmin changes
  
  //check if the tool is valid and if user is admin
  useEffect(() => {
    if (!toolComponentMap[tool] || toolComponentMap[tool] === null) {
      navigate("/private/home", { replace: true });
    }
  }, [tool, navigate, toolComponentMap]);

  const handlePublicNavigate = () => {
    navigate('/public');
  };

  const ComponentToRender = toolComponentMap[tool] || Home;

  return (
    <ThemeProvider theme={mdTheme}>     
      <div className="App">
          <header className="App-header">
              <PrivateNavigation />
          </header>
      </div>

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [2],
              }}
            >
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeftIcon /> : <ChevronRight />}
            </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <PrivateListItems tool={tool}/>
            </List>
            <Box sx={{ flexGrow: .75 }} /> 
            <Divider />
            {open ? (
              <Button 
                sx={{ m: 2 }} 
                onClick={handlePublicNavigate}
                style={{color: 'grey'}}
              >
                Go to Public Site
              </Button>
            ) : (
              <IconButton 
                sx={{ mx: 'auto', color: 'action.active', my: 1 }} 
                onClick={handlePublicNavigate}
              >
                <Tooltip title="Go to Public" placement="right">
                  <ExitToAppIcon />
                </Tooltip>
              </IconButton>
            )}
          </Drawer>
        
        <Box component="main" sx={{ marginTop: 5, flexGrow: 1, p: 3, ml: open ? 33 : 9 }}>
            <ComponentToRender />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Private() {
  return <PrivateContent />;
}
