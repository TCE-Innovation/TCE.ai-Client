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
        <div className='black-container'>
            <br /><br />
            <div className="header">CONTACT US</div>
            <br />
            {!isSubmitted ? (
                <>
                    <div className="form-prompt">
                        Want to learn more? Please fill out the form below to contact TCIG.
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
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                    sx={{ flex: 1, mr: 1, mb: 1, bgcolor: 'black', borderColor: 'white' }}
                                />
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={email}
                                    onChange={handleEmailInputChange}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                    sx={{ flex: 1, mr: 1, mb: 1, bgcolor: 'black', borderColor: 'white' }}
                                />
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    value={phone}
                                    onChange={handlePhoneInputChange}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                    sx={{ flex: 1, mr: 1, mb: 1, bgcolor: 'black', borderColor: 'white' }}
                                />
                                <TextField
                                    id="organization"
                                    label="Organization"
                                    value={organization}
                                    onChange={handleOrganizationInputChange}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                    sx={{ flex: 1, mb: 1, bgcolor: 'black', borderColor: 'white' }} 
                                />
                            </Box>
                            <FormControl fullWidth>
                                <TextField
                                    id="contact-message"
                                    label="Please enter some details about your question or concern"
                                    multiline
                                    rows={4}
                                    value={contactMessage}
                                    onChange={handleContactMessageInputChange}
                                    InputLabelProps={{
                                        style: { color: '#fff' },
                                    }}
                                    InputProps={{
                                        style: { color: '#fff' },
                                    }}
                                    sx={{ bgcolor: 'black', borderColor: 'white' }}
                                />
                            </FormControl>
                            <Box display="flex" justifyContent="flex-end" mt={2} mb={3}>
                                <Button 
                                    onClick={handleSubmit}
                                    disabled={isButtonDisabled}
                                    variant="contained"
                                    sx={{ color: 'white', bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </FormControl>
                    </div>
                </>
            ) : (
                <>
                    <Box sx={{ textAlign: 'center', mt: 5, mb: 10, color: 'white', fontSize: '24px' }}>
                        Thank you for your submission. A TCIG team member will follow up with you.
                    </Box>
                    <Button onClick={handleNewSubmission} sx={{mb:10}}>Submit another contact</Button>
                </>
            )}
        </div>
    );
};

export default ContactUs;
