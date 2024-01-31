//REACT
import React, {useState} from 'react';
import { Input } from 'reactstrap';

//MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TrainLoader from '../../General/TrainLoader';
// Radio buttons for selecting run type
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//DEPENDENCIES
import axios from 'axios';
// import RunTypeRadioButtons from './RunTypeRadioButtons'; // Import the radio buttons component

import RangeSlider from "./Slider"

const CRO = () => {
    const [pullsheet, setPullsheet] = useState('');
    const [cableSizes, setCableSizes] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCableSizeSheet, setShowCableSizeSheet] = useState(false);
    const [runType, setRunType] = useState('');
    // Define the state in the parent component
    const [conduitSizeRange, setConduitSizeRange] = useState([0.75, 4]);

    // Pass the state and the setter function as props to the Slider component
    <RangeSlider value={conduitSizeRange} setValue={setConduitSizeRange} />

    const handleRunTypeChange = (event) => {
        setRunType(event.target.value);
      };

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
        
        // Append user info to FormData to be sent to backend
        const formData = new FormData();
        
        // Breaking up try clause into a part for every formData.append
        try {

            //this will always be a file
            formData.append('pullsheet', pullsheet);
        } 
        catch (error) {
            console.log("PULLSHEET:",error)
            setError('Failed to read pull sheet.');
        }

        try{
            //this may be a file or the string 'standard'
            formData.append('cableSizes', cableSizes);
        }
        catch (error) {
            console.log("CABLESIZES:",error)
            setError('Failed to read cable sizes.');
        }

        try{
            formData.append('runType', runType)
        }
        catch (error) {
            console.log("RUNTYPE:",error)
            setError('Failed to read run type.');
        }

        try{
            // conduitSizeRange is an array, first index is the lower value
            formData.append('conduitSizeRangeLower', conduitSizeRange[0])
            formData.append('conduitSizeRangeHigher', conduitSizeRange[1])
            
        }
        catch (error) {
            console.log("CONDUIT_RANGE:",error)
            setError('Failed to read conduit size range.');
        }

        try{
            // Send form data to backend, receive response within data
            const {data} = await axios.post(
                'https://tce-cro-api.azurewebsites.net/api/Post-CRO', 
                formData
            );
        
        // The data received from backend is the URL of the output file
        setResponse(data);
        }
        catch (error) {
            console.log("AXIOS:",error)
            setError('Failed to generate output file.');
        }
        setLoading(false);

        // try {
        //     // Append user info to FormData to be sent to backend
        //     const formData = new FormData();
        //     //this will always be a file
        //     formData.append('pullsheet', pullsheet);

        //     //this may be a file or the string 'standard'
        //     formData.append('cableSizes', cableSizes);
            
        //     formData.append('runType', runType)
            
        //     // conduitSizeRange is an array, first index is the lower value
        //     formData.append('conduitSizeRangeLower', conduitSizeRange[0])
        //     formData.append('conduitSizeRangeHigher', conduitSizeRange[1])
            
        //     // Send form data to backend, receive response within data
        //     const {data} = await axios.post(
        //         'https://tce-cro-api.azurewebsites.net/api/Post-CRO', 
        //         formData
        //     );
        //     // The data received from backend is the URL of the output file
        //     setResponse(data);
        // } catch (error) {
        //     console.log("HERE:",error)
        //     setError('Failed to generate optimized cable run.');
        // }
        // setLoading(false);
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
                <Typography variant="body2"  fontSize="20px">
                    The Cable Run Optimizer tool helps engineers efficiently plan conduit and messenger bundle runs based on input cable pull sheet information. 
                </Typography>

                <Typography variant="body2" mb={4} fontSize="20px">
                    With an input cable pull sheet, the tool generates an Excel spreadsheet that lists conduits/bundles, the cables inside them, and their respective sizes. 
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
                    <Typography variant="body2" mb={4} mt={5}fontSize="18px">
                        NOTE: This tool defaults to using cable sizes and weights from cut sheets that may be different from the cut sheets for your job. Before using this tool, verify that the cable parameters (diameter for conduits, diameter and weight for messenger bundles) in the Cable Sizes.xlsx file match the parameters from your cable cut sheets.  
                        If they are different, you must upload an Excel file with your cable parameters in addition to your cable pull sheet. The Excel must follow the same format as the&nbsp;                      
                        <a
                            href="https://judlauent.sharepoint.com/:x:/s/TCEInnovation/EURdOokWyJJHlbIbEP30nAABJkBs5a53xp3VMeFYUtVtrg?e=2B52Jn"
                            style={{ fontSize: '18px' }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sample Cable Size Sheet
                        </a>
                        &nbsp; and the pull sheet must follow the same format as the&nbsp;
                        <a
                            href="https://judlauent.sharepoint.com/:x:/s/TCEInnovation/EZVQRA2hvqhKo5pNCVpzeUEBBY8JngxgWLmPe6NvSxgk8A?e=W3dtY6"
                            style={{ fontSize: '18px', mt: 2 }}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pull Sheet Template
                        </a>.
                    </Typography>

                    {/* {showCableSizeSheet ? (
                        <>
                            <label style={{ fontSize: '20px', marginBottom: '10px' }}>
                                Upload Cable Sizes Sheet
                            </label>
                            <Input
                                type="file"
                                id="cableSizesInput"
                                accept=".xlsx, .xls"
                                onChange={(e) => setCableSizes(e.target.files[0])}
                            />
                        </>
                    ) : null} */}

                    <Button
                            variant="contained"
                            sx={{ color: 'black', 
                            fontWeight: 700, 
                            backgroundColor: 'white', 
                            '&:hover': { backgroundColor: theme => theme.palette.grey[500] }, 
                            marginTop: 0

                            }}
                            onClick={() => {
                                setShowCableSizeSheet(!showCableSizeSheet);
                                if (showCableSizeSheet) {
                                    setCableSizes('standard');
                                }
                            }}
                        >
                            {showCableSizeSheet ? 'Use Standard Cable Sizes Sheet' : 'OPTIONAL: Upload Your Cable Sizes'}
                    
                    </Button>
                    {/* <div style={{ marginTop: '20px' }}></div> */}

                    {showCableSizeSheet ? (
                        <>
                            {/* <label style={{ fontSize: '20px', marginTop: '5px', marginLeft: '-275px'}}>
                                Upload Cable Sizes Sheet
                            </label> */}
                            <div style={{ margin: '20px' }}></div>
                            <label style={{ fontSize: '20px', marginTop: '5px', marginLeft: '5px', marginBottom: '10px'}}>
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

                    <div style={{ margin: '40px 0' }}></div>
                    
                    <FormControl>
                        <FormLabel id="select-cable-run-type">Select Run Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="select-cable-run-type"
                            name="conduit-messenger-selection"
                            value={runType}
                            onChange={handleRunTypeChange}
                        >
                            <FormControlLabel value="Conduit" control={<Radio />} label="Conduit" />
                            <FormControlLabel value="Messenger" control={<Radio />} label="Messenger Bundle" />
                            <FormControlLabel value="CMRS" disabled control={<Radio />} label="CMRS" />
                            <FormControlLabel value="Tray" disabled control={<Radio />} label="Cable Tray" />
                        </RadioGroup>
                    </FormControl>
                    
                    {/* <div style={{ marginTop: '20px', marginLeft: '12px' }}>
                        {runType === 'Conduit' && <Slider />}
                    </div> */}

                    <div style={{ marginTop: '20px', marginLeft: '12px' }}>
                        {runType === 'Conduit' && <RangeSlider value={conduitSizeRange} setValue={setConduitSizeRange} />}
                    </div>

                    {/* <div>
                        Selected Run Type: {runType}
                    </div> */}

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
                        <TrainLoader />
                        <Typography variant="body2" mt={2}>
                            Optimizing...
                        </Typography>
                    </>
                // If the 'response' state variable exists and is truthy, a hyperlink is rendered.
                // This hyperlink points to the URL stored in 'response' and opens in a new tab or window.
                // The text for the hyperlink is "Click here to download output file".
                // The 'rel' attribute with "noopener noreferrer" value is a security measure to prevent the new page from accessing the window.opener property and ensures it runs in a separate process.
                // The '<>' and '</>' are shorthand for a React Fragment, allowing us to group multiple elements without adding an extra node to the DOM.
                ) : response && (
                    <>
                        {/* response is the output excel file */}
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
