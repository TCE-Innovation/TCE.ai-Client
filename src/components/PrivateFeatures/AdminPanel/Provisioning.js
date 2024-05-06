import React, { useState, useEffect } from 'react';
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
import { addUsersToTool } from '../../../data/SQL'; // Remove import for removeUsersFromTool
import { toolList } from '../../../admin/lists';

const Provisioning = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedTool, setSelectedTool] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getAllPersonnel();
            setUsers(allUsers);
        };
        fetchUsers();
    }, []);

    const handleUserChange = (event, newValue) => {
        setSelectedUsers(newValue);
    };

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
    };

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    const handleProvision = async () => {
        try {
            const results = await addUsersToTool(selectedUsers, selectedTool);
    
            let successUsers = '';
            let failureUsers = '';
    
            if (results.success.length > 0) {
                successUsers = results.success.map(user => user.name).join(', ');
            }
    
            if (results.failure.length > 0) {
                failureUsers = results.failure.map(failure => `${failure.user.name}: ${failure.reason}`).join(', ');
            }
    
            setSelectedUsers([]);
            setSelectedTool('');
            setSuccessMessage(successUsers ? `Successfully processed: ${successUsers}` : '');
            setErrorMessage(failureUsers ? `Failed to process: ${failureUsers}` : '');
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20, backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '5vw', width: '70%', justifyContent: 'center'}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '3vw', width: '100%'}}>
                    <Typography variant="subtitle1" sx={{ marginRight: 2, whiteSpace: 'nowrap' }}>
                        Add:
                    </Typography>
                    <Autocomplete
                        multiple
                        options={inputValue.length > 0 ? users : []} // Show options only when input value has characters
                        getOptionLabel={(option) => option.name}
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
                        To:
                    </Typography>
                    <FormControl fullWidth sx={{ flex: 1 }}>
                        <InputLabel>Select Tool</InputLabel>
                        <Select
                            value={selectedTool}
                            onChange={handleToolChange}
                            input={<OutlinedInput label="Select Tool" />}
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
            <Button
                variant="contained"
                onClick={handleProvision}
                style={{ backgroundColor: '#1b365f', color: 'white', marginTop: '5vw' }}
            >
                + Add
            </Button>
            {successMessage && (
                <Typography color="primary" variant="subtitle1" sx={{ marginTop: 2 }}>
                    {successMessage}
                </Typography>
            )}
            {errorMessage && (
                <Typography color="error" variant="subtitle1" sx={{ marginTop: 2 }}>
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};

export default Provisioning;
