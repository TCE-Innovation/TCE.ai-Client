import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Container} from '@mui/material';
import styled from '@emotion/styled';

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

const Home = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>

                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to TCE.ai
                </Typography>

                    <Typography paragraph>
                        The Headquarters for TCE's Innovative Solutions:
                    </Typography>
                <List>
                    <ListItem>
                        <CustomListItemText primary="Email and Response Generation" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Cable Run Optimizer" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="ChatBot" />
                    </ListItem>
                </List>

                <Typography paragraph>
                        To get started, choose a feature from the sidebar!
                </Typography>
            </Box>
        </Container>
    );
};

export default Home;
