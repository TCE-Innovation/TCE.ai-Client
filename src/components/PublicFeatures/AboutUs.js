//REACT
import React from 'react';

//MUI
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

const AboutUs = () => {
    return (
        <Container maxWidth="md">
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to TCIG.nyc
                </Typography>

                <Typography paragraph>
                    The Headquarters for TCE's Innovative Solutions
                </Typography>

                <List>
                    <ListItem>
                        <CustomListItemText primary="White Papers" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Other Public Content" />
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
};

export default AboutUs;
