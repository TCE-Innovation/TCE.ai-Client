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

// COMPONENTS
import Home from "../PrivateFeatures/Home/Home";
import PrivateListItems from "./privateItems";
import PrivateNavigation from "./PrivateNavigation";
import Training from '../PrivateFeatures/Training';
import CRO from '../PrivateFeatures/CRO/CRO';
import AssetTracker from '../PrivateFeatures/AssetTracker/AssetTracker';
import ChatBot from '../PrivateFeatures/ChatBot';
import GenerateEmails from "../PrivateFeatures/GenerateEmails";
import GOTracker from "../PrivateFeatures/GOTracker";
import SubAuto from "../PrivateFeatures/SubAuto/SubAuto";
import ScheduleDashboards from '../PrivateFeatures/ScheduleDashboards';
import ToolUsage from "../PrivateFeatures/ToolUsage";
import PrintingRequest from '../PrivateFeatures/3dPrinting/3dPrinting';
import DroneCaptures from '../PrivateFeatures/DroneCaptures';
import Clearance from '../PrivateFeatures/Clearance/Clearance';
import EITDashboard from '../PrivateFeatures/EITDashboard';
import Admin from '../PrivateFeatures/AdminPanel/AdminPanel';
import ExecutiveDashboards from '../PrivateFeatures/ExecutiveDashboards';
import ProcoreDashboards from '../PrivateFeatures/ProcoreDashboards';
import ChatbotDashboard from '../PrivateFeatures/ChatbotDashboard';

// AUTH
import { adminList } from "../../admin/lists";
import { AuthContext } from "../../authentication/Auth";

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
    'Training' : 'training',
    'Email Generator': 'generate-emails',
    'Cable Run Optimizer': 'cable-run-optimizer',
    'GO Tracker': 'go-tracker',
    'Equipment Checkout': 'equipment-checkout',
    'Subcontractor Forms': 'sub-automation',
    'Schedule Dashboards': 'schedule-dashboards',
    'Tool Usage Stats': 'tool-usage',
    '3D Printing Request': '3d-printing-request',
    'Drone Captures': 'drone-captures',
    'Chatbot': 'chatbot',
    'LLLE Clearance Calculator': 'clearance-calculator',
    'EIT Dashboard': 'equip-install-dashboard',
    'Executive Dashboards': 'executive-dashboards',
    'Procore Dashboards' : 'procore-dashboards',
    'Chatbot Dashboard' : 'chatbot-dashboard',
  };

  // Always available tools
  const alwaysAvailableTools = useMemo(() => ['home', 'training', 'sub-automation', 'equipment-checkout', 'go-tracker', '3d-printing-request', 'chatbot', 'clearance-calculator', 'admin' ], []);

  // Split the userTools string into an array
  const userToolsArray = (userTools || "")
    .split(",")
    .map((tool) => tool.trim());

  // Convert userToolsArray to the URL ends they map to
  const userToolsUrlEnds = userToolsArray
    .map((tool) => toolNameMap[tool])
    .filter(Boolean);

  // Memoize toolComponentMap to avoid recalculating it on every render
  const toolComponentMap = useMemo(() => ({
    'home': Home,
    'training': Training,
    'generate-emails': GenerateEmails,
    'cable-run-optimizer': CRO,
    'equipment-checkout': AssetTracker,
    'go-tracker': GOTracker,
    'chatbot': ChatBot,
    'sub-automation': SubAuto,
    'schedule-dashboards': ScheduleDashboards,
    'tool-usage': ToolUsage,
    '3d-printing-request': PrintingRequest,
    'drone-captures': DroneCaptures,
    'clearance-calculator': Clearance,
    'equip-install-dashboard' : EITDashboard,
    'executive-dashboards' : ExecutiveDashboards,
    'procore-dashboards' : ProcoreDashboards,
    'chatbot-dashboard' : ChatbotDashboard,
    'admin': isAdmin ? Admin : null // Admin access only
  }), [isAdmin]);

  // Check if the tool is valid and if user has access
  useEffect(() => {
    // skip this check for chatbot as it has url query parameters
    if(tool === "chatbot") return;
    console.log('Always available tools:', alwaysAvailableTools);
    if (!toolComponentMap[tool] || (!alwaysAvailableTools.includes(tool) && !userToolsUrlEnds.includes(tool))) {
      navigate("/private/home", { replace: true });
    }
  }, [
    tool,
    navigate,
    toolComponentMap,
    alwaysAvailableTools,
    userToolsUrlEnds,
  ]);

  const ComponentToRender = toolComponentMap[tool] || Home;

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "fixed",
      whiteSpace: "nowrap",
      marginTop: "90px",
      width: "auto",
      boxSizing: "border-box",
      //height: "calc(100vh - 20px)",
      height: "90vh",
      overflowY: "auto", // Allow vertical scrolling
      scrollbarWidth: "none", // For Firefox, hides scrollbar
      "&::-webkit-scrollbar": {
        display: "none", // Hides the scrollbar for Webkit browsers like Chrome, Safari
      },
      ...(open ? {} : {
        overflowX: "hidden",
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

  return (
    <ThemeProvider theme={mdTheme}>
      <div className="App">
        <header className="App-header">
          <PrivateNavigation />
        </header>
      </div>

      <Box id="private-wrapper" sx={{ display: 'flex'}}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
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
        </Drawer>

        <Box
          component="main"
          sx={{ 
            marginTop: 5, 
            flexGrow: 1, 
            p: 3, 
            ml: open ? 33 : 9 }}
        >
          <ComponentToRender />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Private() {
  return <PrivateContent />;
}
