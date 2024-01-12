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

const getListItemStyle = (isSectionOpen) => ({
    padding: "25px",
});

const PrivateListItems = (props) => {
    const [clickOpenSection, setClickOpenSection] = React.useState(null);
    const [selectedInnerItem, setSelectedInnerItem] = React.useState(null);

    const handleClick = (section) => {
        setClickOpenSection(clickOpenSection === section ? null : section);
    };

    const handleInnerItemClick = (item) => {
        setSelectedInnerItem(item);
        props.onSelect(item);
    };

    const getInnerItemStyle = (item) => ({
        backgroundColor: selectedInnerItem === item ? '#f2f2f2' : 'transparent',
        boxShadow: selectedInnerItem === item ? 'inset 0px 0px 4px rgba(0, 0, 0, 0.25)' : 'none',
        paddingLeft: "25px"
    });

    return (
        <React.Fragment>           
            <ListItemButton
                style={getListItemStyle(clickOpenSection === 'information')}                
                onClick={() => handleClick('information')}
            >
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Information"  style={{ width: '150px' }}/>
                    {clickOpenSection === 'information' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={clickOpenSection === 'information'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton 
                        style={getInnerItemStyle('privateHome')}
                        onClick={() => handleInnerItemClick('privateHome')}
                    >
                        <ListItemIcon>
                            <WavingHandIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Welcome"/>
                    </ListItemButton>

                    <ListItemButton 
                        style={getInnerItemStyle('tech')}
                        onClick={() => handleInnerItemClick('tech')}
                    >
                        <ListItemIcon>
                            <FeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tech Partners"/>
                    </ListItemButton>

                </List>
            </Collapse>
        

        
            <ListItemButton  
                style={getListItemStyle(clickOpenSection === 'tools')}                 
                onClick={() => handleClick('tools')}
            >
                <ListItemIcon>
                    <ConstructionIcon />
                </ListItemIcon>
                <ListItemText primary="Tools" />
                    {clickOpenSection === 'tools' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={clickOpenSection === 'tools'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    <ListItemButton 
                        style={getInnerItemStyle('generateEmails')}
                        onClick={() => handleInnerItemClick('generateEmails')}
                    >
                        <ListItemIcon>
                            <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Generate an Email" />
                    </ListItemButton>

                    <ListItemButton 
                        style={getInnerItemStyle('chatbot')}
                        onClick={() => handleInnerItemClick('chatbot')}
                    >
                        <ListItemIcon>
                            <ForumIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chat Bot" />
                    </ListItemButton>

                    <ListItemButton 
                        style={getInnerItemStyle('cro')}
                        onClick={() => handleInnerItemClick('cro')}
                    >
                        <ListItemIcon>
                            <SpokeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cable Run Optimizer" />
                    </ListItemButton>

                    <ListItemButton 
                        style={getInnerItemStyle('go')}
                        onClick={() => handleInnerItemClick('go')}
                    >
                        <ListItemIcon>
                            <RailwayAlertIcon />
                        </ListItemIcon>
                        <ListItemText primary="GO Tracker" />
                    </ListItemButton>

                </List>
            </Collapse>
        

                    
            <ListItemButton    
                style={getListItemStyle(clickOpenSection === 'office')}                
                onClick={() => handleClick('office')}
            >
                <ListItemIcon>
                    <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Office" />
                    {clickOpenSection === 'office' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={clickOpenSection === 'office'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton 
                        style={getInnerItemStyle('assetTracker')}
                        onClick={() => handleInnerItemClick('assetTracker')}
                    >
                        <ListItemIcon>
                            <DevicesOtherIcon />
                        </ListItemIcon>
                        <ListItemText primary="Equipment Checkout" />
                    </ListItemButton>

                    <ListItemButton 
                        style={getInnerItemStyle('overtime')}
                        onClick={() => handleInnerItemClick('overtime')}
                    >
                        <ListItemIcon>
                            <AccessTimeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Overtime Tracker" />
                    </ListItemButton>
                    
                    <ListItemButton 
                        style={getInnerItemStyle('subAuto')}
                        onClick={() => handleInnerItemClick('subAuto')}
                    >
                        <ListItemIcon>
                            <ArticleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subcontractor Forms" />
                    </ListItemButton>
                </List>
            </Collapse>        
        </React.Fragment>
    )
}

export default PrivateListItems;