import React, { useContext, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ChevronRight } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// COMPONENTS
import Home from '../PrivateFeatures/Home/Home';
import PrivateListItems from "./privateItems";
import PrivateNavigation from "./PrivateNavigation";
import CRO from '../PrivateFeatures/CRO/CRO';
import AssetTracker from '../PrivateFeatures/AssetTracker/AssetTracker';
import ChatBot from '../PrivateFeatures/ChatBot';
import GenerateEmails from "../PrivateFeatures/GenerateEmails";
import GOTracker from '../PrivateFeatures/GOTracker';
import SubAuto from "../PrivateFeatures/SubAuto/SubAuto";
import ScheduleDashboards from '../PrivateFeatures/ScheduleDashboards';
import OverviewDashboard from '../PrivateFeatures/OverviewDashboard';
import ToolUsage from "../PrivateFeatures/ToolUsage";
import PrintingRequest from '../PrivateFeatures/3dPrinting/3dPrinting';
import DroneCaptures from '../PrivateFeatures/DroneCaptures';
import Clearance from '../PrivateFeatures/Clearance/Clearance';
import Admin from '../PrivateFeatures/AdminPanel/AdminPanel';

// AUTH
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

  const { userEmail, userTools } = useContext(AuthContext);
  const isAdmin = adminList.includes(userEmail);

  // Mapping full names of tools to their URL ends
  const toolNameMap = {
    'Home': 'home',
    'Email Generator': 'generate-emails',
    'Cable Run Optimizer': 'cable-run-optimizer',
    'GO Tracker': 'go-tracker',
    'Equipment Checkout': 'equipment-checkout',
    'Subcontractor Forms': 'sub-automation',
    'Schedule Dashboards': 'schedule-dashboards',
    'Tool Usage Stats': 'tool-usage',
    '3D Printing Request': '3d-printing-request',
    'Overview Dashboard': 'overview-dashboard',
    'Drone Captures': 'drone-captures',
    'Chatbot': 'chatbot',
    'LLLE Clearance Calculator': 'clearance-calculator',
  };

  // Always available tools
  const alwaysAvailableTools = useMemo(() => ['home', 'sub-automation', 'equipment-checkout', 'go-tracker', '3d-printing-request', 'clearance-calculator', 'admin','chat-bot'], []);

  // Split the userTools string into an array
  const userToolsArray = (userTools || '').split(',').map(tool => tool.trim());

  // Convert userToolsArray to the URL ends they map to
  const userToolsUrlEnds = userToolsArray.map(tool => toolNameMap[tool]).filter(Boolean);

  // Memorize toolComponentMap to avoid recalculating it on every render
  const toolComponentMap = useMemo(() => ({
    'home': Home,
    'generate-emails': GenerateEmails,
    'cable-run-optimizer': CRO,
    'equipment-checkout': AssetTracker,
    'go-tracker': GOTracker,
    'chatbot': ChatBot,
    'sub-automation': SubAuto,
    'schedule-dashboards': ScheduleDashboards,
    'overview-dashboard': OverviewDashboard,
    'tool-usage': ToolUsage,
    '3d-printing-request': PrintingRequest,
    'drone-captures': DroneCaptures,
    'clearance-calculator': Clearance,
    'admin': isAdmin ? Admin : null // Admin access only
  }), [isAdmin]);

  // Check if the tool is valid and if user has access
  useEffect(() => {
    if (!toolComponentMap[tool] || (!alwaysAvailableTools.includes(tool) && !userToolsUrlEnds.includes(tool))) {
      navigate("/private/home", { replace: true });
    }
  }, [tool, navigate, toolComponentMap, alwaysAvailableTools, userToolsUrlEnds]);

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

      <Box sx={{ display: 'flex', backgroundColor:window.location.pathname.includes("chat-bot") ? "rgb(248, 241, 215)" : "" }}>
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
            <PrivateListItems tool={tool} />
          </List>
          <Box sx={{ flexGrow: .75 }} />
          <Divider />
          {open ? (
            <Button
              sx={{ mb: 8 }}
              onClick={handlePublicNavigate}
              style={{ color: 'grey' }}
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
