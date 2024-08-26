import React, { useState, useEffect, useContext } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getTrainingLink } from '../../data/Airtable';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { AuthContext } from "../../authentication/Auth";

const toolMap = {
    'Procore': ['Doc Control', 'Engineer', 'Quality Manager', 'Safety Engineer'],
    'OpenSpace' : [],
};

const trainingIframeMap = {
    'Doc Control': "https://scribehow.com/page-embed/Document_Controller_SOP_for_Using_Procore_Construction_Project_Management_Software__Cgsp0kyNTp6QRqg6OO9gSg",
    'Engineer': "https://scribehow.com/page-embed/Engineer_SOP_for_Using_Procore_Construction_Project_Management_Software__3Rv5ubP7TqaxLF438PEN_A",
    'Quality Manager': "https://scribehow.com/page-embed/Quality_Manager_SOP_for_Using_Procore_Construction_Project_Management_Software__XP9W64YmRaKoqnju_mk-fQ",
    'Safety Engineer': "https://scribehow.com/page-embed/Safety_Engineer_SOP_for_Using_Procore_Construction_Project_Management_Software__wy6yH2eQSJapHpABDWa8Ug",
};

const TrainingPage = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [roles, setRoles] = useState([]);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [filteredTools, setFilteredTools] = useState([]);

    useEffect(() => {
        const fetchTrainingLinks = async () => {
            try {
                //const data = await getTrainingLink(selectedTool);
                const tools = Object.keys(toolMap);
                setFilteredTools(tools);
                if (tools.length > 0) {
                    setSelectedTool(tools[0]);
                }
            } catch (error) {
                console.error('Error fetching training links:', error);
            }
        };
        fetchTrainingLinks();
    }, []);

    useEffect(() => {
        setRoles(toolMap[selectedTool] || []);
        setSelectedRole(toolMap[selectedTool]?.[0] || '');
    }, [selectedTool]);


    useEffect(() => {
        setIframeLink(trainingIframeMap[selectedRole] || '');
    }, [selectedRole]);

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
                {roles.length > 1 && (
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
