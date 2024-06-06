import React, { useState, useContext, useEffect } from 'react';
import Upload from '@mui/icons-material/Upload';
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
        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: "5px", fontSize: '1.3em' }}>
            Prototyping with 3D printing offers significant value in the construction industry, 
            particularly when developing custom brackets and materials. 
            This technology allows for rapid iteration and testing, 
            ensuring that the designs fit precisely and function as intended before committing to mass production. 
            By creating accurate physical models, engineers and craft labor can review and refine the ease of installation, 
            identifying potential issues and making adjustments early in the process. 
            This not only enhances the overall quality and performance of the final product but also reduces the risk of costly errors and delays.                 
        </div>
        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: '20px', marginRight: '23px', fontSize: '1.3em' }}>
            
            After submitting your print request via the form below, Rory will reach out to you to discuss the details of your requested print and coordinate handoff.
        </div>

        {/* <div className={style.formDescription} style={{ textAlign: 'left', marginTop: '20px' }}>
            Please note: prints beyond 17.7" x 15.7" x 15.7" will be printed in multiple parts, which may take longer.
        </div> */}
    </Box>

    <div style={{ marginLeft: '150px'}}>
        {/* FORM */}
        <div style={{ marginTop: '-20px', maxWidth: '1200px', margin: '0 auto' }}>

            {isLoading ? (
                <CircularProgress style={{ display: 'block', margin: '0 auto' }} />
            ) : !isSubmitted ? (
                <div className="form-container">
                    <Box display="flex" flexDirection="column" alignItems="center">

                    <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
                        <TextField
                            id="item"
                            label="Description of item to 3D print"
                            value={item}
                            onChange={handleItemInputChange}
                            style={{ margin: "10px", width: "58%", marginLeft: "130px", marginBottom: "-5px" }}
                        />
                    </Box>

                    <TextField
                        id="reason"
                        label="Reason for 3D print request"
                        value={reason}
                        onChange={handleReasonInputChange}
                        style={{ margin: "20px", width: "58%", marginLeft: "-222px", marginBottom: "15px"}}
                    />

                <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" sx={{ marginLeft: '170px' }}>
                <FormControl style={{ margin: "0px", width: "35%", marginLeft: "45px" }}>
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
                <Box style={{ paddingLeft: "5px", marginRight: '458px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                    label="Date Needed"
                    value={dateNeeded}
                    onChange={setDateNeeded}
                    renderInput={(params) => <TextField {...params} style={{ marginTop: "10px", marginLeft: "185px", width: "20%", paddingRight: "50px" }} />}
                    />
                </LocalizationProvider>
                </Box>
                </Box>

                <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%" sx={{ marginLeft: '165px', marginTop: '10px' }}>

                    <Button
                        variant="contained"
                        startIcon={<Upload />}
                        style={{ marginTop: '5px', marginLeft: '50px', width: '418px', height: '50px', marginRight: '-150px' }}
                        size="medium"
                        onClick={() => {
                            document.getElementById('pullsheetInput').click();
                        }}
                    >
                        Optional: Upload stl or dwg file
                    </Button>


                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        style={{ width: "21.5%", height: '50px', marginTop: "5px", marginBottom: "20px", marginRight: "455px" }}
                        disabled={isButtonDisabled}
                        >
                        Submit
                    </Button>
                    </Box>

                    <Typography variant="body2" style={{ color: 'red', marginTop: '-5px', marginBottom: '5px', marginRight: '240px', width: '70%', textAlign: 'center' }}>
                        * Please note: requests beyond 17.7" x 15.7" x 15.7" will be printed in multiple pieces, which may take longer.
                    </Typography>
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

        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3} sx={{ marginTop: '20px', marginLeft: '-220px' }}>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3}>
                {/* <div className={style.formDescription}>
                    Past 3D Prints:                 
                </div> */}
            </Box>

            {/* IMAGES */}
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3} sx={{marginTop: '-10px'}}>

                <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px' }}>
                        <img src={ZBracketCuraImage} alt="Z Bracket Cura" style={{ width: '200px', height: '200px', margin: '0 10px' }} />
                        <img src={ZBracketRealImage} alt="Z Bracket Real" style={{ width: '200px', height: '200px', margin: '0 10px' }} />    
                    </div>
                    <Typography variant="h6" style={{ fontStyle: "italic", marginTop: "5px", fontSize: '1em' }}>
                        Z Messenger Bracket
                    </Typography>
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" mx={1}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px' }}>
                        <img src={StairTreadCuraImage} alt="Stair Tread Cura" style={{ width: '200px', height: '200px', margin: '0 10px' }} />
                        <img src={StairTreadRealImage} alt="Stair Tread Real" style={{ width: '200px', height: '200px', margin: '0 10px' }} />    
                    </div>
                    <Typography variant="h6" style={{ fontStyle: "italic", marginTop: "5px", fontSize: '1em' }}>
                        Stair Tread
                    </Typography>
                </Box>
            </Box>
        </Box>
        </div>
    </>
    );
};
export default PrintingRequest;