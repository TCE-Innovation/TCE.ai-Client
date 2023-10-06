import React, { useState } from 'react';
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const ChatBot = () => {
    const [project, setProject] = useState('p4');

    //dropdown menu for project selection
    const handleChange = (event) => {
        setProject(event.target.value);
    };

    return (
        <Box    
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
                <FormControl variant="outlined" sx={{ mb: 4, width: 200 }}>
                    <InputLabel>Project</InputLabel>
                    <Select
                        value={project}
                        onChange={handleChange}
                        label="Project"
                    >
                        <MenuItem value="p4">Package 4</MenuItem>
                        <MenuItem value="ert">East River Tunnel Rehab</MenuItem>
                        <MenuItem value="fulton">Fulton</MenuItem>
                        <MenuItem value="psd">Platform Screen Doors</MenuItem>
                        {/* Add more projects as needed */}
                    </Select>
                </FormControl>

                {project==='ert' ? (
                    <iframe
                        src="https://ertbotchris.azurewebsites.net/"
                        width="100%"
                        height="750px"
                        title="TCIG Asset Tracker"
                        style={{ background: 'transparent', border: '1px solid #ccc' }}
                    ></iframe>
                ) : null}

                {project==='p4' ? (
                    <iframe
                        src="https://p4botaaron.azurewebsites.net/"
                        width="100%"
                        height="750px"
                        title="TCIG Asset Tracker"
                        style={{ background: 'transparent', border: '1px solid #ccc' }}
                    ></iframe>
                ) : null}

                {project==='fulton' ? (
                    <iframe
                        src="https://fultonbotchris.azurewebsites.net/"
                        width="100%"
                        height="750px"
                        title="TCIG Asset Tracker"
                        style={{ background: 'transparent', border: '1px solid #ccc' }}
                    ></iframe>
                ) : null}

                {project==='psd' ? (
                    <iframe
                        src="https://psdbotaaron.azurewebsites.net/"
                        width="100%"
                        height="750px"
                        title="TCIG Asset Tracker"
                        style={{ background: 'transparent', border: '1px solid #ccc' }}
                    ></iframe>
                ) : null}
        </Box>
    );
};

export default ChatBot;
