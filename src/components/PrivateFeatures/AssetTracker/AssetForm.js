import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../../authentication/Auth";
import { FormControl, TextField, Button, Box, Select, InputLabel, MenuItem, ListSubheader, CircularProgress } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';
import { sendAssetFormData, getActiveProjects } from '../../../data/Airtable';
import style from './assetForm.module.css';
import '../submitbutton.css'

const AssetForm = () => {
    // STATES
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [item, setItem] = useState('');
    const [project, setProject] = useState('');
    const [reason, setReason] = useState('');
    const [dateNeeded, setDateNeeded] = useState(null);
    const [dateReturn, setDateReturn] = useState(null);
    const [projectOptions, setProjectOptions] = useState({ Active: [], Bidding: [] });
    const [initials, setInitials] = useState('');

    // useContext for email
    const { userName, userEmail, userProjects } = useContext(AuthContext);

    // Asynchronously fetch project options when the component mounts
    useEffect(() => {
        const fetchProjectOptions = async () => {
            try {
                const options = await getActiveProjects();
                // Group projects by status
                const groupedOptions = {
                    Active: [userProjects],
                    Bidding: options.filter(o => o.status === 'Bidding'),
                };
                setProjectOptions(groupedOptions);
            } catch (error) {
                console.error('Error fetching project options:', error);
            }
        };

        fetchProjectOptions();
    }, [userProjects]);

    // HANDLER FUNCTIONS
    const handleItemInputChange = (event) => {
        setItem(event.target.value);
    };
    
    const handleProjectInputChange = (event) => {
        setProject(event.target.value);
    };

    const handleInitialInputChange = (event) => {
        setInitials(event.target.value);
    };
    
    const handleReasonInputChange = (event) => {
        setReason(event.target.value);
    };
    
    const handleSubmit = () => {
        setIsLoading(true);
        const formattedDateNeeded = dateNeeded ? format(dateNeeded, 'M/d/yyyy') : '';
        const formattedDateReturn = dateReturn ? format(dateReturn, 'M/d/yyyy') : '';

        const combinedProjectOptions = [
            ...(projectOptions.Active || []), 
            ...(projectOptions.Bidding || []),
        ];
        const selectedProject = combinedProjectOptions.find(option => option.name === project);        
        const projectId = selectedProject ? [selectedProject.rec_id] : []; 

        console.log(userName, userEmail, item, projectId, reason, formattedDateNeeded, formattedDateReturn)
        sendAssetFormData(userName, userEmail, item, projectId, reason, formattedDateNeeded, formattedDateReturn, initials)
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Stop loading regardless of the outcome
            });
    };

    const handleNewSubmission = () => {
        // Assuming setIsSubmitted is relevant to your form
        setIsSubmitted(false);
        setItem('');
        setProject('');
        setReason('');
        setDateNeeded(null); // Set this to an initial value if needed
        setDateReturn(null);
        setInitials('');
    };

    // Check if the button should be disabled
    const isButtonDisabled = 
        item.trim() === '' || 
        project.trim() === '' || 
        reason.trim() === '' || 
        dateNeeded === null || 
        dateReturn === null;

    // Options for items
    const itemOptions = [
        "Insta360 X2",
        "Insta360 X4",
        "Matterport Pro2", 
        "Matterport Pro3",
        // "Ferret Plus",
        // "Ricoh Theta Z1",
        // "Bushman Halo 360 Light",
    ]; 

    return (
        <div className={style.formContainer}>
            {isLoading ? (
                <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
            ) : !isSubmitted ? (
                <div className="form-container">
                    <div>
                        <Box display="flex" flexDirection="row">
                            <FormControl style={{color: "black", backgroundColor: "white", margin: "8px", width: "50%", marginBottom: "20px"}}>
                                <InputLabel id="item-label">Item Needed</InputLabel>
                                <Select
                                    labelId="item-label"
                                    id="item"
                                    value={item}
                                    onChange={handleItemInputChange}
                                    label="Item Needed"
                                    required
                                >
                                    {itemOptions.map((option, index) => (
                                        <MenuItem key={index} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl style={{color: "black", backgroundColor: "white", margin: "8px", width: "50%", marginBottom: "20px"}}>
                                <InputLabel id="project-label">Project</InputLabel>
                                <Select
                                    labelId="project-label"
                                    id="project"
                                    value={project}
                                    onChange={handleProjectInputChange}
                                    label="Project"
                                    required
                                >
                                    <MenuItem value="Non-Project - 1010">Non-Project - 1010</MenuItem>
                                    <ListSubheader>My Active Jobs</ListSubheader>
                                    {Array.isArray(projectOptions.Active) && projectOptions.Active.map((option, index) => (
                                        <MenuItem key={index} value={option}>{option}</MenuItem>
                                    ))}
                                    <ListSubheader>Pursuits</ListSubheader>
                                    {Array.isArray(projectOptions.Bidding) && projectOptions.Bidding.map((option, index) => (
                                        <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <TextField
                                id="reason"
                                label="Intended Use - For Record Keeping Purposes"
                                multiline
                                value={reason}
                                onChange={handleReasonInputChange}
                                style={{color: "black", backgroundColor: "white", margin: "8px", width: "100%"}}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date Needed"
                                    sx=  {{width: "25%", marginBottom: "28px", marginLeft: "8px", marginTop: "25px"}}
                                    value={dateNeeded}
                                    onChange={setDateNeeded}
                                    renderInput={(params) => <TextField {...params} sx={{ }} />}
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Return Date"
                                    sx=  {{width: "25%", marginBottom: "28px", marginLeft: "8px", marginTop: "25px"}}
                                    value={dateReturn}
                                    onChange={setDateReturn}
                                    renderInput={(params) => <TextField {...params} sx={{}} />}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="initials"
                                label="Initials"
                                multiline
                                value={initials}
                                onChange={handleInitialInputChange}
                                sx= {{width: "25%", marginBottom: "28px", marginLeft: "8px", marginTop: "25px"}}
                            />
                            <button onClick={handleSubmit}
                                className='buttonColored'
                                style={{
                                    width: "8vw", 
                                    height: '55px', 
                                    marginTop: "25px", 
                                    marginLeft: "38px",
                                }}
                                disabled={isButtonDisabled}>
                                Submit
                            </button>
                        </Box>
                    </div>
                </div>
            ) : (
                <div className="form-container">
                    <div style={{textAlign:"center", color:"#1b365f"}}>
                        <div>Thank you for your submission. Rory will follow up with you.</div>
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
                </div>
            )}
        </div>
    );
};

export default AssetForm;
