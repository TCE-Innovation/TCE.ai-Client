import React, { useState } from 'react';
import { FormControl, TextField, Button, Box } from '@mui/material';

import { sendPublicFormData } from '../../../API Calls/Airtable';
import ContactImage from './ContactImage';

import SendIcon from '@mui/icons-material/Send';

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

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [phone, setPhone] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const styles = useStyles();

    const handleContactMessageInputChange = (event) => {
        setContactMessage(event.target.value);
    };

    const handleNameInputChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOrganizationInputChange = (event) => {
        setOrganization(event.target.value);
    };

    const handlePhoneInputChange = (event) => {
        setPhone(event.target.value);
    };

    const handleSubmit = () => {
        sendPublicFormData(name, email, organization, phone, contactMessage)
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            })
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setContactMessage('');
        setName('');
        setEmail('');
        setOrganization('');
        setPhone('');
    };

    const isButtonDisabled = contactMessage.trim() === '' || name.trim() === '' || email.trim() === '';

    return (
        <div className="full-window-component">
            <div className='black-container'>
                <br /><br />
                <div className="header">CONTACT US</div>
                <br />
                <div className='container-contact-us'>
                    <ContactImage />

                {!isSubmitted ? (
                    <div className="form-container">
                        <div className="form-prompt">
                            Please fill out the form below to start a conversation with TCIG.
                        </div>
                        <br />
                        <div>
                            <FormControl fullWidth>
                                <Box display="flex" flexDirection="row">
                                    <TextField
                                        id="name"
                                        label="Name"
                                        variant="filled"
                                        required
                                        value={name}
                                        onChange={handleNameInputChange}
                                        sx={{...styles.input, width: '48.5%'}}
                                    />
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="filled"
                                        required
                                        value={email}
                                        onChange={handleEmailInputChange}
                                        sx={{...styles.input, width: '48.5%'}}
                                    />
                                </Box>
                                <Box display="flex" flexDirection="row">
                                    <TextField
                                        id="phone"
                                        label="Phone"
                                        variant="filled"
                                        value={phone}
                                        onChange={handlePhoneInputChange}
                                        sx={{...styles.input, width: '48.5%'}}
                                    />
                                    <TextField
                                        id="organization"
                                        label="Organization"
                                        variant="filled"
                                        value={organization}
                                        onChange={handleOrganizationInputChange}
                                        sx={{...styles.input, width: '48.5%'}}
                                    />
                                </Box>
                                <FormControl fullWidth>
                                    <TextField
                                        id="contact-message"
                                        label="Please enter some details about your question or concern"
                                        multiline
                                        required
                                        variant="filled"
                                        rows={4}
                                        value={contactMessage}
                                        onChange={handleContactMessageInputChange}
                                        sx={styles.input}
                                    />
                                </FormControl>
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
                            </FormControl>
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
                                Submit another contact
                            </Button>
                        </Box>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
