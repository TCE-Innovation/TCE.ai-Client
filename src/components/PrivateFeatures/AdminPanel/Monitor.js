import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';


import { toolList } from '../../../admin/lists';
import { getUsersOfTool } from '../../../data/SQL';

const Monitor = () => {
    const [selectedTool, setSelectedTool] = useState([]);

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', marginTop: 20, backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '30px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1vw', width: '70%', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <FormControl fullWidth sx={{ flex: 1 }}>
                            <InputLabel>Select Tool</InputLabel>
                            <Select
                                value={selectedTool}
                                onChange={handleToolChange}
                                input={<OutlinedInput label="Select Tools" />}
                            >
                                {toolList.map((tool, index) => (
                                    <MenuItem key={index} value={tool}>
                                        {tool}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button 
                            variant="contained" 
                            onClick={() => getUsersOfTool(selectedTool)}
                            style={{ backgroundColor: '#1b365f', color: 'white', marginLeft: 10 }}
                        >
                            Search
                        </Button>
                    </Box>
                    <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                        * Under Construction *
                    </Typography>
                </Box>
        </div>
    );
};

export default Monitor;
