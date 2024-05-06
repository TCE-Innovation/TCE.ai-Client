import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// COMPONENTS
import Monitor from './Monitor';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('provisioning');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const contentStyle = {
        height: '700px',
        overflowY: 'auto', // Allows scrolling within the fixed size container if content overflows
    };

    return (
        <Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                <Button
                    variant={activeTab === 'monitor' ? 'contained' : 'outlined'}
                    onClick={() => handleTabChange('monitor')}
                    style={activeTab === 'monitor' ? { backgroundColor: '#1b365f', color: 'white', marginLeft: 10 } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f', marginLeft: 10 }}
                >
                    Monitor
                </Button>
            </Box>

            <Box sx={contentStyle}>
                 <Monitor />
            </Box>
        </Box>
    );
}

export default AdminPanel;
