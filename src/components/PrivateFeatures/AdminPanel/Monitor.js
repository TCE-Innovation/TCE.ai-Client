import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, Box, OutlinedInput } from '@mui/material';
import { toolList } from '../../../admin/lists';
import { getUsersOfTool, removeUserFromTool } from '../../../data/SQL';

const toolNameMap = {
    'Chatbot': 'chatbot',
    'Email Generator': 'email_generator',
    'Cable Run Optimizer': 'cable_run_optimizer',
    'GO Tracker': 'go_tracker'
};

const Monitor = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [users, setUsers] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    const handleSearch = async () => {
        const sqlToolName = toolNameMap[selectedTool];
        if (sqlToolName) {
            const result = await getUsersOfTool(sqlToolName);
            setUsers(result);
            setSearched(true); 
        } else {
            console.error('Tool not found in map');
            setSearched(true); 
        }
    };

    const handleRemoveUser = async (email) => {
        // Call the SQL function to remove the user from the tool
        await removeUserFromTool(email, toolNameMap[selectedTool]);

        // Update the users state to reflect the removal
        setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignItems: 'center', marginTop: 20, backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '30px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '1vw', width: '70%', justifyContent: 'center' }}>
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
                        onClick={handleSearch}
                        style={{ backgroundColor: '#1b365f', color: 'white', marginLeft: 10 }}
                    >
                        Search
                    </Button>
                </Box>

                {users.length > 0 ? (
                    <TableContainer component={Paper} sx={{ maxHeight: 500, marginTop: 2 }}>
                        <Table stickyHeader aria-label="users table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Action</TableCell> {/* New column for the remove button */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Button 
                                                variant="contained" 
                                                onClick={() => handleRemoveUser(user.email)}
                                                style={{ border: '2px solid red', backgroundColor: '#f5f5f5', color: 'red' }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    searched && (
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            No users found
                        </Typography>
                    )
                )}
            </Box>
        </div>
    );
};

export default Monitor;
