import React, {useContext, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import {AuthContext} from "../../firebase/Auth";


const ChatPDF = () => {
    const [pdf, setPdf] = useState('');
    const [chat, setChat] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const {currentUser} = useContext(AuthContext);

    const chatPDF = async () => {
        if (!pdf.trim()) {
            setError('PDF file must be provided.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const {data: {chatContent}} = await axios.post('http://localhost:3001/api/chat-pdf', { pdf, chat });
            setResponse(chatContent);
        } catch (error) {
            console.log(error)
            setError('Failed to chat with PDF file.');
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
                    Provide the PDF You Would Like to Chat With
                </Typography>
                
                <Box  width={1}>
                    <TextField
                        label="PDF file"
                        fullWidth
                        value={pdf}
                        onChange={(e) => setPdf(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="pdf path"
                    />
                    <TextField
                        label="Chat"
                        fullWidth
                        value={pdf}
                        onChange={(e) => setChat(e.target.value)}
                        sx={{ mb: 2 }}
                        placeholder="Chat with PDF"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={chatPDF}
                        sx={{ mt: 2 }}
                    >
                        Generate PDF Summary
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
                            Chatting...
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
            </Box>
        </Box>
    );
};

export default ChatPDF;
