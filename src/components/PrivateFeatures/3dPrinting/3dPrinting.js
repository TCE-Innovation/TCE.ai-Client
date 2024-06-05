import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../../authentication/Auth";
import { FormControl, TextField, Button, Box, Select, InputLabel, MenuItem, ListSubheader, CircularProgress } from '@mui/material';
// import { getProjects } from '../../data/api'; // Assuming you have an API function to fetch projects
// import style from './simpleForm.module.css'; // Assuming you have some CSS for styling
import Typography from '@mui/material/Typography';
import style from './3dPrinting.module.css';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { send3dPrintingFormData, getActiveProjects } from '../../../data/Airtable';

import ZBracketCuraImage from '../../../img/Request3DPrintingImages/z_bracket_cura.png';
import ZBracketRealImage from '../../../img/Request3DPrintingImages/z_bracket_real.png';
import StairTreadCuraImage from '../../../img/Request3DPrintingImages/stair_tread_cura.png';
import StairTreadRealImage from '../../../img/Request3DPrintingImages/stair_tread_real.png';
// import { set } from 'date-fns';

const PrintingRequest = () => {
    // STATES
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [item, setItem] = useState('');
    const [reason, setReason] = useState('');
    const [dateNeeded, setDateNeeded] = useState(null);
    const [projectOptions, setProjectOptions] = useState({ Active: [], Bidding: [] });
    const [project, setProject] = useState('');
    // const [projectOptions, setProjectOptions] = useState([]);

    // useContext for email
    const {userEmail, userProjects } = useContext(AuthContext);

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

    const handleReasonInputChange = (event) => {
        setReason(event.target.value);
    };
    
    const handleProjectInputChange = (event) => {
        setProject(event.target.value);
    };
    
    const handleSubmit = () => {
        setIsLoading(true);
        
        console.log(item, project);
        
        send3dPrintingFormData(item, reason, project, dateNeeded, userEmail)
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
        setIsSubmitted(false);
        setItem('');
        setProject('');
        setDateNeeded(null);
        setReason('');
    };

    // Check if the button should be disabled
    const isButtonDisabled = item.trim() === '' || project.trim() === '';

    return (
        <>

    {/* OPENING TEXT */}
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3}>
        <div className={style.formDescription} style={{ textAlign: 'left' }}>
            Prototyping with 3D printing offers significant value in the construction industry, 
            particularly when developing custom brackets and materials. 
            This technology allows for rapid iteration and testing, 
            ensuring that the designs fit precisely and function as intended before committing to mass production. 
            By creating accurate physical models, engineers and craft labor can review and refine the ease of installation, 
            identifying potential issues and making adjustments early in the process. 
            This not only enhances the overall quality and performance of the final product but also reduces the risk of costly errors and delays.                 
        </div>
        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: '20px' }}>
            In order to request a 3D print, please fill out the form below. 
            After submitting your request, Rory will reach out to you to discuss the details of your requested print and coordinate handoff.
        </div>

        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: '20px' }}>
            Please note: prints beyond 17.7" x 15.7" x 15.7" will be printed in multiple parts, which may take longer.
        </div>
    </Box>

    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3}>
        <div className={style.formDescription}>
            Past 3D Prints:                 
        </div>
    </Box>

    {/* IMAGES */}
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3}>

        <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px' }}>
                <img src={ZBracketCuraImage} alt="Z Bracket Cura" style={{ width: '200px', height: '200px', margin: '0 10px' }} />
                <img src={ZBracketRealImage} alt="Z Bracket Real" style={{ width: '200px', height: '200px', margin: '0 10px' }} />    
            </div>
            <Typography variant="h6" style={{ fontStyle: "italic", marginTop: "5px" }}>
                Z Messenger Bracket
            </Typography>
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px' }}>
                <img src={StairTreadCuraImage} alt="Stair Tread Cura" style={{ width: '200px', height: '200px', margin: '0 10px' }} />
                <img src={StairTreadRealImage} alt="Stair Tread Real" style={{ width: '200px', height: '200px', margin: '0 10px' }} />    
            </div>
            <Typography variant="h6" style={{ fontStyle: "italic", marginTop: "5px" }}>
                Stair Tread
            </Typography>
        </Box>
    </Box>


    {/* FORM */}
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>

        
        {isLoading ? (
            <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
        ) : !isSubmitted ? (
            <div className="form-container">
                <Box display="flex" flexDirection="column" alignItems="center">
                    
                    <FormControl style={{ margin: "8px", width: "70%", marginBottom: "20px" }}>
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
                    
                    {/* <Typography variant="body2" style={{ color: 'red', marginTop: '-10px', width: '70%', textAlign: 'center' }}>
                        * Print size must be within 17.7" x 15.7" x 15.7"
                    </Typography> */}

                    <TextField
                        id="item"
                        label="Description of item to 3D print"
                        value={item}
                        onChange={handleItemInputChange}
                        style={{ margin: "8px", width: "70%", marginBottom: "20px" }}
                    />

                    <TextField
                        id="reason"
                        label="Reason for 3D print request"
                        value={reason}
                        onChange={handleReasonInputChange}
                        style={{ margin: "8px", width: "70%", marginBottom: "20px" }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date Needed"
                                sx=  {{width: "70%", marginBottom: "28px", marginLeft: "0px", margin: "8px"}}
                                value={dateNeeded}
                                onChange={setDateNeeded}
                                renderInput={(params) => <TextField {...params} sx={{ }} />}
                            />
                    </LocalizationProvider>
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