//REACT
import React, {useState} from 'react';
import { Input } from 'reactstrap';

//MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

//DEPENDENCIES
import axios from 'axios';


const CRO = () => {
    const [pullsheet, setPullsheet] = useState('');
    const [cableSizes, setCableSizes] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCableSizeSheet, setShowCableSizeSheet] = useState(false);

    const cro = async () => {
        if (!pullsheet) {
            setError('Pull Sheet excel file must be provided.');
            return;
        }

        //allowing no cable size sheet to be passed, if none then use standard cable sizes
        if (!cableSizes) {
            setCableSizes('standard');
        }
        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            //this will always be a file
            formData.append('pullsheet', pullsheet);

            //this may be a file or the string 'standard'
            formData.append('cableSizes', cableSizes);

            const {data} = await axios.post(
                'https://tce-cro-api.azurewebsites.net/api/Post-CRO', 
                formData
            );

            /*const {data} = await axios.post(
                'http://localhost:7071/api/Post-CRO', 
                formData
            );*/
            
            setResponse(data);
        } catch (error) {
            console.log(error)
            setError('Failed to generate optimized cable run.');
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
                    marginBottom: 4
                }}
            >
                <Typography variant="h2" mb={4} fontSize="40px">
                    Cable Run Optimizer
                </Typography>
                
                <Box width={1}>
                    <label style={{ fontSize: '20px', marginBottom: '10px'}}>
                        Upload Pull Sheet
                    </label>
                    <Input
                        type="file"
                        id="pullsheetInput"
                        accept=".xlsx, .xls"
                        onChange={(e) => setPullsheet(e.target.files[0])}
                    />

                    {showCableSizeSheet ? (
                        <>
                            <label style={{ fontSize: '20px', marginTop: '40px', marginBottom: '10px' }}>
                                Upload Cable Sizes Sheet
                            </label>
                            <Input
                                type="file"
                                id="cableSizesInput"
                                accept=".xlsx, .xls"
                                onChange={(e) => setCableSizes(e.target.files[0])}
                            />
                        </>
                    ) : null}


                    <Button
                            color="primary"
                            onClick={() => setShowCableSizeSheet(!showCableSizeSheet)}
                            sx={{ marginTop: '20px' }} 
                        >
                            {showCableSizeSheet ? 'Use Standard Cable Sizes Sheet' : 'Upload Cable Sizes'}
                    </Button>


                    <Box sx={{ marginTop: 2, marginLeft: 1 }}>
                        <Typography variant="body2">
                            <a
                                href="https://judlauent.sharepoint.com/:x:/s/TCEInnovation/EURdOokWyJJHlbIbEP30nAABJkBs5a53xp3VMeFYUtVtrg?e=2B52Jn"
                                style={{ fontSize: '18px' }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Sample Cable Size Sheet
                            </a>
                        </Typography>
                        <Typography variant="body2">
                            <a
                                href="https://judlauent.sharepoint.com/:x:/s/TCEInnovation/EZVQRA2hvqhKo5pNCVpzeUEBBY8JngxgWLmPe6NvSxgk8A?e=W3dtY6"
                                style={{ fontSize: '18px', mt: 2 }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Pull Sheet Template
                            </a>
                        </Typography>
                    </Box>
                    <Box sx={{ marginTop: 4}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={cro}
                            sx={{ }}
                        >
                            Generate Optimized Cable Run
                        </Button>
                    </Box>
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
                            Optimizing...
                        </Typography>
                    </>
                ) : response && (
                    <>
                        <a href={response} target="_blank" rel="noopener noreferrer">
                            Click here to download output file
                        </a>
                    </>
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

export default CRO;
