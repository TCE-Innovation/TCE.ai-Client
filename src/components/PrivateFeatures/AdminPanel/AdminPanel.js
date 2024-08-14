import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// COMPONENTS
import Provisioning from './Provisioning/Provisioning';
import Monitor from './Monitor';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('provisioning');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const contentStyle = {
        height: '80vh',
        overflowY: 'auto',
    };

    return (
        <Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    variant={activeTab === 'provisioning' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('provisioning')}
                    style={activeTab === 'provisioning' ? { backgroundColor: '#1b365f', color: 'white', marginLeft: 10, marginBottom: '0.5rem' } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f', marginLeft: 10, marginBottom: '0.5rem' }}
                >
                    Provisioning
                </Button>

                <Button
                    variant={activeTab === 'monitor' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('monitor')}
                    style={activeTab === 'monitor' ? { backgroundColor: '#1b365f', color: 'white', marginLeft: 10, marginBottom: '0.5rem' } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f', marginLeft: 10, marginBottom: '0.5rem' }}
                >
                    Monitor
                </Button>
            </Box>

            <Box sx={contentStyle}>
                {activeTab === 'provisioning' && <Provisioning />}
                {activeTab === 'monitor' && <Monitor />}
            </Box>
        </Box>
    );
}

export default AdminPanel;
