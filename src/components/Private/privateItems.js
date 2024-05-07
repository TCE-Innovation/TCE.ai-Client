import * as React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// ICONS
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import RailwayAlertOutlinedIcon from '@mui/icons-material/RailwayAlertOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

//CONTEXT
import { AuthContext } from "../../authentication/Auth";

//ADMIN
import { adminList } from '../../admin/lists';

const PrivateListItems = ( {tool} ) => {
    const { userName } = useContext(AuthContext);
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
        borderRadius:'10px',
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

    const listItems = [
        { to: '/private/home', text: 'Home', icon: <HomeOutlinedIcon />, key: 'home' },
        { to: '/private/generate-emails', text: 'Email Generator', icon: <EmailOutlinedIcon />, key: 'generate-emails' },
        { to: '/private/chat-bot', text: 'Chat Bot', icon: <ForumOutlinedIcon />, key: 'chat-bot' },
        { to: '/private/cable-run-optimizer', text: 'Cable Run Optimizer', icon: <SpokeOutlinedIcon />, key: 'cable-run-optimizer' },
        { to: '/private/go-tracker', text: 'GO Tracker', icon: <RailwayAlertOutlinedIcon />, key: 'go-tracker' },
        { to: '/private/equipment-checkout', text: 'Equipment Checkout', icon: <DevicesOtherIcon />, key: 'equipment-checkout' },
        { to: '/private/sub-automation', text: 'Subcontractor Forms', icon: <ArticleOutlinedIcon />, key: 'sub-automation' },
    ];

    // Add admin specific items conditionally
    if (adminList.includes(userName)) {
        listItems.push(
            {
                to: '/private/tool-usage', 
                text: 'Tool Usage Statistics',
                icon: <DonutSmallOutlinedIcon />,
                key: 'tool-usage'
            },
            {
                to: '/private/admin', 
                text: 'Admin Panel',
                icon: <AdminPanelSettingsOutlinedIcon />,
                key: 'admin'
            }
        );
    }

    return (
        <List component="nav">
            {listItems.map(item => (
                <Link to={item.to} style={{ textDecoration: 'none', color: 'inherit' }} key={item.key}>
                    <ListItemButton style={getInnerItemStyle(item.key)} onClick={() => handleInnerItemClick(item.key)}>
                        {getIcon(item.icon, item.key)}
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </Link>
            ))}
        </List>
    );
};

export default PrivateListItems;
