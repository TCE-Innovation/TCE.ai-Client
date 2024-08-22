import React, { useState, useEffect, useContext } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getTrainingLink } from '../../data/Airtable';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { AuthContext } from "../../authentication/Auth";

const TrainingPage = () => {
    const [tools, setTools] = useState([]);
    const [roles, setRoles] = useState([]);
    const [selectedTool, setSelectedTool] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [trainingLink, setTrainingLink] = useState('');

    const { userEmail } = useContext(AuthContext);

    useEffect(() => {
        const fetchTrainingLinks = async () => {
            try {
                const data = await getTrainingLink(selectedTool);
                console.log(data);
                setTools(['Procore']);
                setRoles(data);
            } catch (error) {
                console.error('Error fetching training links:', error);
            }
        };
        fetchTrainingLinks();
    }, []);

    const handleToolChange = (event) => {
        const tool = 'Procore'
        setSelectedTool(tool);
        setRoles(Object.keys(tools[tool]));
        setSelectedRole('');
        setTrainingLink('');
    };

    const handleRoleChange = (event) => {
        const role = event.target.value;
        setSelectedRole(role);
        setTrainingLink(tools[selectedTool][role]);
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
                        {Object.keys(tools).map((tool) => (
                            <MenuItem key={tool} value={tool}>{tool}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {selectedTool && (
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
            {trainingLink && (
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '75vh', margin: 'auto' }}>
                    <iframe
                        onLoad={handleIframeLoad}
                        src={trainingLink}
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                        title="Training"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default TrainingPage;
