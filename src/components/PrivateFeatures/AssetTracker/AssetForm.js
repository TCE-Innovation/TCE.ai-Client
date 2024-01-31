import style from './assetForm.module.css'

//REACT
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../../authentication/Auth";

//MUI
import { FormControl, TextField, Button, Box, Select, InputLabel, MenuItem, ListSubheader } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

//AIRTABLE
import { sendAssetFormData, getActiveProjects } from '../../../API Calls/Airtable';

const AssetForm = () => {
    //STATES
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [item, setItem] = useState('');
    const [project, setProject] = useState('');
    const [reason, setReason] = useState('');
    const [dateNeeded, setDateNeeded] = useState(null);     //maybe a date picker or initialize date as today's date
    const [dateReturn, setDateReturn] = useState(null);
    const [projectOptions, setProjectOptions] = useState([]);
    const [initials, setInitials] = useState('');

    // Asynchronously fetch project options when the component mounts
    useEffect(() => {
        const fetchProjectOptions = async () => {
            try {
                const options = await getActiveProjects();
                // Group projects by status
                const groupedOptions = {
                    Active: options.filter(o => o.status === 'Active'),
                    Bidding: options.filter(o => o.status === 'Bidding')
                };
                setProjectOptions(groupedOptions);
            } catch (error) {
                console.error('Error fetching project options:', error);
            }
        };

        fetchProjectOptions();
    }, []);
    
    //useContext for email
    const { userName, userEmail } = useContext(AuthContext);

    //HANDLER FUNCTIONS
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
        const formattedDateNeeded = dateNeeded ? format(dateNeeded, 'M/d/yyyy') : '';
        const formattedDateReturn = dateReturn ? format(dateReturn, 'M/d/yyyy') : '';

        const combinedProjectOptions = [
            ...(projectOptions.Active || []), 
            ...(projectOptions.Bidding || [])
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
            });
    };

    const handleNewSubmission = () => {
        // Assuming setIsSubmitted is relevant to your form
        setIsSubmitted(false);
        setItem('');
        setProject('');
        setReason('');
        setDateNeeded(''); // Set this to an initial value if needed
        setDateReturn('');
    };

    //dont forget to handle signature before submit
    const isButtonDisabled = 
        item.trim() === '' || 
        project.trim() === '' || 
        reason.trim() === '' || 
        dateNeeded === '' || 
        dateReturn === '';


    //make request to azure function app to fetch options from airtable
    const itemOptions = [
        "Matterport Pro2", 
        "Matterport Pro3",
        "Ferret Plus",
        "Ricoh Theta Z1",
        "Insta360 OneX2",
        "Bushman Halo 360 Light",
    ]; 

    return (
            <div className={style.formContainer}>
                {!isSubmitted ? (
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
                                            <ListSubheader>Active Jobs</ListSubheader>
                                            {projectOptions.Active?.map((option, index) => (
                                                <MenuItem key={index} value={option.name}>{option.name}</MenuItem>
                                            ))}
                                            <ListSubheader>Pursuits</ListSubheader>
                                            {projectOptions.Bidding?.map((option, index) => (
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
                                        <Button 
                                            onClick={handleSubmit}
                                            disabled={isButtonDisabled}
                                            variant="outlined"
                                            endIcon={<SendIcon />} 
                                            sx={{color: "#1b365f",
                                            borderColor: "#1b365f",
                                            borderRadius: "20px",
                                            fontWeight: "500",
                                            marginRight: "8px",
                                            marginLeft: "20px",
                                            backgroundColor: "transparent",
                                            width: "20%",
                                            height: "50px",
                                            marginTop: "25px"}}
                                        >
                                            Submit
                                        </Button>  
                                </Box>

                        </div>
                    </div>
                ) : (
                    <div className="form-container">
                        <Box className={style.box}>
                            Thank you for your submission. A TCIG team member will follow up with you.
                            <br />
                            <Button 
                                onClick={handleNewSubmission} 
                                variant="outlined" 
                                sx={{
                                mt: 5, 
                                fontWeight:'bold', 
                                color: "#1b365f",
                                borderColor: "#1b365f",
                                borderRadius: "20px",
                                marginRight: "8px",
                                backgroundColor: "transparent",
                                width: "20%",
                                height: "50px",
                                marginTop: "25px"}}
                            >
                                Request another item
                            </Button>
                        </Box>
                    </div>
                )}
                </div>
    );
};

export default AssetForm;
