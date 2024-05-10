import React, { useState, useEffect } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, FormControl, Select, MenuItem, Autocomplete, TextField, Typography} from '@mui/material';
import {getUsersOfTool, removeUserFromTool, addUsersToTool, removeAllUsersFromTool} from '../../../data/SQL';
import { getAllPersonnel } from '../../../data/Airtable';

const toolNameMap = {
    'Chatbot': 'chatbot',
    'Email Generator': 'email_generator',
    'Cable Run Optimizer': 'cable_run_optimizer',
    'GO Tracker': 'go_tracker',
    'Tool Usage Statistics': 'tool_usage',
    'PBI Dashboards': 'pbi_dashboards',
};

const Provisioning = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [users, setUsers] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [filteredPersonnelList, setFilteredPersonnelList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        async function fetchPersonnelList() {
            try {
                const personnel = await getAllPersonnel();
                setPersonnelList(personnel);
                setFilteredPersonnelList(personnel);  // Initialize with full list
            } catch (error) {
                console.error('Error fetching personnel list:', error);
            }
        }
        fetchPersonnelList();
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            if (selectedTool) {
                setUsers([]);  // Clear previous users immediately when tool changes
                setSearched(false);
                try {
                    const sqlToolName = toolNameMap[selectedTool];
                    const result = await getUsersOfTool(sqlToolName);
                    setUsers(result);
                    setSearched(true);
                } catch (error) {
                    console.error('Error fetching users for tool:', error);
                    setSearched(true);
                }
            }
        }
        fetchUsers();
    }, [selectedTool]);  // Removed personnelList from dependency array

    useEffect(() => {
        // Update filtered list only when users or personnel list is changed
        const newFilteredPersonnel = personnelList.filter(person => 
            !users.some(user => user.email === person.email));
        setFilteredPersonnelList(newFilteredPersonnel);
    }, [personnelList, users]);  // Separate useEffect to control update timing

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
        setSelectedUsers([]);
        setInputValue('');
    };

    const handleAddUser = async () => {
        if (selectedUsers.length > 0) {
            await addUsersToTool(selectedUsers, toolNameMap[selectedTool]);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);

            const newPersonnelList = personnelList.filter(person => 
                !selectedUsers.some(user => user.email === person.email));
            setPersonnelList(newPersonnelList);
            setFilteredPersonnelList(newPersonnelList);
            setSelectedUsers([]);
            setInputValue('');
        }
    };

    const handleRemoveUser = async (email) => {
        await removeUserFromTool(email, toolNameMap[selectedTool]);
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);

        const removedUser = personnelList.find(person => person.email === email);
        if (removedUser) {
            setPersonnelList([...personnelList, removedUser]);
            setFilteredPersonnelList([...filteredPersonnelList, removedUser]);
        }
    };

    const handleAddAll = async () => {
        if (filteredPersonnelList.length > 0) {
            await addUsersToTool(filteredPersonnelList, toolNameMap[selectedTool]);
            setUsers(filteredPersonnelList);
            setFilteredPersonnelList([]);
            setPersonnelList(personnelList.filter(person => 
                !filteredPersonnelList.some(user => user.email === person.email)));
        }
    };

    const handleRemoveAll = async () => {
        if (users.length > 0) {
            await removeAllUsersFromTool(toolNameMap[selectedTool]);
            setPersonnelList([...personnelList, ...users]);
            setFilteredPersonnelList([...personnelList, ...users]);
            setUsers([]);
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 10, backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <Box sx={{ width: '70%', padding: 2 }}>
                <FormControl fullWidth sx={{ marginBottom: '.5rem' }}>
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
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Autocomplete
                                value={selectedUsers}
                                onChange={(event, newValue) => setSelectedUsers(newValue)}
                                multiple
                                options={filteredPersonnelList}
                                getOptionLabel={(option) => option.name}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                                filterOptions={(options, state) =>
                                    state.inputValue.length >= 1
                                        ? options.filter(option => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))
                                        : []
                                }
                                noOptionsText={inputValue.length < 1 ? "Start typing to search" : "No options"}
                                renderInput={(params) => <TextField {...params} label="Add User(s)" />}
                                style={{ marginBottom: '2rem', width: '67%', marginRight: '1vw' }}
                            />

                            <Button
                                variant="contained"
                                onClick={handleAddUser}
                                disabled={selectedUsers.length === 0}
                                style={{
                                    backgroundColor: selectedUsers.length > 0 ? '#d7edd1' : 'gray',
                                    color: selectedUsers.length > 0 ? 'green' : 'white',
                                    border: selectedUsers.length > 0 ? '1px solid green' : 'white',
                                    marginBottom: '2rem',
                                    marginRight: '1vw'
                                }}
                            >
                                Add
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleAddAll}
                                disabled={filteredPersonnelList.length === 0}
                                style={{
                                    backgroundColor: filteredPersonnelList.length > 0 ? '#d7edd1' : 'gray',
                                    color: filteredPersonnelList.length > 0 ? 'green' : 'white',
                                    border: filteredPersonnelList.length > 0 ? '1px solid green' : 'white',
                                    marginBottom: '2rem',
                                    marginRight: '1vw'
                                }}
                            >
                                Add All
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleRemoveAll}
                                disabled={users.length === 0}
                                style={{
                                    backgroundColor: users.length > 0 ? '#fad9d9' : 'gray',
                                    color: users.length > 0 ? 'red' : 'white',
                                    border: users.length > 0 ? '1px solid red' : 'white',
                                    marginBottom: '2rem'
                                }}
                            >
                                Remove All
                            </Button>
                        </Box>

                        <TableContainer component={Paper} style={{marginTop: '1.5vw', marginBottom: '1.5vw', maxHeight: '22vw'}}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No Users in this Tool
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        users.map((user, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => handleRemoveUser(user.email)}
                                                        style={{ backgroundColor: '#fad9d9', color: 'red', border: '1px solid red' }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant="subtitle1">
                            {users.length} Provisioned Users | {filteredPersonnelList.length} Non-Provisioned Users
                        </Typography>
                    </>
                )}
            </Box>
        </div>
    );
};

export default Provisioning;
