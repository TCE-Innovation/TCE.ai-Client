import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, FormControl, Select, MenuItem, TextField, Box, Typography } from '@mui/material';

const UserTable = ({ users, handleRemoveUser, selectedTool, userProjects, handleUserProjectChange, dashboardProjects, provisionedCount, nonProvisionedCount }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const tableContainerRef = useRef(null);
    const userRefs = useRef([]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        if (searchQuery) {
            const index = users.findIndex(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase()));
            if (index !== -1 && userRefs.current[index]) {
                userRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [searchQuery, users]);

    // Sort users so that those with 'None' projects are at the top
    const sortedUsers = [...users].sort((a, b) => {
        const projectA = userProjects[a.email] || 'None';
        const projectB = userProjects[b.email] || 'None';
        if (projectA === 'None' && projectB !== 'None') return -1;
        if (projectA !== 'None' && projectB === 'None') return 1;
        return 0;
    });

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
                            {selectedTool === 'Schedule Dashboards' && <TableCell>Project</TableCell>}
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={selectedTool === 'Schedule Dashboards' ? 4 : 3} align="center">
                                    No Users in this Tool
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedUsers.map((user, index) => {
                                const isProjectNone = userProjects[user.email] === 'None';
                                return (
                                    <TableRow
                                        key={index}
                                        ref={el => userRefs.current[index] = el}
                                        style={{
                                            backgroundColor: selectedTool === 'Schedule Dashboards' && isProjectNone ? 'white' : 'inherit',
                                            color: selectedTool === 'Schedule Dashboards' && isProjectNone ? 'red' : 'inherit'
                                        }}
                                    >
                                        <TableCell style={{ color: selectedTool === 'Schedule Dashboards' && isProjectNone ? 'red' : 'inherit' }}>
                                            {user.name}
                                        </TableCell>
                                        <TableCell style={{ color: selectedTool === 'Schedule Dashboards' && isProjectNone ? 'red' : 'inherit' }}>
                                            {user.email}
                                        </TableCell>
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
