import React, { useState, useContext } from 'react';
import { FormControl, TextField, Button } from '@mui/material';
import TrainLoader from '../General/TrainLoader';

import { sendPrivateFormData } from '../../data/Airtable';
import { AuthContext } from "../../authentication/Auth";

import './submitbutton.css'

const IdeaSubmission = () => {
    const [ideaDescription, setIdeaDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added isLoading state
    const { userName, userEmail } = useContext(AuthContext);

    const handleInputChange = (event) => {
        setIdeaDescription(event.target.value);
    };

    const handleSubmit = () => {
        setIsLoading(true); // Start loading
        sendPrivateFormData(userName, userEmail, ideaDescription)
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setIdeaDescription('');
    };

    const isButtonDisabled = ideaDescription.trim() === '';

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div className='container'>
            <br />
            {isLoading ? (
                // Show loading spinner when form is being submitted
                <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
            ) : !isSubmitted ? (
                // Show form if not submitted and not loading
                <>
                    <div className="private-form-prompt">
                        Have you identified a problem with a process, tool, or system that you work on? Do you have an idea of how to solve it? Or, have you come across an exciting technology that you would like us to explore?
                    </div>
                    <br />
                    <div>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                id="idea-description"
                                label="Please enter a description of your idea or problem."
                                multiline
                                rows={4}
                                value={ideaDescription}
                                onChange={handleInputChange}
                                aria-describedby="idea-description-helper-text"
                            />
                        </FormControl>
                        <button onClick={handleSubmit}
                            className='buttonColored'
                            disabled={isButtonDisabled}>
                            Submit
                        </button>
                    </div>
                </>
            ) : (
                // Show success message if submitted
                <div style={{textAlign:"center", color:"#1b365f"}}>
                    <div>Thank you for your submission. We will follow up with you.</div>
                    <Button style={{ 
                                width: "15vw", 
                                marginTop: "1vw", 
                                fontSize: ".9vw",
                                color: "#1b365f",
                                borderColor: "#1b365f",
                                fontWeight: "500",
                            }} 
                            onClick={handleNewSubmission}>
                        Submit another idea
                    </Button>
                </div>
            )}
        </div>
    );
};

export default IdeaSubmission;
