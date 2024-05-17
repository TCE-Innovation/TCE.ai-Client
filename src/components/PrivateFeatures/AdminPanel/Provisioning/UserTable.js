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
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No Users in this Tool
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <TableRow key={index} ref={el => userRefs.current[index] = el}>
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
        </Box>
    );
};

export default UserTable;
