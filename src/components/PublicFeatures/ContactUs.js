import React, { useState } from 'react';
import { FormControl, TextField, Button, Box } from '@mui/material';

import { sendPublicFormData } from '../../API Calls/Airtable';

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
            });
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setContactMessage('');
        setName('');
        setEmail('');
        setOrganization('');
        setPhone('');
    };

    const isButtonDisabled = contactMessage.trim() === '' || name.trim() === '' || email.trim() === '' || organization.trim() === '' || phone.trim() === '';

    return (
        <div className='container'>
            <div className="header">CONTACT US</div>
            <br />
            {!isSubmitted ? (
                <>
                    <div className="form-prompt">
                        Please fill out the form below to contact TCIG.
                    </div>
                    <br />
                    <div>
                        <FormControl fullWidth>
                            <Box display="flex" flexDirection="row">
                                <TextField
                                id="name"
                                label="Name"
                                value={name}
                                onChange={handleNameInputChange}
                                aria-describedby="name-helper-text"
                                sx={{ flex: 1, mr: 1, mb: 1 }}
                                />
                                <TextField
                                id="email"
                                label="Email"
                                value={email}
                                onChange={handleEmailInputChange}
                                aria-describedby="email-helper-text"
                                sx={{ flex: 1, mr: 1, mb: 1 }}
                                />
                                <TextField
                                id="phone"
                                label="Phone"
                                value={phone}
                                onChange={handlePhoneInputChange}
                                aria-describedby="phone-helper-text"
                                sx={{ flex: 1, mr: 1, mb: 1 }}
                                />
                                <TextField
                                id="organization"
                                label="Organization"
                                value={organization}
                                onChange={handleOrganizationInputChange}
                                aria-describedby="organization-helper-text"
                                sx={{ flex: 1, mb: 1 }} // Removed mr to align with the container's edge
                                />
                            </Box>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                id="contact-message"
                                label="Please enter some details about your question or concern"
                                multiline
                                rows={4}
                                value={contactMessage}
                                onChange={handleContactMessageInputChange}
                                aria-describedby="contact-message-helper-text"
                            />
                        </FormControl>
                        <Box display="flex" justifyContent="flex-end" mt={2} mb={3}>
                            <Button 
                                onClick={handleSubmit}
                                disabled={isButtonDisabled}
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </div>
                </>
            ) : (
                <>
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                        Thank you for your submission. A TCIG team member will follow up with you.
                    </Box>
                    <Button onClick={handleNewSubmission} sx={{mb:3}}>Submit another contact</Button>
                </>
            )}
        </div>
    );
};

export default ContactUs;
