import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, FormControl, Select, MenuItem, Autocomplete, TextField, Typography } from '@mui/material';
import { getUsersOfTool, removeUserFromTool, addUsersToTool, removeAllUsersFromTool, getProjectTeam } from '../../../data/SQL';
import { getAllPersonnel } from '../../../data/SQL';
import { getActiveProjects } from '../../../data/Airtable';

const toolNameMap = {
    'Email Generator': 'email_generator',
    'Cable Run Optimizer': 'cable_run_optimizer',
    'GO Tracker': 'go_tracker',
    'Schedule Dashboards': 'schedule_dashboards',
    'Tool Usage Stats': 'tool_usage',
};

const Provisioning = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [users, setUsers] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [searched, setSearched] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredPersonnelList, setFilteredPersonnelList] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [projectTeam, setProjectTeam] = useState([]);

    // Fetch all personnel
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

    // Fetch active projects
    useEffect(() => {
        const fetchActiveProjects = async () => {
            try {
                const projects = await getActiveProjects();
                // Filter the projects to only include those with status 'Active'
                const activeProjects = projects.filter(project => project.status === 'Active');
                setActiveProjects(activeProjects);
            } catch (error) {
                console.error('Error fetching active projects:', error);
            }
        };
        fetchActiveProjects();
    }, []);

    // Fetch users of a specific tool
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

    // Filter personnel
    useEffect(() => {
        const filterPersonnel = () => {
            // Get the list of personnel that are not in the currently selected tool
            const filteredPersonnelList = personnelList.filter(person =>
                !users.some(user => user.email === person.email)
            );
            setFilteredPersonnelList(filteredPersonnelList);
        };
        filterPersonnel();
    }, [users, selectedTool, personnelList]);

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    const handleRemoveUser = async (email) => {
        await removeUserFromTool(email, toolNameMap[selectedTool]);
        const removedUser = users.find(user => user.email === email);
        setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
        setPersonnelList(prevPersonnel => [...prevPersonnel, removedUser].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleAddUser = async () => {
        if (selectedUsers.length > 0) {
            await addUsersToTool(selectedUsers, toolNameMap[selectedTool]);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);

            setPersonnelList(prevPersonnel =>
                prevPersonnel.filter(person =>
                    !selectedUsers.some(user => user.email === person.email)
                )
            );

            setSelectedUsers([]);
            setInputValue('');
        }
    };

    const handleAddAll = async () => {
        if (filteredPersonnelList.length > 0) {
            await addUsersToTool(filteredPersonnelList, toolNameMap[selectedTool]);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);
            setPersonnelList([]);
        }
    };

    const handleRemoveAll = async () => {
        if (users.length > 0) {
            await removeAllUsersFromTool(toolNameMap[selectedTool]);
            setPersonnelList(prevPersonnel => [...prevPersonnel, ...users].sort((a, b) => a.name.localeCompare(b.name)));
            setUsers([]);
        }
    };

    const handleProjectChange = async (event) => {
        const projectName = event.target.value;
        setSelectedProject(projectName);
        const team = await getProjectTeam(projectName);
        setProjectTeam(team || []);  // Ensure projectTeam is always an array
    };

    const handleAddProjectTeam = async () => {
        if (projectTeam.length > 0) {
            await addUsersToTool(projectTeam, toolNameMap[selectedTool]);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);

            setPersonnelList(prevPersonnel =>
                prevPersonnel.filter(person =>
                    !projectTeam.some(user => user.email === person.email)
                )
            );

            setSelectedUsers([]);
            setInputValue('');
            setProjectTeam([]);
            setSelectedProject('');
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
                                style={{ marginBottom: '2rem', width: '45%', marginRight: '1vw' }}
                            />

                            <FormControl sx={{ marginBottom: '2rem', marginRight: '1vw', width: '20%' }}>
                                <Select
                                    value={selectedProject}
                                    onChange={handleProjectChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Add Project Team' }}
                                >
                                    <MenuItem value="" disabled>Add Project Team</MenuItem>
                                    {activeProjects.map((project, index) => (
                                        <MenuItem key={index} value={project.name}>{project.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

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

                        {selectedProject && projectTeam && projectTeam.length > 0 && (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginBottom: '2rem' }}>
                                <Typography variant="subtitle1" style={{ marginRight: '1vw' }}>
                                    {projectTeam.length} users from project "{selectedProject}" will be added.
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleAddProjectTeam}
                                    style={{
                                        backgroundColor: '#d7edd1',
                                        color: 'green',
                                        border: '1px solid green'
                                    }}
                                >
                                    Add {projectTeam.length} Users
                                </Button>
                            </Box>
                        )}

                        <TableContainer component={Paper} style={{ marginTop: '1.5vw', marginBottom: '1.5vw', maxHeight: '22vw' }}>
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
