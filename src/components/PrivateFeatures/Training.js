import React, { useState, useEffect } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getTrainingLink } from '../../data/Airtable';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const TrainingPage = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [data, setData] = useState({});
    const [roles, setRoles] = useState([]);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [filteredTools, setFilteredTools] = useState([]);

    useEffect(() => {
        async function fetchTrainingLinks() {
            try {
                const data = await getTrainingLink();
                setData(data);
                const tools = Object.keys(data);
                setFilteredTools(tools);
                if (tools.length > 0) {
                    setSelectedTool(tools[0]);
                } else {
                    setSelectedTool('');
                }
            } catch (error) {
                console.error('Error fetching training links:', error);
            }
        }
        fetchTrainingLinks();
    }, []);

    useEffect(() => {
        if (data[selectedTool]) {
            const extractedRoles = data[selectedTool].map(item => item.role).filter(role => role); // Extract roles
            setRoles(extractedRoles);
    
            if (extractedRoles.length > 0) {
                setSelectedRole(extractedRoles[0]);
            } else {
                setSelectedRole('');
            }
        } else {
            setRoles([]);
            setSelectedRole('');
        }
    }, [selectedTool, data]);

    useEffect(() => {
        if (data[selectedTool]) {
            const selectedRoleData = data[selectedTool].find(item => item.role === selectedRole);
            setIframeLink(selectedRoleData?.trainingLink || '');
        } else {
            setIframeLink('');
        }
    }, [selectedRole, data, selectedTool]);

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column" }}>
            {!iframeLoaded && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            <Box sx={{ width: '100%', display: 'flex', marginBottom: 2 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="tool-label">Tool</InputLabel>
                    <Select
                        labelId="tool-label"
                        id="tool-select"
                        value={selectedTool}
                        onChange={handleToolChange}
                        label="Tool"
                    >
                        {filteredTools.map((tool) => (
                            <MenuItem key={tool} value={tool}>{tool}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {roles.length > 0 && (
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role-select"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            label="Role"
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>
            {iframeLink && (
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '75vh', margin: 'auto' }}>
                    <iframe
                        onLoad={handleIframeLoad}
                        src={iframeLink}
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                        title="Training"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default TrainingPage;
