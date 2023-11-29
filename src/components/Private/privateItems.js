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


const PrivateListItems = (props) => {
    const [openInformation, setOpenInformation] = React.useState(false);
    const [openTools, setOpenTools] = React.useState(false);
    const [openOffice, setOpenOffice] = React.useState(false);

    const handleClickInformation = () => {
        setOpenInformation(!openInformation);
    };

    const handleClickTools = () => {
        setOpenTools(!openTools);
    };

    const handleClickOffice = () => {
        setOpenOffice(!openOffice);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={handleClickInformation}>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Information"  style={{ width: '130px' }}/>
                    {openInformation ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openInformation} timeout="auto" unmountOnExit>
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




            <ListItemButton onClick={handleClickTools}>
                <ListItemIcon>
                    <ConstructionIcon />
                </ListItemIcon>
                <ListItemText primary="Tools" />
                    {openTools ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openTools} timeout="auto" unmountOnExit>
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




            <ListItemButton onClick={handleClickOffice}>
                <ListItemIcon>
                    <ApartmentIcon />
                </ListItemIcon>
                <ListItemText primary="Office" />
                    {openOffice ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openOffice} timeout="auto" unmountOnExit>
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
                </List>
            </Collapse>

        </React.Fragment>
    )
}

export default PrivateListItems;


