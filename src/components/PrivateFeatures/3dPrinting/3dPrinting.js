import React, { useState, useEffect } from 'react';
import { FormControl, TextField, Button, Box, Select, InputLabel, MenuItem, CircularProgress } from '@mui/material';
// import { getProjects } from '../../data/api'; // Assuming you have an API function to fetch projects
// import style from './simpleForm.module.css'; // Assuming you have some CSS for styling
// import Typography from '@mui/material/Typography';
// import style from './3dPrinting.module.css';


import ZBracketCuraImage from '../../../img/Request3DPrintingImages/z_bracket_real.png';
import ZBracketRealImage from '../../../img/Request3DPrintingImages/z_bracket_cura.png';

const PrintingRequest = () => {
    // STATES
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [subject, setSubject] = useState('');
    const [project, setProject] = useState('');
    const [projectOptions, setProjectOptions] = useState([]);

    // Asynchronously fetch project options when the component mounts
    useEffect(() => {
        const fetchProjectOptions = async () => {
            try {
                // const options = await getProjects();
                // setProjectOptions(options);
            } catch (error) {
                console.error('Error fetching project options:', error);
            }
        };

        fetchProjectOptions();
    }, []);

    // HANDLER FUNCTIONS
    const handleSubjectInputChange = (event) => {
        setSubject(event.target.value);
    };
    
    const handleProjectInputChange = (event) => {
        setProject(event.target.value);
    };
    
    const handleSubmit = () => {
        setIsLoading(true);
        
        console.log(subject, project);
        // Simulate an API call
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
        }, 1000);
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setSubject('');
        setProject('');
    };

    // Check if the button should be disabled
    const isButtonDisabled = subject.trim() === '' || project.trim() === '';

    return (

        <>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <img src={ZBracketCuraImage} alt="Z Bracket Cura" style={{ width: '200px', height: '200px', marginRight: '-200px' }} />
            <img src={ZBracketRealImage} alt="Z Bracket Real" style={{ width: '200px', height: '200px' }} />    
        </div>


        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

            
            {isLoading ? (
                <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
            ) : !isSubmitted ? (
                <div className="form-container">
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <TextField
                            id="subject"
                            label="Subject"
                            value={subject}
                            onChange={handleSubjectInputChange}
                            style={{ margin: "8px", width: "50%", marginBottom: "20px" }}
                        />
                        <FormControl style={{ margin: "8px", width: "50%", marginBottom: "20px" }}>
                            <InputLabel id="project-label">Project</InputLabel>
                            <Select
                                labelId="project-label"
                                id="project"
                                value={project}
                                onChange={handleProjectInputChange}
                                label="Project"
                                required
                            >
                                {projectOptions.map((option, index) => (
                                    <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            style={{ width: "50%", marginTop: "20px" }}
                            disabled={isButtonDisabled}
                        >
                            Submit
                        </Button>
                    </Box>
                </div>
            ) : (
                <div className="form-container" style={{ textAlign: "center", color: "#1b365f" }}>
                    <div>Thank you for your submission.</div>
                    <Button
                        onClick={handleNewSubmission}
                        variant="outlined"
                        style={{ 
                            width: "50%", 
                            marginTop: "20px",
                            color: "#1b365f",
                            borderColor: "#1b365f",
                            fontWeight: "500",
                        }}
                    >
                        Submit another request
                    </Button>
                </div>
            )}
        </div>
        </>
    );
};
export default PrintingRequest;