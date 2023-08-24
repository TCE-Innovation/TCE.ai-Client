import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, Container} from '@mui/material';
import styled from '@emotion/styled';

/*const GradientTitle = styled(Typography)`
  background-image: linear-gradient(45deg, #f06, #f80, #f06);
  mask-image: linear-gradient(to left, transparent 0%, #000 15%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
`;*/



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
                        TCE.ai is designed to simplify your life by handling administrative tasks for you. With TCE.ai, you can:
                    </Typography>
                <List>
                    <ListItem>
                        <CustomListItemText primary="Generate emails tailored to your needs" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Create itineraries based on your upcoming events" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Generate correspondence based on past letters" />
                    </ListItem>
                    <ListItem>
                        <CustomListItemText primary="Summarize a PDF based on the information you want" />
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
