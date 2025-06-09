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

// Past prints pop up
import FilterRoundedIcon from '@mui/icons-material/FilterRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import ZBracketCuraImage from '../../../img/Request3DPrintingImages/z_bracket_cura.png';
import ZBracketRealImage from '../../../img/Request3DPrintingImages/z_bracket_real.png';
import StairTreadCuraImage from '../../../img/Request3DPrintingImages/stair_tread_cura.png';
import StairTreadRealImage from '../../../img/Request3DPrintingImages/stair_tread_real.png';
// import { set } from 'date-fns';
import { format } from 'date-fns';

const PrintingRequest = () => {
    // STATES
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const [projectOptions, setProjectOptions] = useState({ Active: [], Bidding: [] });

    const [item, setItem] = useState('');
    const [reason, setReason] = useState('');
    const [dateNeeded, setDateNeeded] = useState(null);
    const [project, setProject] = useState('');
    const [file, setFile] = useState(null);

    const [faqDialogOpen, setFaqDialogOpen] = useState(false);
    const imageWidth = '250px';
    const imageHeight = '250px';


    // useContext for email
    const {userEmail, userProjects } = useContext(AuthContext);


    // Pop up box
    // const [isBoxExpanded, setIsBoxExpanded] = useState(false);

    // const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
    // const handleClose = () => {
    //   setOpen(false);
    // };

    // const [expanded, setExpanded] = React.useState('panel1');
  
    // const handleChange = (panel) => (event, newExpanded) => {
    //     setExpanded(newExpanded ? panel : false);
    // };

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

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = () => {
            const dataURL = reader.result;
            setFile(dataURL);
        };
    
        reader.readAsDataURL(file);
    };
    
    const handleFaqOpen = () => {
        setFaqDialogOpen(true);
    };
    
    const handleFaqClose = () => {
        setFaqDialogOpen(false);
    };
    

    
    const handleSubmit = () => {
        setIsLoading(true);

        const formattedDateNeeded = dateNeeded ? format(dateNeeded, 'M/d/yyyy') : '';
        
        console.log(item, project);

        let formData = {};
        
        // const formData = { item, reason, project, formattedDateNeeded, userEmail };
        if (file) {
            formData = { item, reason, project, formattedDateNeeded, userEmail, file };

            // formData.file = file;
            console.log("In handle submit:")
            console.log(file.name)
        }
        else{
            setFile(null)
            formData = { item, reason, project, formattedDateNeeded, userEmail, file };

            // formData.file = null;
            console.log('No file uploaded')
        }

        send3dPrintingFormData(formData)
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
        // setItem('');
        // setProject('');
        // setDateNeeded(null);
        // setReason('');
        // setFile(null);
    };

    // Check if the button should be disabled
    const isButtonDisabled = 
    item.trim() === '' || 
    reason.trim() === '' ||
    project.trim() === '' || 
    dateNeeded === null;

    return (
        <>

    {/* OPENING TEXT */}
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3} style={{ transform: 'translateX(-20px)' }}>
        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: "25px", fontSize: '1.3em', maxWidth: '80%' }}>
            Prototyping with 3D printing offers significant value in the construction industry, 
            particularly when developing custom brackets and materials. 
            This technology allows for rapid iteration and testing, 
            ensuring that the designs fit precisely and function as intended before committing to mass production. 
            By creating accurate physical models, engineers and craft labor can review and refine the ease of installation, 
            identifying potential issues and making adjustments early in the process. 
            This not only enhances the overall quality and performance of the final product but also reduces the risk of costly errors and delays.                 
        </div>
        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: '20px', marginRight: '0px', fontSize: '1.3em', maxWidth: '80%' }}>
            After submitting your print request via the form below, Rory will reach out to you to discuss the details of your requested print and coordinate handoff.
        </div>

        <div className={style.formDescription} style={{ textAlign: 'left', marginTop: '15px', marginRight: '0px', fontSize: '0.8em', color: 'red', maxWidth: '80%' }}>
            * Please note: items beyond 17" x 15" x 15" will be printed in multiple parts, which may take longer.
        </div>

        {/* warning text */}
        {/* <Typography variant="body2" style={{ color: 'red', marginTop: '0px', marginBottom: '5px', marginRight: '0px', width: '110%', paddingLeft: '10px' }}>
            * Please note: items beyond 17" x 15" x 15" will be printed in multiple parts, which may take longer.
        </Typography> */}

        <Button
            variant="contained"
            startIcon={<FilterRoundedIcon />}
            sx={{ 
                marginLeft: '0px', 
                marginTop: '20px', 
                marginBottom: '10px',
                backgroundColor: '#8B5A73', 
                '&:hover': {
                    backgroundColor: '#784E63', 
                },
            }}
            onClick={handleFaqOpen}
        >
            View Examples
        </Button>

        <Dialog 
        open={faqDialogOpen} 
        onClose={handleFaqClose}
        fullWidth
        maxWidth="md"
        >
            <DialogTitle style={{ textAlign: 'center', fontSize: '1.6rem', fontWeight: 'bold' }}>Past Use Examples</DialogTitle>
            <DialogContent dividers style={{ height: '600px'}}>
                <Typography variant="body1">
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3} sx={{ marginTop: '23px', marginBottom: '-50px' , marginLeft: '-250px' }}>
                    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" mb={3}>
                        {/* <div className={style.formDescription}>
                            Past 3D Prints:                 
                        </div> */}
                    </Box>

                    
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mb={3} sx={{marginTop: '-15px', marginLeft: '150px'}}>
                    
                        <Box display="flex" flexDirection="row" alignItems="center" mx={1} sx={{marginLeft: '10px'}}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px' }}>
                                <img src={StairTreadCuraImage} alt="Z Bracket Cura" style={{ width: imageWidth, height: imageHeight, margin: '0 10px' }} />
                                <img src={StairTreadRealImage} alt="Z Bracket Real" style={{ width: imageWidth, height: imageHeight, margin: '0 10px' }} />    
                            </div>
                            <Box display="flex" flexDirection="column" alignItems="center" mx={1} sx={{marginRight: '-90px', marginLeft: '20px', marginTop: '50px'}}>

                                <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "-70px", marginLeft: '-30px', marginBottom: '5px',  fontSize: '1.2em' }}>
                                    Stair Tread
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '1.0em', maxWidth: '275px', lineHeight: '2' }}>
                                    Used for Package 4, this 3D printed stair tread
                                    was used to verify the fitting of stair treads, which are long lead items, on new stairs being installed
                                    in compliance with MTA and ADA requirements.
                                </Typography>
                            </Box>

                        </Box>

                        <Box display="flex" flexDirection="row" alignItems="center" mx={1} sx={{marginTop: '50px'}}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-15px' }}>
                                <img src={ZBracketCuraImage} alt="Stair Tread Cura" style={{ width: imageWidth, height: imageHeight, margin: '0 10px' }} />
                                <img src={ZBracketRealImage} alt="Stair Tread Real" style={{ width: imageWidth, height: imageHeight, margin: '0 10px' }} />    
                            </div>
                            <Box display="flex" flexDirection="column" alignItems="center" mx={1} sx={{marginRight: '-90px', marginLeft: '20px', marginTop: '50px'}}>

                                <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "-70px", marginLeft: '-20px', marginBottom: '5px', fontSize: '1.2em' }}>
                                    Z Messenger Bracket
                                </Typography>
                                <Typography variant="body1" style={{ fontSize: '1.0em', maxWidth: '275px', lineHeight: '2' }}>
                                    Used for Crosstown, this 3D printed bracket
                                    was used to verify the future installation of brackets, which are long lead items, for messenger bundles.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleFaqClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    
    
        {/* FORM */}
        {/* <div style={{ marginTop: '-20px', marginLeft: '9vw', maxWidth: '700px', margin: '0 auto' }}> */}
            
            {/* <CircularProgress style={{ display: 'block', margin: '0 auto', marginRight: "790px" }} /> */}

            {isLoading ? (
                <CircularProgress style={{ display: 'block', margin: '0 auto', marginRight: "785px", marginTop: "20px" }} />
            ) : !isSubmitted ? (
                
                <div className="form-container">
                    <div>
                        <Box display="flex" flexDirection="column">
                            {/* DESCRIPTION FIELD */}
                            <TextField
                                id="item"
                                label="Description of item to 3D print"
                                value={item}
                                onChange={handleItemInputChange}
                                style={{ margin: "10px", width: "99%" }}
                            />

                            {/* REASON FIELD */}
                            <TextField
                                id="reason"
                                label="Reason for 3D print request"
                                value={reason}
                                onChange={handleReasonInputChange}
                                style={{ margin: "10px", width: "99%"}}
                            />
                        </Box>

                        <Box display="flex" flexDirection="row" width="100%" sx={{ marginLeft: '10px', marginTop: '10px' }}>
                            {/* PROJECT DROP DOWN MENU */}
                            <FormControl style={{ margin: "0px", width: "65%", marginRight: "20px" }}>
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
                            </FormControl
                            >
                            {/* DATE NEEDED */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                    label="Date Needed"
                                    value={dateNeeded}
                                    onChange={setDateNeeded}
                                    renderInput={(params) => <TextField {...params} style={{ marginTop: "10px", marginLeft: "0px", width: "20%", paddingRight: "0px" }} />}
                                    />
                                </LocalizationProvider>
                        </Box>

                        <Box display="flex" flexDirection="row" width="100%" sx={{ marginLeft: '10px', marginTop: '10px' }}>
                            <label htmlFor="file">
                            <Button
                                variant="contained"
                                className={style.userActionButton}
                                startIcon={<Upload />}
                                sx={{ 
                                    marginTop: '5px', 
                                    marginLeft: '0px', 
                                    width: '540px', 
                                    height: '50px', 
                                    marginRight: '0px',
                                    backgroundColor: '#609CCF', 
                                    '&:hover': {
                                        backgroundColor: '#568CBA', 
                                    },
                                }}
                                size="medium"
                                onClick={() => {
                                    document.getElementById('file').click();
                                }}
                            >
                                Optional: Upload .stl or .dwg file
                            </Button>
                            </label>

                            <input
                                type="file"
                                id="file"
                                accept=".stl"
                                style={{ display: 'none' }} // Hide the file input
                                onChange={handleFileInputChange}
                                
                            />

                            <Button
                                className={style.siteActionButton}
                                onClick={handleSubmit}
                                variant="contained"
                                color="primary"
                                sx={{ 
                                    width: "260px", 
                                    height: '50px', 
                                    marginTop: "5px", 
                                    marginBottom: "20px", 
                                    marginLeft: "20px",
                                    backgroundColor: '#8B5A73', 
                                    '&:hover': {
                                        backgroundColor: '#784E63', 
                                    },
                                }}
                                disabled={isButtonDisabled}
                                
                                >
                                Submit
                            </Button>
                        </Box>
                        
                        
                    </div>
                    
                </div>
            ) : (
                <div className="form-container" style={{ textAlign: "center", color: "#1b365f", marginRight: "0px", marginTop: '20px' }}>
                    <div>Thank you for your submission.</div>
                    <Button
                        onClick={handleNewSubmission}
                        variant="outlined"
                        style={{ 
                            width: "80%", 
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
        {/* </div> */}
    </Box>
    </>
    );
};
export default PrintingRequest;