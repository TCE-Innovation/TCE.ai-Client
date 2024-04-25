//REACT
import * as React from 'react';
import '../PrivateFeatures/privateStyle.css'
import { Link } from 'react-router-dom';

//MUI
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

//ICONS
//information
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WavingHandOutlinedIcon from '@mui/icons-material/WavingHandOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';

//tools
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SpokeOutlinedIcon from '@mui/icons-material/SpokeOutlined';
import RailwayAlertOutlinedIcon from '@mui/icons-material/RailwayAlertOutlined';

//forms
import HorizontalSplitOutlinedIcon from '@mui/icons-material/HorizontalSplitOutlined';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';


const PrivateListItems = () => {
    const [clickOpenSection, setClickOpenSection] = React.useState(null);
    const [selectedInnerItem, setSelectedInnerItem] = React.useState('privateHome');

    const handleClick = (section) => {
        setClickOpenSection(clickOpenSection === section ? null : section);
    };

    const handleInnerItemClick = (item) => {
        setSelectedInnerItem(item);
    };


    const getInnerItemStyle = (item) => ({
        backgroundColor: selectedInnerItem === item ? '#1b365f' : 'transparent', // Blue background
        color: selectedInnerItem === item ? 'white' : 'grey', // Blue background
        borderRadius: selectedInnerItem === item ? '10px' : '0', // Rounded corners
        boxShadow: selectedInnerItem === item ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.25)' : 'none',
        paddingLeft: "15px",
        marginLeft: "10px",
        marginRight: "10px",
    });

    const getIconColor = (item) => ({
        color: selectedInnerItem === item ? 'white' : 'inherit' // Icon color changes based on selection
    });

    const itemTextStyle = {
        color: 'grey',
        width: '150px',
        fontWeight: '200',
        textDecoration: 'none',
    };

    return (
        <React.Fragment>           
            <ListItemButton
                style={{padding:"25px"}}                
                onClick={() => handleClick('information')}
            >
                <ListItemIcon>
                    <InfoOutlinedIcon/>
                </ListItemIcon>
                <ListItemText primary="Information"  style={ itemTextStyle }/>
                    {clickOpenSection === 'information' ? <ExpandLess /> : <ExpandMore />}

            </ListItemButton>

            <Collapse in={clickOpenSection === 'information'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <Link to="/private/welcome"  style={itemTextStyle}>
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

                </List>
            </Collapse>
        

        
            <ListItemButton  
                style={{padding:"25px"}}                 
                onClick={() => handleClick('tools')}
            >
                <ListItemIcon>
                    <HandymanOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Tools" style={itemTextStyle}/>
                    {clickOpenSection === 'tools' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={clickOpenSection === 'tools'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

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

                </List>
            </Collapse>
        

                    
            <ListItemButton    
                style={{padding:"25px"}}                
                onClick={() => handleClick('forms')}
            >
                <ListItemIcon>
                    <HorizontalSplitOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Forms" style={itemTextStyle}/>
                    {clickOpenSection === 'forms' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={clickOpenSection === 'forms'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
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
            </Collapse>        
        </React.Fragment>
    )
}

export default PrivateListItems;