//REACT
import * as React from 'react';
//import { useContext } from "react";

//MUI
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FeedIcon from '@mui/icons-material/Feed';
import EmailIcon from '@mui/icons-material/Email';
import SpokeIcon from '@mui/icons-material/Spoke';
import ForumIcon from '@mui/icons-material/Forum';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import RailwayAlertIcon from '@mui/icons-material/RailwayAlert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WavingHandIcon from '@mui/icons-material/WavingHand';

//conditional logic will live here, filter out features based on user role
//import { AuthContext } from '../../authentication/Auth';

const PrivateListItems = (props) => {
    //const { userTitle } = useContext(AuthContext);

    //set array of roles that can access each feature
    // const emailRoles = ['Innovation Engineer', 'Innovation Manager', 'Innovation Director'];
    // const croRoles = ['Innovation Engineer', 'Innovation Manager', 'Innovation Director'];
    // const chatbotRoles = ['Innovation Engineer', 'Innovation Manager', 'Innovation Director'];
    // const assetTrackerRoles = ['Innovation Engineer', 'Innovation Manager', 'Innovation Director'];
    
    // then check if user title is in array for each feature

    return (
        <React.Fragment>
            <ListItemButton onClick={() => props.onSelect('privateHome')}>
                <ListItemIcon>
                    <WavingHandIcon />
                </ListItemIcon>
                <ListItemText primary="Welcome" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('tech')}>
                <ListItemIcon>
                    <FeedIcon />
                </ListItemIcon>
                <ListItemText primary="Tech Partners" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('generateEmails')}>
                <ListItemIcon>
                    <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Generate an Email" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('assetTracker')}>
                <ListItemIcon>
                    <DevicesOtherIcon />
                </ListItemIcon>
                <ListItemText primary="Equipment Checkout" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('chatbot')}>
                <ListItemIcon>
                    <ForumIcon />
                </ListItemIcon>
                <ListItemText primary="Chat Bot" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('cro')}>
                <ListItemIcon>
                    <SpokeIcon />
                </ListItemIcon>
                <ListItemText primary="Cable Run Optimizer" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('go')}>
                <ListItemIcon>
                    <RailwayAlertIcon />
                </ListItemIcon>
                <ListItemText primary="GO Tracker" />
            </ListItemButton>

            <ListItemButton onClick={() => props.onSelect('overtime')}>
                <ListItemIcon>
                    <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary="Overtime Tracker" />
            </ListItemButton>

        </React.Fragment>
    )
}

export default PrivateListItems;


