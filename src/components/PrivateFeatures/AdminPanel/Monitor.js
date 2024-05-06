import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { getUsersOfTool, removeUserFromTool, addUserToTool } from '../../../data/SQL';
import { getAllPersonnel } from '../../../data/Airtable';

const toolNameMap = {
    'Chatbot': 'chatbot',
    'Email Generator': 'email_generator',
    'Cable Run Optimizer': 'cable_run_optimizer',
    'GO Tracker': 'go_tracker'
};

const Monitor = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [users, setUsers] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            if (selectedTool) {
                const sqlToolName = toolNameMap[selectedTool];
                if (sqlToolName) {
                    const result = await getUsersOfTool(sqlToolName);
                    setUsers(result);
                    setSearched(true);
                } else {
                    console.error('Tool not found in map');
                }
            }
        };
        fetchUsers();
    }, [selectedTool]);

    useEffect(() => {
        const fetchPersonnelList = async () => {
            try {
                const personnel = await getAllPersonnel();
                setPersonnelList(personnel);
            } catch (error) {
                console.error('Error fetching personnel list:', error);
            }
        };
        fetchPersonnelList();
    }, []);

    const handleRemoveUser = async (email) => {
        await removeUserFromTool(email, toolNameMap[selectedTool]);
        setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
    };

    const handleAddUser = async (user) => {
        try {
            await addUserToTool(user, toolNameMap[selectedTool]);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);
    
            // Remove the added user from the personnelList
            setPersonnelList(prevPersonnel => prevPersonnel.filter(person => person.email !== user.email));
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
            <Box sx={{ width: '70%', padding: 2 }}>
                <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                    <Select
                        value={selectedTool}
                        onChange={handleToolChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Select Tool' }}
                    >
                        <MenuItem value="" disabled>Select Tool</MenuItem>
                        {Object.keys(toolNameMap).map((tool, index) => (
                            <MenuItem key={index} value={tool}>{tool}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {searched && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={3} style={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle1" >Existing Users:</Typography>
                                    </TableCell>
                                </TableRow>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                onClick={() => handleRemoveUser(user.email)}
                                                style={{ backgroundColor: 'white', color: 'red', border: '1px solid red'}}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={3} style={{ backgroundColor: '#f5f5f5' }}>
                                        <Typography variant="subtitle1">Add Users:</Typography>
                                    </TableCell>
                                </TableRow>
                                {personnelList.map((person, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.email}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                onClick={() => handleAddUser(person)}
                                                style={{ backgroundColor: 'white', color: 'green', border: '1px solid green'}}
                                            >
                                                Add
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </div>
    );
};

export default Monitor;
