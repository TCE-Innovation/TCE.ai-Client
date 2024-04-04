import React, { useState, useContext, useEffect } from 'react';
import { FormControl, TextField, Button, Select, MenuItem, InputLabel, ListSubheader, CircularProgress } from '@mui/material';

import { getActiveProjects, sendSupportFormData } from '../../API Calls/Airtable';
import { AuthContext } from "../../authentication/Auth";

const Support = () => {
    const [subject, setSubject] = useState('');
    const [tool, setTool] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const [project, setProject] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [projectOptions, setProjectOptions] = useState({ Active: [], Bidding: [], Continuous: [] });
    const [isLoading, setIsLoading] = useState(false);
    const { userName, userEmail } = useContext(AuthContext);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getActiveProjects();
                const activeProjects = projects.filter(project => project.status === 'Active');
                const biddingProjects = projects.filter(project => project.status === 'Bidding');
                setProjectOptions({
                    Active: activeProjects,
                    Bidding: biddingProjects,
                });
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

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

    return (
        <div className='container'>
            {isLoading ? (
                // Display the loading spinner centered when isLoading is true
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                    <CircularProgress />
                </div>
            ) : !isSubmitted ? (
                // Display the form if not submitted and not loading
                <>
                    <div className="private-form-prompt" style={{ textAlign: "center" }}>
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
                            <ListSubheader>Active Projects</ListSubheader>
                            {projectOptions.Active.map((proj) => (
                                <MenuItem key={`Active-${proj.id}`} value={proj.name}>{proj.name}</MenuItem>
                            ))}
                            <ListSubheader>Pursuits</ListSubheader>
                            {projectOptions.Bidding.map((proj) => (
                                <MenuItem key={`Bidding-${proj.id}`} value={proj.name}>{proj.name}</MenuItem>
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
                            {["Procore", "OpenSpace", "Airtable"].map((tool, index) => (
                                <MenuItem key={index} value={tool}>{tool}</MenuItem>
                            ))}
                            <ListSubheader>TCIG Tools</ListSubheader>
                            {/* Example subsection options under TCIG.nyc */}
                            {["Cable Run Optimizer", "ChatBot", "Equipment Checkout", "Subcontractor Forms", "General"].map((subTool, index) => (
                                <MenuItem key={`tcig-${index}`} value={`TCIG.nyc - ${subTool}`}>{subTool}</MenuItem>
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
                    <Button onClick={handleSubmit}                                         
                        sx={{color: "#1b365f",
                            borderColor: "#1b365f",
                            fontWeight: "500",
                            backgroundColor: "transparent",
                            width: "3.5vw",}}
                            disabled={isButtonDisabled}>
                                Submit
                    </Button>
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
