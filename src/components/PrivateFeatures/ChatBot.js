import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { CircularProgress } from '@mui/material';

//AUTH
import { AuthContext } from "../../authentication/Auth";


const ChatBot = () => {
    const [project, setProject] = useState('hr');
    const { userProjects, userName } = useContext(AuthContext);

    const [loadingStates, setLoadingStates] = useState({
        fulton: true,
        ert: true,
        p4: true,
        psd: true,
        hr: true,
    });

    const handleIframeLoad = (projectKey) => {
        setLoadingStates(prevStates => ({ ...prevStates, [projectKey]: false }));
    };

    const userProjKeys = [];
    const allProjectsAccess = [
        "Matthew Bayne",
        "Jacob Shavel",
        "Chris Dawson",
        "Hector Lim"
    ]

    if (userProjects !== undefined){
        if ('ADA Package 4' in userProjects || allProjectsAccess.includes(userName)) {
            userProjKeys.push('p4');
        }
        if ('Amtrak ERT' in userProjects || allProjectsAccess.includes(userName)) {
            userProjKeys.push('ert');
        }
        if ('CBTC Fulton Line' in userProjects || allProjectsAccess.includes(userName)) {
            userProjKeys.push('fulton');
        }
        if ('DB Platform Screen Door Pilot Installation' in userProjects || allProjectsAccess.includes(userName)) {
            userProjKeys.push('psd');
        }
        /* 
        if ('NEW PROJECT WITH CHATBOT' in userProjects || allProjectsAccess.includes(userName)) {
            userProjKeys.push('psd');
        }
        */
    }

    const projWithChatbot = ['p4', 'ert', 'fulton', 'psd'];

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
                            {projectKey === 'psd' && 'Platform Screen Doors'}
                            {projectKey === 'fulton' && 'Fulton'}
                            {projectKey === 'ert' && 'East River Tunnel Rehab'}
                            {/* Add more projects as needed */}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loadingStates[project] && (
                <div style={spinnerContainerStyle}>
                    <CircularProgress />
                </div>
            )}

            {project==='fulton' && (
                <iframe 
                    src="https://fultonbotchris.azurewebsites.net" 
                    onLoad={() => handleIframeLoad('fulton')}
                    width="100%" 
                    height="750"
                    title="Fulton Bot"
                    style={{
                        background: 'transparent',
                        border: '1px solid #ccc',
                        display: loadingStates['fulton'] ? 'none' : 'block',
                    }}
                ></iframe>
            )}

            {project==='ert' && (
                <iframe
                    src="https://ertbotchris.azurewebsites.net/"
                    onLoad={() => handleIframeLoad('ert')}
                    width="100%"
                    height="750px"
                    title="ERT Bot"
                    style={{
                        background: 'transparent',
                        border: '1px solid #ccc',
                        display: loadingStates['ert'] ? 'none' : 'block',
                    }}
                ></iframe>
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

            {project==='psd' && (
                <iframe
                    src="https://psdbotaaron.azurewebsites.net/"
                    onLoad={() => handleIframeLoad('psd')}
                    width="100%"
                    height="750px"
                    title="PSD Bot"
                    style={{
                        background: 'transparent',
                        border: '1px solid #ccc',
                        display: loadingStates['psd'] ? 'none' : 'block',
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