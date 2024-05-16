import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, FormControl, Select, MenuItem } from '@mui/material';

const UserTable = ({ users, handleRemoveUser, selectedTool, userProjects, handleUserProjectChange, dashboardProjects }) => {
    return (
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
    );
};

export default UserTable;
