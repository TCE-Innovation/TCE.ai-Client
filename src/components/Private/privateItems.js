//REACT
import * as React from 'react';
import '../PrivateFeatures/privateStyle.css'

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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import InfoIcon from '@mui/icons-material/Info';
import ConstructionIcon from '@mui/icons-material/Construction';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArticleIcon from '@mui/icons-material/Article';

const listItemStyle = {
    padding: '30px', // Increase padding for more space and larger items
};

const PrivateListItems = (props) => {
    const [hoverOpenSection, setHoverOpenSection] = React.useState(null);
    const [clickOpenSection, setClickOpenSection] = React.useState(null);

    const handleClick = (section) => {
        setClickOpenSection(clickOpenSection === section ? null : section);
    };

    const isOpen = (section) => {
        return clickOpenSection === section || hoverOpenSection === section;
    };

    return (
        <React.Fragment>
            <div
                onMouseEnter={() => setHoverOpenSection('information')}
                onMouseLeave={() => setHoverOpenSection(null)}
            >
            <ListItemButton
                style={listItemStyle}                 
                onClick={() => handleClick('information')}
            >
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Information"  style={{ width: '150px' }}/>
                    {isOpen('information') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={isOpen('information')} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton onClick={() => props.onSelect('privateHome')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <WavingHandIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Welcome"/>
                    </ListItemButton>

                    <ListItemButton onClick={() => props.onSelect('tech')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <FeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tech Partners"/>
                    </ListItemButton>

                </List>
            </Collapse>
            </div>


            <div
                onMouseEnter={() => setHoverOpenSection('tools')}
                onMouseLeave={() => setHoverOpenSection(null)}
            >
            <ListItemButton  
                style={listItemStyle}                  
                onClick={() => handleClick('tools')}
            >
                <ListItemIcon>
                    <ConstructionIcon />
                </ListItemIcon>
                <ListItemText primary="Tools" />
                    {isOpen('tools') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={isOpen('tools')} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton onClick={() => props.onSelect('generateEmails')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Generate an Email" />
                    </ListItemButton>

                    <ListItemButton onClick={() => props.onSelect('chatbot')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat Bot" />
                    </ListItemButton>

                    <ListItemButton onClick={() => props.onSelect('cro')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <SpokeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cable Run Optimizer" />
                    </ListItemButton>

                    <ListItemButton onClick={() => props.onSelect('go')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <RailwayAlertIcon />
                        </ListItemIcon>
                        <ListItemText primary="GO Tracker" />
                    </ListItemButton>

                </List>
            </Collapse>
            </div>


            <div
                onMouseEnter={() => setHoverOpenSection('office')}
                onMouseLeave={() => setHoverOpenSection(null)}
            >          
            <ListItemButton    
                style={listItemStyle}                
                onClick={() => handleClick('office')}
            >
                <ListItemIcon>
                    <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Office" />
                    {isOpen('office') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={isOpen('office')} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => props.onSelect('assetTracker')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <DevicesOtherIcon />
                        </ListItemIcon>
                        <ListItemText primary="Equipment Checkout" />
                    </ListItemButton>

                    <ListItemButton onClick={() => props.onSelect('overtime')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Overtime Tracker" />
                    </ListItemButton>
                    
                    <ListItemButton onClick={() => props.onSelect('subAuto')}>
                        <ListItemIcon style={{marginLeft: "15px"}}>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subcontractor Forms" />
                    </ListItemButton>
                </List>
            </Collapse>
            </div> 
        </React.Fragment>
    )
}

export default PrivateListItems;