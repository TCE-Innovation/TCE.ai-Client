import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, FormControl, Select, MenuItem, TextField, Box, Typography, Checkbox } from '@mui/material';

const UserTable = ({ users, handleRemoveUser, selectedTool, userProjects, handleUserProjectChange, dashboardProjects, provisionedCount, nonProvisionedCount }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [flashColor, setFlashColor] = useState({});
    const [projects, setProjects] = useState([]);
    const [userSelection, setUserSelection] = useState({});
    const tableContainerRef = useRef(null);
    const userRefs = useRef([]);

    // Tools that require a project column
    const requiresProjectColumn = [
        'Schedule Dashboards',
        'Drone Captures',
    ];

    // Projects that are in PIX4D
    const droneProjects = useMemo(() => [
        '207th Street Yard',
        'Rockaways',
    ], []);

    // function to get a user's projects given their emails
    const getUserSelectedProjects = (userEmail) => {
        if (!Array.isArray(userProjects)) { 
            console.error('userProjects is not an array', userProjects);
            return [];
        }
        const userProjectEntry = userProjects.find(obj => obj.email === userEmail);
        return userProjectEntry ? userProjectEntry.projects : [];
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleProjectChange = (userEmail, event) => {
        const selectedProjects = event.target.value;
        if (Array.isArray(selectedProjects)) {
            handleUserProjectChange(userEmail, selectedProjects.join(', '));
        } else {
            console.error("Selected projects is not an array", selectedProjects);
        }
    };

    const handleSelectAll = (userEmail) => {
        handleUserProjectChange(userEmail, projects.join(', '));
    };

    const handleDeselectAll = (userEmail) => {
        handleUserProjectChange(userEmail, '');
    };

    const isAllSelected = (userEmail) => {
        return userSelection[userEmail] || false;
    };

    const handleAssignOrRemoveAllProjects = (userEmail) => {
        if (isAllSelected(userEmail)) {
            handleDeselectAll(userEmail);
        } else {
            handleSelectAll(userEmail);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            const index = users.findIndex(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()));
            if (index !== -1 && userRefs.current[index]) {
                userRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [searchQuery, users]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFlashColor(prev => {
                const newFlashColor = {};
                users.forEach(user => {
                    newFlashColor[user.email] = !prev[user.email];
                });
                return newFlashColor;
            });
        }, 1000); // Change color every 1000ms

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [users]);

    useEffect(() => {
        if (selectedTool === 'Schedule Dashboards') {
            setProjects(dashboardProjects);
        } else if (selectedTool === 'Drone Captures') {
            setProjects(droneProjects);
        } else {
            setProjects([]);
        }
    }, [selectedTool, dashboardProjects, droneProjects]);

    useEffect(() => {
        const updatedUserSelection = {};
        users.forEach(user => {
            const userProjectEntry = userProjects.find(u => u.email === user.email);
            const userProjectsList = userProjectEntry ? userProjectEntry.projects : [];
            updatedUserSelection[user.email] = projects.length > 0 && userProjectsList.length === projects.length;
        })
        setUserSelection(updatedUserSelection);
    }, [projects, userProjects, users]);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom=".5vw">
                <TextField
                    label="Search Provisioned Users"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '70%' }}
                />
                <Box marginLeft="1vw" display="flex" alignItems="center">
                    <Typography variant="body1" style={{ marginRight: '1vw' }}>
                        Provisioned: {provisionedCount} | Non-Provisioned: {nonProvisionedCount}
                    </Typography>
                </Box>
            </Box>
            <TableContainer component={Paper} ref={tableContainerRef} style={{ maxHeight: '22vw' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            {requiresProjectColumn.includes(selectedTool) && <TableCell style={{ width: '300px' }}>Project</TableCell>}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={requiresProjectColumn.includes(selectedTool) ? 4 : 3} align="center">
                                    No Users in this Tool
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => {
                                const userSelectedProjects = getUserSelectedProjects(user.email);
                                return (
                                    <TableRow
                                        key={user.email}
                                        ref={el => userRefs.current[index] = el}
                                        style={{
                                            backgroundColor: requiresProjectColumn.includes(selectedTool) && userSelectedProjects.length === 0 ? 'white' : 'inherit'
                                        }}
                                    >
                                        <TableCell style={{
                                            color: requiresProjectColumn.includes(selectedTool) && userSelectedProjects.length === 0 ? (flashColor[user.email] ? 'red' : 'black') : 'inherit'
                                        }}>
                                            {user.name}
                                        </TableCell>
                                        <TableCell style={{
                                            color: requiresProjectColumn.includes(selectedTool) && userSelectedProjects.length === 0 ? (flashColor[user.email] ? 'red' : 'black') : 'inherit'
                                        }}>
                                            {user.email}
                                        </TableCell>
                                        {requiresProjectColumn.includes(selectedTool) && (
                                            <TableCell style={{ width: '300px' }}>
                                                <Box display="flex" alignItems="center" gap="0.5rem">
                                                    <FormControl fullWidth>
                                                        <Select
                                                            displayEmpty
                                                            inputProps={{ 'aria-label': 'Select Project' }}
                                                            style={{ minWidth: '250px', maxWidth: '250px' }} // Ensure button size consistency
                                                            multiple
                                                            value={userSelectedProjects}
                                                            onChange={(event) => handleProjectChange(user.email, event)}
                                                            renderValue={(selected) => {
                                                                // Join selected values with comma and space
                                                                if (selected.length === 0) {
                                                                    return "None";
                                                                } else if (selected.length === projects.length) {
                                                                    return "All"
                                                                }
                                                                return selected.join(', ');
                                                            }}
                                                        >
                                                            <MenuItem value="" disabled>Select Project</MenuItem>
                                                            {projects.map((project, index) => (
                                                                <MenuItem key={index} value={project}>
                                                                    <Checkbox checked={userSelectedProjects.includes(project)} />
                                                                    {project}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color={isAllSelected(user.email) ? 'secondary' : 'primary'}
                                                        onClick={() => handleAssignOrRemoveAllProjects(user.email)}
                                                        style={{ minWidth: '120px', height: '50px' }} // Ensure button size consistency
                                                    >
                                                        {isAllSelected(user.email) ? 'Deselect All' : 'Select All'}
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => handleRemoveUser(user.email)}
                                                style={{ backgroundColor: '#fad9d9', color: 'red', border: '1px solid red', minWidth: '80px' }} // Ensure button size consistency
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserTable;