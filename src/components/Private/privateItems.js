import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, CircularProgress, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// ICONS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import RailwayAlertOutlinedIcon from '@mui/icons-material/RailwayAlertOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import DataThresholdingOutlinedIcon from '@mui/icons-material/DataThresholdingOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import PercentIcon from '@mui/icons-material/Percent';
import SchoolIcon from '@mui/icons-material/School';

// CONTEXT
import { AuthContext } from "../../authentication/Auth";

// ADMIN
import { adminList } from '../../admin/lists';

const PrivateListItems = ({ tool }) => {
    const { userEmail, userTools, loading } = useContext(AuthContext);
    const [selectedInnerItem, setSelectedInnerItem] = React.useState('home');

    React.useEffect(() => {
        setSelectedInnerItem(tool);
    }, [tool]);

    const handleInnerItemClick = (item) => {
        setSelectedInnerItem(item);
    };

    const getInnerItemStyle = (item) => ({
        backgroundColor: selectedInnerItem === item ? '#1b365f' : 'transparent',
        color: selectedInnerItem === item ? 'white' : 'grey',
        borderRadius: '10px',
        marginLeft: "10px",
        marginRight: "10px",
        paddingLeft: "14px",
    });

    const getIconColor = (item) => ({
        color: selectedInnerItem === item ? 'white' : 'inherit',
    });

    const getIcon = (iconComponent, itemKey) => {
        return <ListItemIcon style={getIconColor(itemKey)}>{iconComponent}</ListItemIcon>;
    };

    //provisionable items THIS NAME HAS TO MATCH THE NAME OF THE TOOL IN THE SQL VIEW
    const listItems = [
        { to: '/private/generate-emails', text: 'Email Generator', icon: <EmailOutlinedIcon />, key: 'generate-emails' },
        { to: '/private/cable-run-optimizer', text: 'Cable Run Optimizer', icon: <SpokeOutlinedIcon />, key: 'cable-run-optimizer' },
        { to: '/private/schedule-dashboards', text: 'Schedule Dashboards', icon: <InsertChartOutlinedIcon />, key: 'schedule-dashboards'},
        { to: '/private/tool-usage', text: 'Tool Usage Stats', icon: <DonutSmallOutlinedIcon />, key: 'tool-usage' }, 
        { to: '/private/drone-captures', text: 'Drone Captures', icon: <SatelliteAltIcon />, key: 'drone-captures' },
        { to: '/private/equip-install-dashboard', text: 'EIT Dashboard', icon: <DataThresholdingOutlinedIcon />, key: 'equip-install-dashboard' },
        { to: '/private/executive-dashboards', text: 'Executive Dashboards', icon: <DataThresholdingOutlinedIcon />, key: 'executive-dashboards' },
        { to: '/private/procore-dashboards', text: 'Procore Dashboards', icon: <DataThresholdingOutlinedIcon />, key: 'procore-dashboards' },
        { to: '/private/chatbot-dashboard', text: 'Chatbot Dashboard', icon: <DataThresholdingOutlinedIcon />, key: 'chatbot-dashboard'},
    ];

    // Ensure userTools is a valid string, else default to an empty string
    const validUserTools = userTools || '';

    // Split the userTools string into an array
    const userToolsArray = validUserTools.split(',').map(tool => tool.trim());

    // Filter the listItems based on userToolsArray
    let filteredListItems = listItems.filter(item => userToolsArray.includes(item.text));

    // Add admin specific items conditionally
    if (adminList.includes(userEmail)) {
        filteredListItems.push(
            {
                to: '/private/admin',
                text: 'Admin Panel',
                icon: <AdminPanelSettingsOutlinedIcon />,
                key: 'admin'
            }
        );
    }

    // Always include the following items (non-provisionable)
    const alwaysIncludedItems = [
        { to: '/private/home', text: 'Home', icon: <HomeOutlinedIcon />, key: 'home' },
        { to: '/private/training', text: 'Training', icon: <SchoolIcon />, key: 'training' },
        { to: '/private/sub-automation', text: 'Subcontractor Forms', icon: <ArticleOutlinedIcon />, key: 'sub-automation' },
        { to: '/private/equipment-checkout', text: 'Equipment Checkout', icon: <DevicesOtherIcon />, key: 'equipment-checkout' },
        { to: '/private/go-tracker', text: 'GO Tracker', icon: <RailwayAlertOutlinedIcon />, key: 'go-tracker' },
        { to: '/private/3d-printing-request', text: 'Request 3D Printing', icon: <PrintOutlinedIcon />, key: '3d-printing-request' },
        { to: '/private/chatbot', text: 'Chatbot', icon: <ForumOutlinedIcon />, key: 'chatbot' },
        { to: '/private/clearance-calculator', text: 'Clearance Calculator', icon: <PercentIcon />, key: 'clearance-calculator' },
    ];

    // Combine always included items with the filtered list items
    const finalListItems = [...alwaysIncludedItems, ...filteredListItems];

    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', width: '266px' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <List component="nav">
                    {finalListItems.map(item => (
                        <Link to={item.to} style={{ textDecoration: 'none', color: 'inherit' }} key={item.key}>
                            <ListItemButton style={getInnerItemStyle(item.key)} onClick={() => handleInnerItemClick(item.key)}>
                                {getIcon(item.icon, item.key)}
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            )}
        </div>
    );
};

export default PrivateListItems;