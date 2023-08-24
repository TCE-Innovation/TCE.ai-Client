import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EmailIcon from '@mui/icons-material/Email';
import ListAltIcon from '@mui/icons-material/ListAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const MainListItems = (props) => (
    <React.Fragment>
        <ListItemButton onClick={() => props.onSelect('generateEmails')}>
            <ListItemIcon>
                <EmailIcon />
            </ListItemIcon>
            <ListItemText primary="Generate an Email" />
        </ListItemButton>
        <ListItemButton onClick={() => props.onSelect('itinerary')}>
            <ListItemIcon>
                <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Generate an Itinerary" />
        </ListItemButton>
        <ListItemButton onClick={() => props.onSelect('correspondence')}>
            <ListItemIcon>
                <QuestionAnswerIcon />
            </ListItemIcon>
            <ListItemText primary="Generate a Response" />
        </ListItemButton>
        <ListItemButton onClick={() => props.onSelect('chatpdf')}>
            <ListItemIcon>
                <PictureAsPdfIcon />
            </ListItemIcon>
            <ListItemText primary="Chat with a PDF" />
        </ListItemButton>
    </React.Fragment>
);

export default MainListItems;


