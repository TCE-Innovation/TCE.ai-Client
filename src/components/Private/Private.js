//REACT
import * as React from 'react';
import {useContext, useEffect} from "react";

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

//COMPONENTS
import PrivateContext from "./PrivateContext";
import PrivateHome from "./PrivateHome";
import PrivateListItems from "./privateItems";
import CRO from '../PrivateFeatures/CRO';
import ChatBot from '../PrivateFeatures/ChatBot';
import AssetTracker from '../PrivateFeatures/AssetTracker/AssetTracker';
import GenerateEmails from "../PrivateFeatures/GenerateEmails";
import TechPartners from '../PrivateFeatures/TechPartners';
import GOTracker from '../PrivateFeatures/GOTracker';
import OTTracker from '../PrivateFeatures/OTTracker';

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
  const { privateFunctionality, setPrivateFunctionality} = useContext(PrivateContext);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    console.log(privateFunctionality);
  }, [privateFunctionality])

  const handleFunctionalitySelect = (functionality) => {
    setPrivateFunctionality(functionality);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <Tooltip title="Expand/Collapse">
                <IconButton onClick={toggleDrawer}>
                  {open ? <ChevronLeftIcon /> : <ChevronRight />}
                </IconButton>
              </Tooltip>
            </Toolbar>
            <Divider />
            <List component="nav">
              <PrivateListItems onSelect={handleFunctionalitySelect} />
              {/*<Divider sx={{ my: 1 }} />*/}
            </List>
          </Drawer>
        
        <Box component="main" sx={{ marginTop: 5, flexGrow: 1, p: 3, ml: open ? 30 : 9, width: '100%' }}>
          {privateFunctionality === 'tech' && <TechPartners />}
          {privateFunctionality === 'privateHome' && <PrivateHome />}
          {privateFunctionality === 'generateEmails' && <GenerateEmails />}
          {privateFunctionality === 'cro' && <CRO />}
          {privateFunctionality === 'assetTracker' && <AssetTracker />}
          {privateFunctionality === 'chatbot' && <ChatBot />}
          {privateFunctionality === 'go' && <GOTracker />}
          {privateFunctionality === 'overtime' && <OTTracker />}
          {/* Add other functionalities here */}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Private() {
  return <PrivateContent />;
}
