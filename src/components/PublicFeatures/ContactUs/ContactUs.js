import style from './contactUs.module.css';
import React, { useState } from 'react';
import { FormControl, TextField, Button, Box } from '@mui/material';

import { sendPublicFormData } from '../../../API Calls/Airtable';
import ContactImage from './ContactImage';
import Footer from '../Footer';

import SendIcon from '@mui/icons-material/Send';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [phone, setPhone] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

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
                <div className={style.containerContactUs}>
                    <ContactImage />

                {!isSubmitted ? (
                    <div className={style.formContainer}>
                        <div className={style.formHeader}>
                            Get in touch
                        </div>
                        <div className={style.formPrompt}>
                            Please fill out the form below to start a conversation with us.
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
                                        className={style.input}
                                        style={{ margin: '8px' }}
                                    />
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="filled"
                                        required
                                        value={email}
                                        onChange={handleEmailInputChange}
                                        className={style.input}
                                        style={{ margin: '8px' }}
                                    />
                                </Box>
                                <Box display="flex" flexDirection="row">
                                    <TextField
                                        id="phone"
                                        label="Phone"
                                        variant="filled"
                                        value={phone}
                                        onChange={handlePhoneInputChange}
                                        className={style.input}
                                        style={{ margin: '8px' }}
                                    />
                                    <TextField
                                        id="organization"
                                        label="Organization"
                                        variant="filled"
                                        value={organization}
                                        onChange={handleOrganizationInputChange}
                                        className={style.input}
                                        style={{ margin: '8px' }}
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
                                        className={style.inputWide}
                                        style={{ margin: '8px' }}
                                    />
                                </FormControl>
                                <Box display="flex" justifyContent="flex-end" mt={2} mb={3}>
                                    <Button 
                                        onClick={handleSubmit}
                                        disabled={isButtonDisabled}
                                        variant="outlined"
                                        endIcon={<SendIcon />} 
                                        className={style.button}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </FormControl>
                        </div>
                    </div>
                ) : (
                    <div className={style.formContainer}>
                        <Box sx={style.box}>
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
                <Footer />
            </div>
        </div>
    );
};

export default ContactUs;
