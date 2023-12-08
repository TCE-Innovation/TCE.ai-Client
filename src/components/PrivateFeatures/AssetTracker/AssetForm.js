import style from './assetForm.module.css';

//REACT
import React, { useState, useContext } from 'react';
import { AuthContext } from "../../../authentication/Auth";

//MUI
import { FormControl, TextField, Button, Box, Select, InputLabel, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

//AIRTABLE
import { sendAssetFormData } from '../../../API Calls/Airtable';
//import { getAssetFormData } from '../../../API Calls/Airtable';

const useStyles = () => ({
    input: {
        color: 'black',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
        },
        '& label.Mui-focused': {
          color: 'black',
        },
        margin: 1,
      },

    button: {
      color: 'white',
      borderColor: 'white',
      borderRadius: '20px',
      fontWeight: 500,
      marginRight: 1,
      backgroundColor: 'none',
      '&:hover': {
        backgroundColor: 'none',
      },
      '&.Mui-disabled': {
        backgroundColor: 'none', 
        borderColor: '#666666',
        color: '#666666',           
      },
    },
    
    box: {
      textAlign: 'center',
      mt: 5,
      mb: 10,
      color: 'white',
      fontSize: '24px',
    },
  });  

const AssetForm = () => {
    //STYLES
    const styles = useStyles();
    
    //STATES
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [item, setItem] = useState('');
    const [project, setProject] = useState('');
    const [reason, setReason] = useState('');
    const [dateNeeded, setDateNeeded] = useState('');     //maybe a date picker or initialize date as today's date
    const [dateReturn, setDateReturn] = useState('');
    
    //useContext for email
    const { userName, userEmail } = useContext(AuthContext);

    //make signature pad


    
    //HANDLER FUNCTIONS
    const handleItemInputChange = (event) => {
        setItem(event.target.value);
    };
    
    const handleProjectInputChange = (event) => {
        setProject(event.target.value);
    };
    
    const handleReasonInputChange = (event) => {
        setReason(event.target.value);
    };
    
    const handleSubmit = () => {
        sendAssetFormData(userName, userEmail, item, project, reason, dateNeeded, dateReturn)
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            })
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
    const itemOptions = ["item1", "item2"]; // Add item options here
    const projectOptions = ["proj1", "proj2"]; // Add project options here



    return (
            <div className={style.formContainer}>
                {!isSubmitted ? (
                    <div className="form-container">
                        <div className={style.formDescription}>
                            DESCRIPTION TEXT HERE
                        </div>
                        <br />
                        <div>
                                <Box display="flex" flexDirection="row">
                                    <FormControl sx={{...styles.input, width: '50%'}}>
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
                                    <FormControl sx={{...styles.input, width: '50%'}}>
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
                                                <MenuItem key={index} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box display="flex" flexDirection="row">
                                    <TextField
                                        id="reason"
                                        label="Reason"
                                        multiline
                                        value={reason}
                                        onChange={handleReasonInputChange}
                                        sx={{...styles.input, width: '100%'}}
                                    />
                                </Box>
                                <Box display="flex" flexDirection="row" marginLeft="7px" marginTop='20px'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Date to Pick Up"
                                            value={dateNeeded}
                                            onChange={(newValue) => {
                                                setDateNeeded(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{ }} />}
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Date to Return"
                                            value={dateReturn}
                                            onChange={(newValue) => {
                                                setDateReturn(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} sx={{}} />}
                                        />
                                    </LocalizationProvider>                            
                                </Box>
                                <Box display="flex" justifyContent="flex-end" mt={2} mb={3}>
                                    <Button 
                                        onClick={handleSubmit}
                                        disabled={isButtonDisabled}
                                        variant="outlined"
                                        endIcon={<SendIcon />} 
                                        sx={styles.button}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                        </div>
                    </div>
                ) : (
                    <div className="form-container">
                        <Box sx={styles.box}>
                            Thank you for your submission. A TCIG team member will follow up with you.
                            <br />
                            <Button 
                                onClick={handleNewSubmission} 
                                variant="outlined" 
                                sx={{ mt: 5, fontWeight:'bold', color: "white" }}
                            >
                                Request another Item
                            </Button>
                        </Box>
                    </div>
                )}
                </div>
    );
};

export default AssetForm;
