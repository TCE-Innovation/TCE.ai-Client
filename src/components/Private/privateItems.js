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
import FeedIcon from '@mui/icons-material/Feed';
import EmailIcon from '@mui/icons-material/Email';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ForumIcon from '@mui/icons-material/Forum';
import SpokeIcon from '@mui/icons-material/Spoke';
import RailwayAlertIcon from '@mui/icons-material/RailwayAlert';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import InfoIcon from '@mui/icons-material/Info';
import ConstructionIcon from '@mui/icons-material/Construction';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ArticleIcon from '@mui/icons-material/Article';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

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
                    <InfoIcon/>
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
                                <WavingHandIcon style={getIconColor('privateHome')}/>
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
                                <FeedIcon style={getIconColor('tech')}/>
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
                    <ConstructionIcon />
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
                                <EmailIcon style={getIconColor('generateEmails')}/>
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
                                <ForumIcon style={getIconColor('chatbot')}/>
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
                                <SpokeIcon style={getIconColor('cro')}/>
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
                                <RailwayAlertIcon style={getIconColor('go')}/>
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
                    <FormatAlignJustifyIcon />
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
                                <ArticleIcon style={getIconColor('subAuto')}/>
                            </ListItemIcon>
                            <ListItemText primary="Subcontractor Forms" />
                        </ListItemButton>
                    </Link>

                    <Link to="/private/idea-submission" style={itemTextStyle}>
                        <ListItemButton 
                            style={getInnerItemStyle('ideaSubmission')}
                            onClick={() => handleInnerItemClick('ideaSubmission')}
                        >
                            <ListItemIcon>
                                <LightbulbIcon style={getIconColor('ideaSubmission')}/>
                            </ListItemIcon>
                            <ListItemText primary="Idea Submission" />
                        </ListItemButton>
                    </Link>

                </List>
            </Collapse>        
        </React.Fragment>
    )
}

export default PrivateListItems;