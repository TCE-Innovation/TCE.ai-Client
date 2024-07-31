//REACT
import React, {useState} from 'react';
// import { Input } from 'reactstrap';
import { Link } from '@mui/material';


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

// Icons
import Upload from '@mui/icons-material/Upload';
import Download from '@mui/icons-material/Download';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Tooltip for on hover info
import Tooltip from '@mui/material/Tooltip';

//DEPENDENCIES
import axios from 'axios';
// import RunTypeRadioButtons from './RunTypeRadioButtons'; // Import the radio buttons component

// FAQ Section
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import QuizIcon from '@mui/icons-material/Quiz';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Switch from '@mui/material/Switch';
// import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
// import MuiAccordionSummary, {
//   AccordionSummaryProps,
// } from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';

import RangeSlider from "./Slider"
import './ConduitMessenger.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        // width: '200vw',
        // height: '150vh',
        maxWidth: '60%', // 80% of viewport width
        height: '75vh'
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
    

const CRO = () => {
    const [pullsheet, setPullsheet] = useState('');
    const [cableSizes, setCableSizes] = useState('standard');
    const [responses, setResponses] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [showCableSizeSheet, setShowCableSizeSheet] = useState(false);
    const [runType, setRunType] = useState('');
    const [conduitSizeRange, setConduitSizeRange] = useState([0.75, 4]);
    // const [areResponsesRendered, setAreResponsesRendered] = useState(false);
    const [isBoxExpanded, setIsBoxExpanded] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [expanded, setExpanded] = React.useState('panel1');
  
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
      
    

    // Pass the state and the setter function as props to the Slider component
    <RangeSlider value={conduitSizeRange} setValue={setConduitSizeRange} />

    const handleRunTypeChange = (event) => {
        setRunType(event.target.value);
      };

    const handleCableSizesChange = (event) => {
        setCableSizes(event.target.value);
    };

    // const handleFAQClickOpen = () => {
    //     openFAQ(true);
    // };

    // const handleFAQClickClose = () => {
    //     openFAQ(false);
    // };

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
        
        try {
            // This will be a file
            formData.append('pullsheet', pullsheet);
        } 
        catch (error) {
            console.log("PULLSHEET:",error)
            setError('Failed to read pull sheet.');
        }

        try{
            // This may be a file or the string 'standard'
            formData.append('cableSizes', cableSizes);
        }
        catch (error) {
            console.log("CABLESIZES:",error)
            setError('Failed to read cable sizes.');
        }

        try{
            // This will be a string
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
                // Link to where backend is hosted
                'https://tce-cro-api.azurewebsites.net/api/Post-CRO', 
                formData
            );

            // If the backend returns only two URLs and the third URL is None (conduit optimization)
            if (data.length === 2 && data[0] !== null && data[1] !== null) {
                // Update state with the first URL only
                setResponses([data[0], data[1]]);
            } 

            // If backend returns three URLs (messenger bundle optimization)
            else if (data.length === 3) {
                // Update state with both URLs
                setResponses(data);
            } 
            
            else {
                // Handle other cases where the response is unexpected
                setError('Unexpected response from the server.');
            }
            
        
        // The data received from backend is the URL of the output file
        // setResponse(data);
        }
        catch (error) {
            console.log("AXIOS:",error)
            setError('Failed to generate output file.');
        }
        setLoading(false);

    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '110px',
    };

    // useEffect(() => {
    //     if (responses[0] || responses[1] || responses[2]) {
    //         setAreResponsesRendered(true);
    //     }
    // }, [responses]);

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
                    marginBottom: 4,
                    backgroundColor: 'transparent',
                }}

                
            >   
            <Box display="flex" flexDirection="row" alignItems="center">
                {/* Intro text */}
                <Typography
                    variant="body2"
                    fontSize="20px"
                    
                    style={{ 
                        paddingBottom: '10px', 
                        marginLeft: '350px', // Increase marginLeft from 250px to 300px
                        marginRight: '25px'
                    }}
                >
                    The Cable Run Optimizer is for generating conduit or messenger bundle cable runs.
                </Typography>


                {/* FAQ Section */}
                <Button
                    variant="contained"
                    startIcon={<QuizIcon />}
                    style={{ 
                        marginLeft: '290px', 
                        marginTop: '-px', 
                        backgroundColor: '#8B5A73',
                        width: '110px', // Set the fixed width
                        height: '42px', // Set the fixed height
                    }}
                    onClick={handleClickOpen}
                >
                    FAQ
                </Button>
                </Box>
                
                <BootstrapDialog
                    fullscreen
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle style={{ textAlign: 'center' }}>Frequently Asked Questions</DialogTitle>

                    {/* <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                    </IconButton> */}
                    <DialogContent dividers>
                    <div>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>How does the logic work for creating conduits?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Cables are added to conduit until the maximum fill of 40% for regular runs 
                            or 35% for high bend runs is reached.
                            If a potential cable wouldn't fit a conduit, all smaller cables are tested to
                            see if they would fit. If no cables can be added to a conduit, a new conduit is created.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography>How does the logic work for creating messenger bundles?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Cables are added to bundle until the maximum bundle diameter of 6 inches or
                            maximum bundle weight of 20 lb/ft is reached.
                            If a potential cable wouldn't fit a bundle, all smaller cables are tested to
                            see if they would fit. If no cables can be added to a bundle, a new bundle is created.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography>What information is relevant for cable sizes?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            For conduit, the diameter is used. For messenger bundles, the diameter and weight is used.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                    <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                    <Typography>How is the diameter of messenger bundles calculated?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        The diameter calculation is a rough approximation. 
                        The outermost cable that is placed within the bundle is used to dicatate 
                        the diameter approximation of the bundle. So if the outermost cable in a bundle 
                        is placed two inches away from the center, and its radius is 0.5 inches so the outermost distance 
                        of a cable from the center is 2.5 inches, then the diameter is said to be about 5 inches.
                    </Typography>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                            <Typography>How would I get a cable to be put at the bottom of the bundle?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            Within your pull sheet, you can add a column called "Bottom/Top of Bundle" and
                            set the value to "Bottom" for the cable you want to be placed at the bottom of the bundle.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
                            <Typography>What are the formatting requirements for the cable pull sheet?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            <ul>
                                    <li>.xlsx format required</li>
                                    <li>Required Columns:
                                        <ul>
                                            <li>Pull number</li>
                                            <li>Size</li>
                                            <li>Start Stationing</li>
                                            <li>End Stationing</li>
                                        </ul>
                                    </li>
                                    <li>Optional Columns:
                                        <ul>
                                            <li>Express</li>
                                            <li>Trade</li>
                                            <li>Coil Length</li>
                                            <li>High Bend</li>
                                            <li>Bottom/Top of Bundle</li>
                                        </ul>
                                    </li>
                                </ul>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/* <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
                        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
                            <Typography>Accordion 7</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Content for Accordion 7
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
                        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
                            <Typography>Accordion 8</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Content for Accordion 8
                            </Typography>
                        </AccordionDetails>
                    </Accordion> */}
                    </div>
                    </DialogContent>
                    <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    </DialogActions>
                </BootstrapDialog>
                {/* </div> */}


                {/* Box to set direction to row for Run Type Selection 
                and Cable Size Selection to be stacked horizontally */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginBottom: 4,
                        backgroundColor: 'transparent',
                    }}
                >   
                    {/* Run Type Selection box */}
                    <div className="rounded-rectangle-1">
                        <div className="title">Select Run Type</div>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="select-cable-run-type"
                                name="conduit-messenger-selection"
                                value={runType}
                                onChange={handleRunTypeChange}
                                style={{ marginLeft: '40px' }}
                            >
                                {/* Radio Buttons to Selects Run Type */}
                                <FormControlLabel value="Conduit" control={<Radio />} label="Conduit" />
                                <FormControlLabel value="Messenger" control={<Radio />} label="Messenger Bundle" />
                            </RadioGroup>
                        </FormControl>

                        {/* Show slider if Conduit radio button selected */}
                        <div style={{ marginTop: '20px', marginLeft: '12px' }}>
                            <RangeSlider value={conduitSizeRange} setValue={setConduitSizeRange} disabled={runType !== 'Conduit'} />
                        </div>
                    </div>
                                    
                    {/* Cable Size Selection box */}
                    <div className="rounded-rectangle-1">
                        <div className="title">Choose Cable Sizes</div>
                        <Tooltip title={
                            <Typography noWrap={false}>
                                If you are using custom cable sizes, then you must {" "}  
                                 <Link 
                                    href="https://tceaiblob.blob.core.windows.net/cro/Cable%20Sizes.xlsx?sp=r&st=2024-05-03T15:21:21Z&se=2050-05-03T23:21:21Z&sv=2022-11-02&sr=b&sig=mFQQaFmy2Hz%2Bppt0s1zrJjbQlfzZpz1BVqiTRMw5wvw%3D" // Set the URL here
                                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                     download the default cables sizes Excel
                                </Link>
                                {" "}and edit the cable sizes to match your project.
                            </Typography>
                        } arrow sx={{ fontSize: '2.5em' }}>
                            <InfoOutlinedIcon style={{ position: 'relative', top: -40, left: 330 }} />
                        </Tooltip>
                        <FormControl style={{ marginTop: '10px', marginLeft: '-30px', marginBottom: '20px' }}>
                            <RadioGroup
                                row
                                aria-labelledby="select-cable-sizes"
                                name="cable-size-selection"
                                value={cableSizes}
                                onChange={handleCableSizesChange}
                                style={{ marginLeft: '60px' }}
                            >
                                <FormControlLabel
                                    value="standard"
                                    control={<Radio />}
                                    label={
                                        <>
                                            Use{' '}
                                            <Link
                                                href="https://judlauent.sharepoint.com/:x:/s/TCEInnovation/EURdOokWyJJHlbIbEP30nAABJkBs5a53xp3VMeFYUtVtrg?e=ediMR2" // Set the URL here
                                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                default cable sizes
                                            </Link>
                                        </>
                                    }
                                />
                                {/* <FormControlLabel value="custom" control={<Radio />} label="Upload custom cable sizes" /> */}
                            </RadioGroup>
                        </FormControl>
                        
                            <>
                                <label htmlFor="cableSizesInput">
                                    <Button
                                        variant="contained"
                                        startIcon={<Upload />}
                                        style={{ marginTop: '8px', marginLeft: '45px' }}
                                        onClick={() => {
                                            document.getElementById('cableSizesInput').click();
                                        }}
                                    >
                                        Upload Custom Cable Sizes
                                    </Button>
                                </label>
                                <input
                                    type="file"
                                    id="cableSizesInput"
                                    accept=".xlsx, .xls"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        setCableSizes('custom');         // Set cableSizes to 'custom'
                                        setCableSizes(e.target.files[0]) // Call a function to handle the file upload
                                    }}
                                />
                            </>
                        
                    </div>
                </Box>

                {/* Upload Pull Sheet box. 
                Wider than previous boxes*/}
                <div style={{ margin: '5px' }}></div>
                <div class="rounded-rectangle-3">
                    <div class="title">Upload Pull Sheet</div>

                    <Tooltip title={
                            <Typography component="div" style={{ minWidth: '300px' }}>
                                Input your cables within the pull sheet template to be read properly by the tool
                                                    
                            </Typography>
                        } arrow sx={{ fontSize: '2.5em' }}>
                            <InfoOutlinedIcon style={{ position: 'relative', top: -45, left: 810 }} />
                    </Tooltip>

                    <a href="https://tceaiblob.blob.core.windows.net/cro/Cable%20Pull%20Sheet%20Template.xlsx?sp=r&st=2024-05-03T13:54:51Z&se=2050-05-03T21:54:51Z&sv=2022-11-02&sr=b&sig=GMWzScbnQ0QHQHbAHgRC%2BCenfeBJxwucXY3eAE6fRCQ%3D">
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            style={{ marginTop: '5px', marginLeft: '0px', width: '350px', backgroundColor: '#8B5A73'}}
                            size="large"
                        >
                            Download Pull Sheet template
                        </Button>
                    </a>

                    <label htmlFor="pullsheetInput">
                        <Button
                            variant="contained"
                            startIcon={<Upload />}
                            style={{ marginTop: '5px', marginLeft: '60px', width: '350px' }}
                            size="large"
                            onClick={() => {
                                document.getElementById('pullsheetInput').click();
                            }}
                        >
                            Upload Pull Sheet
                        </Button>
                    </label>

                    <input
                        type="file"
                        id="pullsheetInput"
                        accept=".xlsx, .xls"
                        style={{ display: 'none' }} // Hide the file input
                        onChange={(e) => setPullsheet(e.target.files[0])}
                        
                    />
                        
                </div>
                
                

                {/* GENERATE CABLE RUN Box */}
                <div style={{ margin: '20px' }}></div>
                <div className={isBoxExpanded ? 'rounded-rectangle-2-expanded' : 'rounded-rectangle-2'}></div>

                <Button
                    variant="contained"
                    color="success"
                    style={{ marginTop: isBoxExpanded ? '-180px' : '-95px', marginLeft: '0px', marginBottom: '10px', width: '325px' }}
                    size="large"
                    onClick={() => {
                        setIsBoxExpanded(true); // Expand the box
                        cro();                  // Run the cro function
                    }}
                    disabled={!(pullsheet && runType)}
                >
                    <Typography variant="h5">GENERATE</Typography>
                </Button>

            
                {loading ? (
                    <>
                        <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
                        <Typography variant="body2" mt={-2.5}>
                            Optimizing...
                        </Typography>
                    </>
                ) : (
                    <>
                        
                        {responses[0] && (
                        <>
                            <a
                                href={responses[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'block', marginLeft: '10px', marginTop: '10px' }}
                            >
                                Click to download Excel File of Optimized Runs
                            </a>
                        </>
                        )}
                        {responses[1] && (
                        <>
                            <a
                                href={responses[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'block', marginLeft: '10px', marginTop: '10px', }}
                            >
                                Click to download Cable Run Visualization
                            </a>
                        </>
                        )}
                        {responses[2] && (
                        <>
                            <a
                                href={responses[2]}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'block', marginLeft: '10px', marginTop: '10px' }}
                            >
                                Click to download PDF File of Bundle Images
                            </a>
                        </>
                        )}
                        {error && (
                            <Typography variant="body2" color="error" mt={0.1}>
                                {error}
                            </Typography>
                        )}
                    </>

                )}
                
                {/* </div> */}

                
            </Box>
        </Box>
    );
};

export default CRO;