import * as React from 'react';
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

const PrivateListItems = () => {
    const [selectedInnerItem, setSelectedInnerItem] = React.useState('home');

    const handleInnerItemClick = (item) => {
        setSelectedInnerItem(item);
    };

    const getInnerItemStyle = (item) => ({
        backgroundColor: selectedInnerItem === item ? '#1b365f' : 'transparent',
        color: selectedInnerItem === item ? 'white' : 'grey',
        borderRadius: selectedInnerItem === item ? '10px' : '0',
        marginLeft: "10px",
        marginRight: "10px",
    });

    const getIconColor = (item) => ({
        color: selectedInnerItem === item ? 'white' : 'inherit' 
    });

    const getIcon = (iconComponent, itemKey) => {
        return <ListItemIcon style={getIconColor(itemKey)}>{iconComponent}</ListItemIcon>;
    };

    return (
        <List component="nav">
            {[
                { to: '/private/home', text: 'Home', icon: <HomeOutlinedIcon />, key: 'home' },
                { to: '/private/generate-emails', text: 'Email Generator', icon: <EmailOutlinedIcon />, key: 'generateEmails' },
                { to: '/private/chat-bot', text: 'Chat Bot', icon: <ForumOutlinedIcon />, key: 'chatbot' },
                { to: '/private/cable-run-optimizer', text: 'Cable Run Optimizer', icon: <SpokeOutlinedIcon />, key: 'cro' },
                { to: '/private/go-tracker', text: 'GO Tracker', icon: <RailwayAlertOutlinedIcon />, key: 'go' },
                { to: '/private/equipment-checkout', text: 'Equipment Checkout', icon: <DevicesOtherIcon />, key: 'assetTracker' },
                { to: '/private/sub-automation', text: 'Subcontractor Forms', icon: <ArticleOutlinedIcon />, key: 'subAuto' },
            ].map(item => (
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
