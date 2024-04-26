import React, { useState } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// COMPONENTS
import AboutMe from './AboutMe';
import MyApps from './MyApps';

function Account() {
    const [activeTab, setActiveTab] = useState('aboutMe');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const contentStyle = {
        height: '500px', // Fixed height; adjust as necessary
        overflowY: 'auto', // Allows scrolling within the fixed size container if content overflows
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2, mb: 5 }}>
                <Button
                    variant={activeTab === 'aboutMe' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('aboutMe')}
                    style={activeTab === 'aboutMe' ? { backgroundColor: '#1b365f', color: 'white' } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f' }}
                >
                    About Me
                </Button>
                <Button
                    variant={activeTab === 'myApplications' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('myApplications')}
                    style={activeTab === 'myApplications' ? { backgroundColor: '#1b365f', color: 'white', marginLeft: 10 } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f', marginLeft: 10 }}
                >
                    My Applications
                </Button>
            </Box>

            <Box sx={contentStyle}>
                {activeTab === 'aboutMe' ? <AboutMe /> : <MyApps />}
            </Box>
        </Grid>
    );
}

export default Account;
