import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
//import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {AuthContext} from "../../firebase/Auth";

const GenerateCorrespondence = () => {
    const [context, setContext] = useState('');
    const [answer, setAnswer] = useState('');
    const [response, setResponse] = useState('');
    const [supportingInfo, setSupportingInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //const [open, setOpen] = useState(false);
    const {currentUser} = useContext(AuthContext);
    //const user = currentUser['_delegate'];

    /*const resetForm = () => {
        setContext('');
        setAnswer('');
        setResponse('');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };*/

    const generateCorr = async () => {
        if (!context.trim()) {
            setError('The context message and response cannot be empty.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const {data: {corrContent}} = await axios.post('http://localhost:3001/api/generate-correspondence', { context, answer, supportingInfo });
            setResponse(corrContent);
        } catch (error) {
            console.log(error)
            setError('Failed to generate correspondence.');
        }
        setLoading(false);
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
                <Typography variant="h2" mb={4} fontSize="40px">
                    Fill out the Fields Below to Generate Your Response
                </Typography>
                <Box component="form" width={1}>
                    <TextField
                        label="First Letter"
                        multiline
                        rows={10}
                        rowsMax={20}
                        fullWidth
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="First Letter"
                    />
                    <TextField
                        label="Second Letter"
                        multiline
                        rows={10}
                        rowsMax={20}
                        fullWidth
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="Second Letter"
                    />
                    <TextField
                        label="Supporting Information"
                        multiline
                        rows={10}
                        rowsMax={20}
                        fullWidth
                        value={supportingInfo}
                        onChange={(e) => setSupportingInfo(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="Supporting Information"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={generateCorr}
                        sx={{ mt: 2 }}
                    >
                        Generate Response
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
                            Generating response...
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
                
                {/*{response && (
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
                )}*/}
            </Box>

        </Box>
    );
};

export default GenerateCorrespondence;
