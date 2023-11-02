//REACT
import React, {useContext, useState} from 'react';

//MUI
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Grid, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,} 
from "@mui/material";

//AUTH
import {AuthContext} from "../../authentication/Auth";

//DEPENDENCIES
import axios from 'axios';

const GenerateEmails = () => {
    const [email, setEmail] = useState('');
    const [purpose, setPurpose] = useState('');
    const [name, setName] = useState('');
    const [style, setStyle] = useState('');
    const [tone, setTone] = useState('');
    const [length, setLength] = useState('');
    
    const [relContext, setRelContext] = useState('');
    const [prevEmail, setPrevEmail] = useState('');

    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const {userName, accessToken} = useContext(AuthContext);

    const resetForm = () => {
        setEmail('');
        setPurpose('');
        setResponse('');
        setName('');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const generateEmail = async () => {
        if (!email.trim() || !purpose.trim()) {
            setError('Recipient email, recipient name, and email purpose cannot be empty.');
            return;
        }

        if (!style.trim() || !tone.trim() || !length.trim()) {
            setError('Style, tone, or length cannot be empty.');
            return;
        }

        setLoading(true);
        setError('');

        try {  
            const {data: {emailContent}} = await axios.post('https://tce-ai-api.azurewebsites.net/api/generate-email', { purpose, recipientName: name, userName, style, tone, length, relContext, prevEmail });
            setResponse(emailContent);
        } catch (error) {
            console.log(error)
            setError('Failed to generate email.');
        }
        setLoading(false);
    };

    //TODO: convert from sendgrid to email.write permissions
    const sendEmail = async () => {
        setOpen(false);
        setError('');
        try {
            const arr = response.split('\n');
            const firstEmptyLineIndex = arr.findIndex(line => line.trim() === '');

            if (firstEmptyLineIndex !== -1) {
                arr.splice(firstEmptyLineIndex, 1);
            }

            const [subject, ...bodyLines] = arr;
            const body = bodyLines.join('\n');

            await axios.post('https://tce-ai-api.azurewebsites.net/api/send-email', { email, subject, body, accessToken});
            alert('Email sent!');
            resetForm();
        } catch (error) {
            setError('Failed to send email.');
            console.log(error)
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '30vh',
                padding: 4,
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <Box  width={1}>
                    <TextField
                        label="Recipient Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2, mr: 2 }}
                        placeholder="i.e., someone@gmail.com"
                    />
                    <TextField
                        label="Recipient Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 2, mr: 2 }}
                        placeholder="Dear (Recipient Name)"
                    />
                    <TextField
                        label="Email Purpose"
                       
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        sx={{ mb: 2, width: '63%' }}
                        placeholder="i.e., Schedule Meeting with Project Manager"
                    />
                    <TextField
                        label="Previous Email Content (optional)"
                        fullWidth
                        value={prevEmail}
                        onChange={(e) => setPrevEmail(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="i.e., previous email content"
                    />
                    <TextField
                        label="Additional Context (optional)"
                        fullWidth
                        value={relContext}
                        onChange={(e) => setRelContext(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="i.e., last meeting we discussed..."
                    />

                <Box component="form" width={1}>
                    <Grid container spacing={1}>
                        <Grid item xs={1.5}>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} required>
                                <FormLabel component="legend" sx={{ fontSize: '1.25rem' }}>Style:</FormLabel>
                                <RadioGroup
                                    aria-label="style"
                                    name="style"
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value)}
                                >
                                    {['N/A', 'Formal', 'Casual', 'Informative'].map((option) => (
                                        <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2, mt: 4.5 }} required>
                                <RadioGroup
                                    aria-label="style"
                                    name="style"
                                    value={style}
                                    onChange={(e) => setStyle(e.target.value)}
                                >
                                    {['Conversational', 'Persuasive', 'Descriptive', 'Technical'].map((option) => (
                                        <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={1.5}>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} required>
                                <FormLabel component="legend" sx={{ fontSize: '1.25rem' }}>Tone:</FormLabel>
                                <RadioGroup
                                    aria-label="tone"
                                    name="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                >
                                    {['N/A', 'Friendly', 'Serious', 'Enthusiastic'].map((option) => (
                                        <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2, mt: 4.5}} required>
                                <RadioGroup
                                    aria-label="tone"
                                    name="tone"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
                                >
                                    {['Humorous',  'Assertive', 'Compassionate', 'Encouraging'].map((option) => (
                                        <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} required>
                                <FormLabel component="legend" sx={{ fontSize: '1.25rem' }}>Length:</FormLabel>
                                <RadioGroup
                                    aria-label="length"
                                    name="length"
                                    value={length}
                                    onChange={(e) => setLength(e.target.value)}
                                >
                                    {['Short', 'Medium', 'Long'].map((option) => (
                                        <FormControlLabel key={option} value={option.toLowerCase()} control={<Radio />} label={option} />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    </Box>


                    <Button
                        variant="contained"
                        color="primary"
                        onClick={generateEmail}
                        sx={{ mt: 2 }}
                    >
                        Generate Email Draft
                    </Button>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}
            >
                {loading ? (
                    <>
                        <CircularProgress />
                        <Typography variant="body2" mt={2}>
                            Generating email...
                        </Typography>
                    </>
                ) : response && (
                    <TextField
                        multiline
                        rows={15}
                        rowsMax={20}
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        InputProps={{ readOnly: !response }}
                    />
                )}
                {error && (
                    <Typography variant="body2" color="error" mt={2}>
                        {error}
                    </Typography>
                )}
                {response && !loading && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                            sx={{ mt: 2 }}
                        >
                            Send Email
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Confirm Sending Email
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    The generated email is a draft that may be unfinished and require additional information. Are you sure you want to send this email?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    No
                                </Button>
                                <Button
                                    onClick={sendEmail}
                                    color="primary"
                                    autoFocus
                                >
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}
            </Box>

        </Box>
    );
};

export default GenerateEmails;
