//REACT
import * as React from 'react';

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

    const handleHover = (section) => {
        setHoverOpenSection(section);
    };

    const handleLeave = () => {
        setHoverOpenSection(null);
    };

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
                <ListItemText primary="Information"  style={{ width: '130px' }}/>
                    {isOpen('information') ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={isOpen('information')} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('privateHome')}>
                        <ListItemIcon>
                            <WavingHandIcon />
                        </ListItemIcon>
                        <ListItemText primary="Welcome"/>
                    </ListItemButton>

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('tech')}>
                        <ListItemIcon>
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

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('generateEmails')}>
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Generate an Email" />
                    </ListItemButton>

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('chatbot')}>
                        <ListItemIcon>
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat Bot" />
                    </ListItemButton>

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('cro')}>
                        <ListItemIcon>
                            <SpokeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cable Run Optimizer" />
                    </ListItemButton>

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('go')}>
                        <ListItemIcon>
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
                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('assetTracker')}>
                        <ListItemIcon>
                            <DevicesOtherIcon />
                        </ListItemIcon>
                        <ListItemText primary="Equipment Checkout" />
                    </ListItemButton>

                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('overtime')}>
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Overtime Tracker" />
                    </ListItemButton>
                    
                    <ListItemButton style={{ backgroundColor: '#f5f5f5' }} onClick={() => props.onSelect('subAuto')}>
                        <ListItemIcon>
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