import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
//import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

//AUTH
import { AuthContext } from "../../authentication/Auth";


const ChatBot = () => {
    const [project, setProject] = useState('hr');
    const { userProjects, userName } = useContext(AuthContext);

    const userProjKeys = [];

    const allProjectsAccess = [
        "Matthew Bayne",
        "Jacob Shavel",
        "Chris Dawson",
        "Hector Lim"
    ]

    //list of 

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
    
    const projWithChatbot = ['p4', 'ert', 'fulton', 'psd'];

    function findMatchingProjects(userProjects, chatbotProjects) {
        return userProjects.filter((project) => chatbotProjects.includes(project));
    }

    const matchingProjects = findMatchingProjects(userProjKeys, projWithChatbot);

    //dropdown menu for project selection
    const handleChange = (event) => {
        setProject(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            
            <FormControl variant="outlined" sx={{ mb: 4, width: 200 }}>
                <InputLabel>Project</InputLabel>
                <Select value={project} onChange={handleChange} label="Project">
                    <MenuItem value="hr">Human Resources</MenuItem>
                    {matchingProjects.map((projectName) => (    
                        <MenuItem key={projectName} value={projectName}>
                            {projectName === 'p4' && 'Package 4'}
                            {projectName === 'psd' && 'Platform Screen Doors'}
                            {projectName === 'fulton' && 'Fulton'}
                            {projectName === 'ert' && 'East River Tunnel Rehab'}
                            {/* Add more projects as needed */}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            {project==='fulton' ? (
                <iframe 
                    src="https://fultonbotchris.azurewebsites.net" 
                    frameborder="0" 
                    width={'100%'} 
                    height={750}
                    title="Fulton Bot"
                ></iframe>
            ) : null}

            
            {project==='ert' ? (
                <iframe
                    src="https://ertbotchris.azurewebsites.net/"
                    width="100%"
                    height="750px"
                    title="ERT Bot"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            ) : null}


            {project==='p4' ? (
                <iframe
                    src="https://p4botaaron.azurewebsites.net/"
                    width="100%"
                    height="750px"
                    title="Package 4 Bot"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            ) : null}

            {project==='fulton' ? (
                <iframe
                    src="https://fultonbotchris.azurewebsites.net/"
                    width="100%"
                    height="750px"
                    title="Fulton Bot"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            ) : null} 

            {project==='psd' ? (
                <iframe
                    src="https://psdbotaaron.azurewebsites.net/"
                    width="100%"
                    height="750px"
                    title="PSD Bot"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            ) : null}

            {project==='hr' ? (
                <iframe
                    src="https://hr-bot-1.azurewebsites.net/"
                    width="100%"
                    height="750px"
                    title="HR Bot"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            ) : null}
            
        </Box>
    );
};

export default ChatBot;
