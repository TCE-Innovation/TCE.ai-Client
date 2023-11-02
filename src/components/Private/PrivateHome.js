//REACT
import React from 'react';

//MUI
import { Typography, Box, List, ListItem, ListItemText, Container} from '@mui/material';
import styled from '@emotion/styled';

//COMPONENTS
import Copyright from '../General/Copyright';

const CustomListItemText = styled(ListItemText)`
  position: relative;
  padding-left: 1.5em;

  &:before {
    content: '•';
    display: inline-block;
    position: absolute;
    left: 0;
    color: #000;
  }
`;

const PrivateHome = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>

                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to TCIG.nyc
                </Typography>

                    <Typography paragraph>
                        The Headquarters for TCE's Innovative Solutions:
                    </Typography>
                <List>
                    <ListItem>
                        <CustomListItemText primary="Information" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Email and Response Generation" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Equipment Checkout" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Chat Bot" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Cable Run Optimizer" />
                    </ListItem>
                </List>

                <Typography paragraph>
                        To get started, choose a feature from the sidebar!
                </Typography>
            </Box>
            <Copyright sx={{ mt: 70, mb: 4 }} />
        </Container>
    );
};

export default PrivateHome;
