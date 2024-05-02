import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { getAllPersonnel } from '../../../data/Airtable';
import { toolList } from '../../../admin/lists';

const users = await getAllPersonnel();

const Provisioning = () => {
    const [action, setAction] = useState('add');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedTools, setSelectedTools] = useState([]);
    const [inputValue, setInputValue] = useState(''); // State to track input value

    const handleUserChange = (event, newValue) => {
        setSelectedUsers(newValue);
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleToolChange = (event) => {
        setSelectedTools(event.target.value);
    };

    const handleActionChange = (newAction) => {
        setAction(newAction);
        setSelectedUsers([]);
        setSelectedTools([]);
    };

        // Example functions (define these properly or import them if they're defined elsewhere)
        const addUsersToTool = (users, tools) => {
            console.log('Adding', users, 'to', tools);
            // Implement addition logic here
        };
    
        const removeUsersFromTool = (users, tools) => {
            console.log('Removing', users, 'from', tools);
            // Implement removal logic here
        };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', marginTop: 100 }}>
            <div style={{ marginTop: 20 }}>
                <Button
                    variant={action === 'add' ? 'contained' : 'outlined'}
                    onClick={() => handleActionChange('add')}
                    style={action === 'add' ? { backgroundColor: '#1b365f', color: 'white', marginRight: '10px' } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f', marginRight: 10 }}
                >
                    Add Users
                </Button>
                <Button
                    variant={action === 'remove' ? 'contained' : 'outlined'}
                    onClick={() => handleActionChange('remove')}
                    style={action === 'remove' ? { backgroundColor: '#1b365f', color: 'white' } : { backgroundColor: 'white', color: '#1b365f', border: '1px solid #1b365f' }}
                >
                    Remove Users
                </Button>
            </div>

            {(action === 'add' || action === 'remove') && (
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5vw', width: '70%', justifyContent: 'center'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '3vw', width: '100%'}}>
                        <Typography variant="subtitle1" sx={{ marginRight: 2, whiteSpace: 'nowrap' }}>
                            {action === 'add' ? 'Add the following user(s):' : 'Remove the following user(s):'}
                        </Typography>
                        <Autocomplete
                            multiple
                            options={inputValue.length > 0 ? users : []} // Show options only when input value has characters
                            getOptionLabel={(option) => option}
                            value={selectedUsers}
                            onChange={handleUserChange}
                            onInputChange={handleInputChange} // Update the input value
                            renderInput={(params) => (
                                <TextField {...params} label="Select Users" placeholder="Search Users" />
                            )}
                            noOptionsText={inputValue ? 'No options' : 'Start typing to search'}
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <Typography variant="subtitle1" sx={{ marginRight: 2, whiteSpace: 'nowrap' }}>
                            {action === 'add' ? 'to the following tool(s):' : 'from the following tool(s):'}
                        </Typography>
                        <FormControl fullWidth sx={{ flex: 1 }}>
                            <InputLabel>Select Tools</InputLabel>
                            <Select
                                multiple
                                value={selectedTools}
                                onChange={handleToolChange}
                                input={<OutlinedInput label="Select Tools" />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {toolList.map((tool, index) => (
                                    <MenuItem key={index} value={tool}>
                                        {tool}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            )}
            <Button
                variant="contained"
                onClick={() => action === 'add' ? addUsersToTool(selectedUsers, selectedTools) : removeUsersFromTool(selectedUsers, selectedTools)}
                style={{ backgroundColor: '#1b365f', color: 'white', marginTop: '5vw' }}
            >
                {action === 'add' ? '+ Add' : 'x Remove'}
            </Button>
        </div>
    );
};

export default Provisioning;
