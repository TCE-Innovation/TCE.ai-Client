import React, { useState, useContext } from 'react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel, ListSubheader } from '@mui/material';

import { sendSupportFormData } from '../../data/Airtable';
import { AuthContext } from "../../authentication/Auth";
import TrainLoader from '../General/TrainLoader';

import './submitbutton.css'

const Support = () => {
    const [subject, setSubject] = useState('');
    const [tool, setTool] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [project, setProject] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { userName, userEmail, userApplications, userTools, userProjects } = useContext(AuthContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'subject':
                setSubject(value);
                break;
            case 'problemDescription':
                setProblemDescription(value);
                break;
            case 'tool':
                setTool(value);
                break;
            default:
                break;
        }
    };

    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const formData = {
            requesterName: userName,
            requesterEmail: userEmail,
            subject,
            description: problemDescription,
            project,
            tool
        };
        try {
            await sendSupportFormData(formData);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form data:', error);
        } finally {
            setTimeout(() => setIsLoading(false), 2000);
        }
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setSubject('');
        setProblemDescription('');
        setProject('');
        setTool('');
    };

    const isButtonDisabled = isLoading || problemDescription.trim() === '' || project.trim() === '' || subject.trim() === '';

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    // Safeguards for userApplications, userTools, and userProjects
    const apps = userApplications ? userApplications.split(', ') : ['N/A'];
    const tools = userTools ? userTools.split(', ') : ['N/A'];
    const projects = userProjects ? userProjects.split(', ') : ['N/A'];

    return (
        <div className='container'>
            {isLoading ? (
                <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
            ) : !isSubmitted ? (
                // Display the form if not submitted and not loading
                <>
                    <div className="private-form-prompt" style={{ textAlign: "center", marginTop: 30 }}>
                        Need assistance? Please fill out the form below and we will get back to you as soon as possible.
                    </div>
                    <br />
                    <FormControl fullWidth margin="normal">
                        <TextField
                            id="subject"
                            label="Subject"
                            value={subject}
                            onChange={handleInputChange}
                            name="subject"
                            required
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="project-select-label">Project</InputLabel>
                        <Select
                            labelId="project-select-label"
                            id="project-select"
                            value={project}
                            onChange={handleProjectChange}
                            label="Project"
                            required
                        >
                            <MenuItem value="Non-Project -1010">Non-Project - 1010</MenuItem>
                            <ListSubheader>My Project(s)</ListSubheader>
                            {projects.map((proj) => (
                                <MenuItem key={`Active-${proj.id}`} value={proj}>{proj}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="tool-select-label">Tool</InputLabel>
                        <Select
                            labelId="tool-select-label"
                            id="tool-select"
                            value={tool}
                            name="tool"
                            label="Tool"
                            onChange={handleInputChange}
                            required
                        >
                            <ListSubheader>My Applications</ListSubheader>
                            {apps.map((app, index) => (
                                <MenuItem key={index} value={app}>{app}</MenuItem>
                            ))}

                            <ListSubheader>My TCIG Tools</ListSubheader>
                            {tools.map((tool, index) => (
                                <MenuItem key={`tcig-${index}`} value={`TCE.tools - ${tool}`}>{tool}</MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            id="problem-description"
                            label="Problem Description"
                            multiline
                            rows={4}
                            value={problemDescription}
                            name="problemDescription"
                            onChange={handleInputChange}
                            required
                        />
                    </FormControl>

                    <button onClick={handleSubmit}
                            className='buttonColored'
                            disabled={isButtonDisabled}>
                        Submit
                    </button>

                </>
            ) : (
                // Display submission success message
                <div style={{ textAlign: "center", color: "#1b365f", paddingTop: "20px" }}>
                    <div>Thank you for your submission. A team member will follow up with you.</div>
                    <Button style={{ 
                                width: "15vw", 
                                marginTop: "1vw", 
                                fontSize: ".9vw",
                                color: "#1b365f",
                                borderColor: "#1b365f",
                                fontWeight: "500",
                            }} 
                            onClick={handleNewSubmission}>
                        Submit another request
                    </Button>
                </div>
            )}
        </div>
    );
    
};

export default Support;
