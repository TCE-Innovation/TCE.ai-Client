//REACT
import * as React from 'react';

//MUI
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import SpokeIcon from '@mui/icons-material/Spoke';
import ForumIcon from '@mui/icons-material/Forum';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';

const PrivateListItems = (props) => (
    <React.Fragment>
        <ListItemButton onClick={() => props.onSelect('generateEmails')}>
            <ListItemIcon>
                <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Generate an Email" />
        </ListItemButton>
        <ListItemButton onClick={() => props.onSelect('cro')}>
            <ListItemIcon>
                <SpokeIcon />
            </ListItemIcon>
            <ListItemText primary="Cable Run Optimizer" />
        </ListItemButton>
        <ListItemButton onClick={() => props.onSelect('assetTracker')}>
            <ListItemIcon>
                <DevicesOtherIcon />
            </ListItemIcon>
            <ListItemText primary="Asset Tracker" />
        </ListItemButton>
        <ListItemButton onClick={() => props.onSelect('chatbot')}>
            <ListItemIcon>
                <ForumIcon />
            </ListItemIcon>
            <ListItemText primary="ChatBot" />
        </ListItemButton>
    </React.Fragment>
);

export default PrivateListItems;


