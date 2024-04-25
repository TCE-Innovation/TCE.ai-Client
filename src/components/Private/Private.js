//REACT
import * as React from 'react';
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
import DataDashboard from "../PrivateFeatures/DataDashboard";

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

const validTools = [
  'generate-emails',
  'cable-run-optimizer',
  'chat-bot',
  'equipment-checkout',
  'go-tracker',
  'sub-automation',
  'data-dashboard',
  'home',
  // Add other valid tool routes here
];

function PrivateContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { tool } = useParams();
  const navigate = useNavigate();

  //check if the tool is valid
  React.useEffect(() => {
    if (tool && !validTools.includes(tool)) {
      navigate("/private/home", { replace: true });
    }
  }, [tool, navigate]);

  // Determine which component to render based on the URL
  let ComponentToRender;
  switch (tool) {
      case 'home':
        ComponentToRender = Home;
        break;
      case 'generate-emails':
          ComponentToRender = GenerateEmails;
          break;

      case 'cable-run-optimizer':
          ComponentToRender = CRO;
          break;

      case 'chat-bot':
          ComponentToRender = ChatBot;
          break;

      case 'equipment-checkout': 
          ComponentToRender = AssetTracker;
          break;

      case 'go-tracker':
          ComponentToRender = GOTracker;
          break;  

      case 'sub-automation':
          ComponentToRender = SubAuto;
          break;

      case 'data-dashboard':
        ComponentToRender = DataDashboard;
        break;
  

      default:
          ComponentToRender = Home;
  }

  const handlePublicNavigate = () => {
    navigate('/public');
  };

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
              <PrivateListItems />
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
        
        <Box component="main" sx={{ marginTop: 5, flexGrow: 1, p: 3, ml: open ? 39 : 9 }}>
            <ComponentToRender />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Private() {
  return <PrivateContent />;
}
