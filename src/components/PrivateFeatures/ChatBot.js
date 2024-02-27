//REACT
import React, { useState, useContext } from 'react';

//MUI
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TrainLoader from '../General/TrainLoader';

//AUTH
import { AuthContext } from "../../authentication/Auth";

//LISTS
import { allProjectsAccess } from '../../admin/lists';
import { projWithChatbot } from '../../admin/lists';

const ChatBot = () => {
    const [project, setProject] = useState('hr');
    const { userProjects, userEmail } = useContext(AuthContext);

    const [loadingStates, setLoadingStates] = useState({
        p4: true,
        hr: true,
    });

    const handleIframeLoad = (projectKey) => {
        setLoadingStates(prevStates => ({ ...prevStates, [projectKey]: false }));
    };

    const userProjKeys = [];

    if (userProjects !== undefined && userProjects !== null){
        if ('ADA Package 4' in userProjects || allProjectsAccess.includes(userEmail)) {
            userProjKeys.push('p4');
        }
        /* 
        if ('NEW PROJECT WITH CHATBOT' in userProjects || allProjectsAccess.includes(userName)) {
            userProjKeys.push('psd');
        }
        */
    }

    function findMatchingProjects(userProjects, chatbotProjects) {
        return userProjects.filter((project) => chatbotProjects.includes(project));
    }

    const matchingProjects = findMatchingProjects(userProjKeys, projWithChatbot);

    //dropdown menu for project selection
    const handleChange = (event) => {
        setProject(event.target.value);
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '750px',
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <FormControl variant="outlined" sx={{ mb: 2, width: 250 }}>
                <InputLabel>Project</InputLabel>
                <Select value={project} onChange={handleChange} label="Project">
                    <MenuItem value="hr">Human Resources</MenuItem>
                    {matchingProjects.map((projectKey) => (
                        <MenuItem key={projectKey} value={projectKey}>
                            {projectKey === 'p4' && 'Package 4'}
                            {/* Add more projects as needed */}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loadingStates[project] && (
                <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
            )}

            {project==='p4' && (
                <iframe
                    src="https://p4botaaron.azurewebsites.net/"
                    onLoad={() => handleIframeLoad('p4')}
                    width="100%"
                    height="750px"
                    title="Package 4 Bot"
                    style={{
                        background: 'transparent',
                        border: '1px solid #ccc',
                        display: loadingStates['p4'] ? 'none' : 'block',
                    }}
                ></iframe>
            )}

            {project==='hr' && (
                <iframe
                    src="https://hr-bot-1.azurewebsites.net/"
                    onLoad={() => handleIframeLoad('hr')}
                    width="100%"
                    height="750px"
                    title="HR Bot"
                    style={{
                        background: 'transparent',
                        border: '1px solid #ccc',
                        display: loadingStates['hr'] ? 'none' : 'block',
                    }}
                ></iframe>
            )}
            
        </Box>
    );
};

export default ChatBot;