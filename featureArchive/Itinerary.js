import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import {Grid} from "@mui/material";
import '../../App.css';
import axios from "axios";

const Itinerary = () => {
    const [events, setEvents] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const generateItinerary = async () => {
        if (!events.trim() || !date.trim()) {
            setError('Itinerary events list and date of itinerary cannot be empty.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const {data: {itineraryContent}} = await axios.post('https://tce-ai-api.azurewebsites.net/api/generate-itinerary', { events, date, startTime, endTime });
            setResponse(itineraryContent);
        } catch (error) {
            setError('Failed to generate itinerary.');
        }
        setLoading(false);
    };

    //send itinerary feature (not used)
    /*const sendItinerary = async () => {
        setOpen(false);
        setError('');
        try {
            const arr = response.split('\n');
            const firstEmptyLineIndex = arr.findIndex(line => line.trim() === '');

            if (firstEmptyLineIndex !== -1) {
                arr.splice(firstEmptyLineIndex, 1);
            }

            const [date, ...bodyLines] = arr;
            const body = bodyLines.join('\n');

            await axios.post('https://tce-ai-api.azurewebsites.net/api/send-email', { email, subject: date, body});
            alert('Email sent!');
            resetForm();
        } catch (error) {
            setError('Failed to send email.');
        }
    };*/

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
                <Typography variant="h2" mb={4} fontSize="40px">
                    What events or activities do you have coming up?
                </Typography>
                <Box component="form" width={1}>
                    <TextField
                        label="Date"
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="i.e., tomorrow"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                            label="Start Time"
                            fullWidth
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="i.e., 8:00AM"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                            label="End Time"
                            fullWidth
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            sx={{ mb: 2 }}
                            placeholder="i.e., 4:00PM"
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Events and Activities"
                        fullWidth
                        value={events}
                        onChange={(e) => setEvents(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="Meet with Project Manager, Call IT regarding issue, ..."
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={generateItinerary}
                        sx={{ mt: 2 }}
                    >
                        Generate Itinerary
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
                            Generating itinerary...
                        </Typography>
                    </>
                ) : response && (
                    <TextField
                        multiline
                        rows={15}
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

                {/* email itinerary feature (not used)*/}
                {/*{response && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                            sx={{ mt: 2 }}
                        >
                            Send to Email
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Email Itinerary
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Enter an email address to send this itinerary to:
                                </DialogContentText>
                                <TextField
                                    label="Recipient Email"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{ mb: 2 }}
                                    placeholder="i.e., someone@gmail.com"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Back
                                </Button>
                                <Button
                                    onClick={sendItinerary}
                                    color="primary"
                                    autoFocus
                                >
                                    Email Itinerary
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )}*/}
            </Box>

        </Box>
    );
};

export default Itinerary;