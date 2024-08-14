import React, { useState, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getUsageLog } from '../../../data/Airtable';

const Monitor = () => {
    const [usageLog, setUsageLog] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ sortField: 'Last Login (Date)', sortDirection: 'desc' });
    const [loading, setLoading] = useState(false);
    const tableContainerRef = useRef(null);
    const logRefs = useRef([]);

    const fetchData = async (sortField = 'Last Login (Date)', sortDirection = 'desc') => {
        setLoading(true);
        try {
            const data = await getUsageLog(sortField, sortDirection);
            setUsageLog(data);
        } catch (error) {
            console.error('Error fetching usage log:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(sortConfig.sortField, sortConfig.sortDirection);
    }, [sortConfig]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        if (searchQuery) {
            const index = usageLog.findIndex(log => log.name.toLowerCase().includes(searchQuery.toLowerCase()));
            if (index !== -1 && logRefs.current[index]) {
                logRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [searchQuery, usageLog]);

    const handleSortChange = (field) => {
        setSortConfig(prevConfig => {
            const isAsc = prevConfig.sortField === field && prevConfig.sortDirection === 'asc';
            return {
                sortField: field,
                sortDirection: isAsc ? 'desc' : 'asc'
            };
        });
    };

    const filteredUsageLog = usageLog.filter(log => 
        log.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box style={{ backgroundColor: "#f5f5f5", padding: "2vw", marginTop: '.5vw', borderRadius: "1vw" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom=".5vw">
                <TextField
                    label="Search Users"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ width: '70%' }}
                />
                <Box marginLeft="1vw" display="flex" alignItems="center">
                    <Typography variant="body1" style={{ marginRight: '1vw' }}>
                        Users Logged: {filteredUsageLog.length}
                    </Typography>
                    <IconButton onClick={() => fetchData(sortConfig.sortField, sortConfig.sortDirection)} color="primary">
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>
            <TableContainer component={Paper} ref={tableContainerRef} style={{ maxHeight: '30vw' }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="30vw">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => handleSortChange('Name')}>
                                    Name {sortConfig.sortField === 'Name' ? (sortConfig.sortDirection === 'asc' ? '↑' : '↓') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSortChange('Last Login (Date)')}>
                                    Last Login {sortConfig.sortField === 'Last Login (Date)' ? (sortConfig.sortDirection === 'asc' ? '↑' : '↓') : ''}
                                </TableCell>
                                <TableCell onClick={() => handleSortChange('Login Count')}>
                                    Login Count {sortConfig.sortField === 'Login Count' ? (sortConfig.sortDirection === 'asc' ? '↑' : '↓') : ''}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsageLog.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No Users Found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsageLog.map((log, index) => (
                                    <TableRow key={index} ref={el => logRefs.current[index] = el}>
                                        <TableCell>{log.name}</TableCell>
                                        <TableCell>{log.last_login}</TableCell>
                                        <TableCell>{log.login_count}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
        </Box>
    );
};

export default Monitor;
