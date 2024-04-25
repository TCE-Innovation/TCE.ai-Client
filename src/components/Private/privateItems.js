import * as React from 'react';
import { Link } from 'react-router-dom';

// MUI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// ICONS
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import RailwayAlertOutlinedIcon from '@mui/icons-material/RailwayAlertOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

const PrivateListItems = () => {
    const [selectedInnerItem, setSelectedInnerItem] = React.useState('privateHome');

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

    const itemTextStyle = {
        color: 'grey',
        width: '150px',
        fontWeight: '200',
        textDecoration: 'none',
    };

    return (
        <List component="nav">
            <Link to="/private/welcome" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('privateHome')}
                    onClick={() => handleInnerItemClick('privateHome')}
                >
                    <ListItemIcon>
                        <WavingHandOutlinedIcon style={getIconColor('privateHome')}/>
                    </ListItemIcon>
                    <ListItemText primary="Welcome"/>
                </ListItemButton>
            </Link>

            <Link to="/private/tech-partners" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('tech')}
                    onClick={() => handleInnerItemClick('tech')}
                >
                    <ListItemIcon>
                        <FeedOutlinedIcon style={getIconColor('tech')}/>
                    </ListItemIcon>
                    <ListItemText primary="Tech Partners"/>
                </ListItemButton>
            </Link>

            <Link to="/private/generate-emails" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('generateEmails')}
                    onClick={() => handleInnerItemClick('generateEmails')}
                >
                    <ListItemIcon>
                        <EmailOutlinedIcon style={getIconColor('generateEmails')}/>
                    </ListItemIcon>
                    <ListItemText primary="Generate an Email" />
                </ListItemButton>
            </Link>

            <Link to="/private/chat-bot" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('chatbot')}
                    onClick={() => handleInnerItemClick('chatbot')}
                >
                    <ListItemIcon>
                        <ForumOutlinedIcon style={getIconColor('chatbot')}/>
                    </ListItemIcon>
                    <ListItemText primary="Chat Bot" />
                </ListItemButton>
            </Link>

            <Link to="/private/cable-run-optimizer" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('cro')}
                    onClick={() => handleInnerItemClick('cro')}
                >
                    <ListItemIcon>
                        <SpokeOutlinedIcon style={getIconColor('cro')}/>
                    </ListItemIcon>
                    <ListItemText primary="Cable Run Optimizer" />
                </ListItemButton>
            </Link>

            <Link to="/private/go-tracker" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('go')}
                    onClick={() => handleInnerItemClick('go')}
                >
                    <ListItemIcon>
                        <RailwayAlertOutlinedIcon style={getIconColor('go')}/>
                    </ListItemIcon>
                    <ListItemText primary="GO Tracker" />
                </ListItemButton>
            </Link>

            <Link to="/private/equipment-checkout" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('assetTracker')}
                    onClick={() => handleInnerItemClick('assetTracker')}
                >
                    <ListItemIcon>
                        <DevicesOtherIcon style={getIconColor('assetTracker')}/>
                    </ListItemIcon>
                    <ListItemText primary="Equipment Checkout" />
                </ListItemButton>
            </Link>

            <Link to="/private/sub-automation" style={itemTextStyle}>
                <ListItemButton 
                    style={getInnerItemStyle('subAuto')}
                    onClick={() => handleInnerItemClick('subAuto')}
                >
                    <ListItemIcon>
                        <ArticleOutlinedIcon style={getIconColor('subAuto')}/>
                    </ListItemIcon>
                    <ListItemText primary="Subcontractor Forms" />
                </ListItemButton>
            </Link>
        </List>
    );
}

export default PrivateListItems;
