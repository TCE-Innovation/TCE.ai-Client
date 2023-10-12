//REACT
import * as React from 'react';

//MUI
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
//import FlashOnIcon from '@mui/icons-material/FlashOn';

const PublicListItems = (props) => (
    <React.Fragment>
        <ListItemButton onClick={() => props.onSelect('contact')}>
            <ListItemIcon>
                <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
        </ListItemButton>
        {/*<ListItemButton onClick={() => props.onSelect('aboutTCE')}>
            <ListItemIcon>
                <FlashOnIcon />
            </ListItemIcon>
            <ListItemText primary="About TCE" />
</ListItemButton>*/}
    </React.Fragment>
);

export default PublicListItems;


