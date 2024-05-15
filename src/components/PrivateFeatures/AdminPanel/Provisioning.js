import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, FormControl, Select, MenuItem, Autocomplete, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { getUsersOfTool, removeUserFromTool, addUsersToTool, removeAllUsersFromTool, getProjectTeam, updateUserProject, getUserProjectSD } from '../../../data/SQL';
import { getAllPersonnel } from '../../../data/SQL';
import { getActiveProjects, getPBILog } from '../../../data/Airtable';

import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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
    const [openAddAllDialog, setOpenAddAllDialog] = useState(false);
    const [openRemoveAllDialog, setOpenRemoveAllDialog] = useState(false);
    const [userProjects, setUserProjects] = useState({});
    const [dashboardProjects, setDashboardProjects] = useState([]);

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

    // Fetch user project for scheduling dashboard
    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const projects = await getUserProjectSD();
                const projectMap = projects.reduce((acc, project) => {
                    acc[project.email] = project.projects;
                    return acc;
                }, {});
                setUserProjects(projectMap);
            } catch (error) {
                console.error('Error fetching user projects:', error);
            }
        };

        fetchUserProjects();
    }, []);

// Fetch project options for scheduling dashboard
useEffect(() => {
    const fetchProjects = async () => {
        try {
            const data = await getPBILog();
            let projectOptions = Object.keys(data);
            projectOptions = ["All", "None", ...projectOptions];
            setDashboardProjects(projectOptions);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    fetchProjects();
}, []);

    const handleRemoveUser = async (email) => {
        await removeUserFromTool(email, toolNameMap[selectedTool]);
        const removedUser = users.find(user => user.email === email);
        setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
        setPersonnelList(prevPersonnel => [...prevPersonnel, removedUser].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleAddUser = async () => {
        if (selectedUsers.length > 0) {
            await addUsersToTool(selectedUsers, toolNameMap[selectedTool], 'None');
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

    const handleOpenAddAllDialog = () => {
        setOpenAddAllDialog(true);
    };

    const handleCloseAddAllDialog = () => {
        setOpenAddAllDialog(false);
    };

    const handleConfirmAddAll = async () => {
        await addUsersToTool(filteredPersonnelList, toolNameMap[selectedTool]);
        const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
        setUsers(updatedUsers);
        setPersonnelList([]);
        setOpenAddAllDialog(false);
    };

    const handleOpenRemoveAllDialog = () => {
        setOpenRemoveAllDialog(true);
    };

    const handleCloseRemoveAllDialog = () => {
        setOpenRemoveAllDialog(false);
    };

    const handleConfirmRemoveAll = async () => {
        await removeAllUsersFromTool(toolNameMap[selectedTool]);
        setUsers([]);
        setPersonnelList(personnelList);
        setOpenRemoveAllDialog(false);
    };

    const handleProjectChange = async (event) => {
        setSelectedProject(event.target.value);
        try {
            const team = await getProjectTeam(event.target.value);
            setProjectTeam(team);
        } catch (error) {
            console.error('Error fetching project team:', error);
        }
    };

    const handleCancelProjectSelection = () => {
        setSelectedProject('');
        setProjectTeam([]);
    };

    const handleAddProjectTeam = async () => {
        if (projectTeam.length > 0) {
            const projectToAdd = dashboardProjects.includes(selectedProject) ? selectedProject : 'None';
            await addUsersToTool(projectTeam, toolNameMap[selectedTool], projectToAdd);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);
    
            setPersonnelList(prevPersonnel =>
                prevPersonnel.filter(person =>
                    !projectTeam.some(user => user.email === person.email)
                )
            );
    
            setSelectedProject('');
            setProjectTeam([]);
        }
    };

    const handleUserProjectChange = async (email, project) => {
        try {
            await updateUserProject(email, project);
            setUserProjects(prevProjects => ({ ...prevProjects, [email]: project }));
        } catch (error) {
            console.error('Error updating user project:', error);
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
                                onClick={handleOpenAddAllDialog}
                                disabled={filteredPersonnelList.length === 0}
                                style={{
                                    backgroundColor: filteredPersonnelList.length > 0 ? '#d7edd1' : 'gray',
                                    color: filteredPersonnelList.length > 0 ? 'green' : 'white',
                                    border: filteredPersonnelList.length > 0 ? '1px solid green' : 'white',
                                    marginBottom: '2rem',
                                    marginRight: '1vw',
                                    whiteSpace:'nowrap'
                                }}
                            >
                                Add All
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleOpenRemoveAllDialog}
                                disabled={users.length === 0}
                                style={{
                                    backgroundColor: users.length > 0 ? '#fad9d9' : 'gray',
                                    color: users.length > 0 ? 'red' : 'white',
                                    border: users.length > 0 ? '1px solid red' : 'white',
                                    marginBottom: '2rem',
                                    whiteSpace:'nowrap'
                                }}
                            >
                                Remove All
                            </Button>
                        </Box>

                        <Dialog
                            open={openAddAllDialog}
                            onClose={handleCloseAddAllDialog}
                            aria-labelledby="add-all-dialog-title"
                            aria-describedby="add-all-dialog-description"
                        >
                            <DialogTitle id="add-all-dialog-title">Confirm Add All</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="add-all-dialog-description">
                                    Are you sure you want to add {filteredPersonnelList.length} people to {selectedTool}?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseAddAllDialog} style={{color:"#1b365f"}}>Cancel</Button>
                                <Button onClick={handleConfirmAddAll} style={{color:"#1b365f"}}>Confirm</Button>
                            </DialogActions>
                        </Dialog>

                        <Dialog
                            open={openRemoveAllDialog}
                            onClose={handleCloseRemoveAllDialog}
                            aria-labelledby="remove-all-dialog-title"
                            aria-describedby="remove-all-dialog-description"
                        >
                            <DialogTitle id="remove-all-dialog-title">Confirm Remove All</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="remove-all-dialog-description">
                                    Are you sure you want to remove all {users.length} users from {selectedTool}?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseRemoveAllDialog} style={{color:"#1b365f"}}>Cancel</Button>
                                <Button onClick={handleConfirmRemoveAll} style={{color:"#1b365f"}}>Confirm</Button>
                            </DialogActions>
                        </Dialog>

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
                                <IconButton
                                    onClick={handleCancelProjectSelection}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'black',
                                        marginLeft: '1vw'
                                    }}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        )}

                        <TableContainer component={Paper} style={{ marginTop: '1.5vw', marginBottom: '1.5vw', maxHeight: '22vw' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        {selectedTool === 'Schedule Dashboards' && <TableCell>Project</TableCell>}
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
                                                {selectedTool === 'Schedule Dashboards' && (
                                                    <TableCell>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                value={userProjects[user.email] || 'None'}
                                                                onChange={(event) => handleUserProjectChange(user.email, event.target.value)}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'Select Project' }}
                                                            >
                                                                <MenuItem value="" disabled>Select Project</MenuItem>
                                                                {dashboardProjects.map((project, index) => (
                                                                    <MenuItem key={index} value={project}>{project}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                )}
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
