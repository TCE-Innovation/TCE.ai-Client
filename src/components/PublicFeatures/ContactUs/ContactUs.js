import style from './contactUs.module.css';
import React, { useState } from 'react';

//MUI
import { FormControl, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

//COMPONENTS
import ContactImage from './ContactImage';
import Footer from '../Footer';
import PublicTrainLoader from '../../Public/PublicTrainLoader';

//UTILS
import { sendPublicFormData } from '../../../data/Airtable';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [phone, setPhone] = useState('');
    const [contactMessage, setContactMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true); // Set loading to true on submit

        sendPublicFormData(name, email, organization, phone, contactMessage)
            .then(() => {
                // Use setTimeout to delay the submission state
                setTimeout(() => {
                    setIsSubmitted(true);
                    setIsLoading(false); // Reset loading to false after 3 seconds
                }, 2000);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
                setIsLoading(false); // Ensure loading is false if there's an error
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

    const isButtonDisabled = contactMessage.trim() === '' || name.trim() === '' || email.trim() === '';

    return (
        <div className="full-window-component">
            <div className='black-container'>
                <div className={style.containerContactUs}>
                    <ContactImage />

                    {!isSubmitted ? (
                        <div className={style.formContainer}>
                            {!isLoading ? (
                                <>
                                    <div className={style.formHeader}>
                                        Get in touch
                                    </div>
                                    <div className={style.formPrompt}>
                                        Please submit the form below to start a conversation with us.
                                    </div>
                                    <br />
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
                                                style={{ margin: '.5vw' }}
                                            />
                                            <TextField
                                                id="email"
                                                label="Email"
                                                variant="filled"
                                                required
                                                value={email}
                                                onChange={handleEmailInputChange}
                                                className={style.input}
                                                style={{ margin: '.5vw' }}
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
                                                style={{ margin: '.5vw' }}
                                            />
                                            <TextField
                                                id="organization"
                                                label="Organization"
                                                variant="filled"
                                                value={organization}
                                                onChange={handleOrganizationInputChange}
                                                className={style.input}
                                                style={{ margin: '.5vw' }}
                                            />
                                        </Box>
                                        <FormControl>
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
                                                style={{ margin: '.5vw' }}
                                            />
                                        </FormControl>
                                        <Box display="flex" justifyContent="flex-end" mt={2} mr={'1vw'}>
                                            <Button 
                                                onClick={handleSubmit}
                                                disabled={isButtonDisabled}
                                                variant="outlined"
                                                endIcon={<SendIcon />} 
                                            >
                                                Submit
                                            </Button>
                                        </Box>                                       
                                    </FormControl>                      
                                </>
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                                    <PublicTrainLoader />
                                </Box>
                            )}
                        </div>
                    ) : (
                        <div className={style.formContainer}>
                            <Box className={style.box}>
                                Thank you for your submission. <br/> We will be in touch soon.
                                <br />
                                <Button 
                                    onClick={handleNewSubmission} 
                                    variant="outlined" 
                                    sx={{ mt: 5, fontWeight:'bold', color: "white" }}
                                >
                                    Submit again
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
