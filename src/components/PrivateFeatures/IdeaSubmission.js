import React, { useState, useContext } from 'react';
import { FormControl, TextField, Button } from '@mui/material';

import { sendPrivateFormData } from '../../API Calls/Airtable';
import { AuthContext } from "../../authentication/Auth";

const IdeaSubmission = () => {
    const [ideaDescription, setIdeaDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { userName, userEmail } = useContext(AuthContext);

    const handleInputChange = (event) => {
        setIdeaDescription(event.target.value);
    };

    const handleSubmit = () => {
        sendPrivateFormData(userName, userEmail, ideaDescription)
            .then(() => {
                setIsSubmitted(true);
            })
            .catch(error => {
                console.error('Error submitting form data:', error);
            });
    };

    const handleNewSubmission = () => {
        setIsSubmitted(false);
        setIdeaDescription('');
    };

    const isButtonDisabled = ideaDescription.trim() === '';

    return (
        <div className='container'>
            <br />
            {!isSubmitted ? (
                <>
                    <div className="private-form-prompt">
                        Have you identified a problem with a process, tool, or system that you work on? Do you have an idea of how to solve it? Or, have you come across an exciting technology that you would like us to explore?
                    </div>
                    <br />
                    <div>
                        <FormControl fullWidth>
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
                        <Button 
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                        >
                            Submit
                        </Button>
                    </div>
                </>
            ) : (
                <div style={{textAlign:"center", color:"#1b365f"}}>
                    <div>Thank you for your submission. A TCIG team member will follow up with you.</div>
                    <Button style={{width:"12vw", marginTop:"1vw", fontSize:".9vw"}} onClick={handleNewSubmission}>Submit another idea</Button>
                </div>
            )}
        </div>
    );
};

export default IdeaSubmission;
