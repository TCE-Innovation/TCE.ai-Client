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
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        // width: '200vw',
        // height: '150vh',
        maxWidth: '60%',
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
    const [runType, setRunType] = useState('PullBox'); // Set the default run type
    const [responses, setResponses] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isBoxExpanded, setIsBoxExpanded] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const [expanded, setExpanded] = React.useState('');
  
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
      

    const cro = async () => {
        if (!pullsheet) {
            setError('Conduit list excel file must be provided.');
            return;
        }
        
        // Append user info to FormData to be sent to backend
        const formData = new FormData();    
        
        try {
            // This will be a file
            formData.append('pullsheet', pullsheet);
            console.log("PULLSHEET:", pullsheet);
            formData.append('runType', runType);
            console.log("RUNTYPE:", runType);
        } 
        catch (error) {
            console.log("PULLSHEET:", error)
            setError('Failed to read pull sheet.');
        }

        try{
            // Send form data to backend, receive response within data
            const {data} = await axios.post(
                // Link to where backend is hosted
                'https://tce-cro-api.azurewebsites.net/api/Post-CRO', 
                formData
            );

            // Data length is one because only one file returned
            if (data.length === 1 && data[0] !== null ) {
                // Update state with the first URL only
                setResponses(data[0]);
            } 
            else {
                // Handle other cases where the response is unexpected
                setError('Unexpected response from the server.');
            }
            
        
        // The data received from backend is the URL of the output file
        // setResponse(data);
        }
        catch (error) {
            console.log("AXIOS:", error)
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
                        marginTop: '-30px',
                        marginBottom: '0px',
                        marginLeft: '400px', // Increase marginLeft from 250px to 300px
                        marginRight: '-9px',
                        whitespace: 'nowrap'
                    }}
                >
                    The Pull Box Sizer generates pull box dimensions based on an input conduit list.
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
                    sx={{
                        '& .MuiPaper-root': {
                            maxHeight: '500px', // Adjust as needed
                            overflow: 'auto',
                        },
                    }}
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
                        <Typography style={{ fontWeight: 'bold' }}>How do I differentiate between separate rows of conduits entering the same side of a pull box?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Add a row number after the label for the side that the conduit is entering or exiting the pull box. 
                            For example, assume a pull box where six conduits will enter side A of a pull box. 
                            Three conduits that are to share a row will be denoted as A1, and the other three conduits within their own row will be denoted as A2.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography style={{ fontWeight: 'bold' }}>What type of pull boxes are supported by this tool?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Straight and angle pulls
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                     <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                        <Typography style={{ fontWeight: 'bold' }}>Can this tool size multiple pull boxes within an Excel sheet?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            Yes, to do so you can have a separate "Pull Box" columnn 
                            with pull box labels/numbers to assign conduits to specific pull boxes.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    {/*<Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
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
                

                {/* Upload Pull Sheet box. 
                Wider than previous boxes*/}
                <div style={{ margin: '5px', marginTop: '-15px', marginLeft: "-5px" }}></div>
                <div class="rounded-rectangle-3">
                    <div class="title">Upload Conduit List</div>

                    <Tooltip title={
                            <Typography component="div" style={{ maxWidth: '280px' }}>
                            In order for the tool to work properly, {" "}
                            <Link 
                                href="https://tceaiblob.blob.core.windows.net/cro/Conduit%20List%20TEMPLATE.xlsx?sp=r&st=2024-07-31T18:31:08Z&se=2030-01-02T03:31:08Z&spr=https&sv=2022-11-02&sr=b&sig=7ndgvoRAPmJEmuq7xJZb73GoYOhDf%2BNhUEYJIGgbZok%3D" // Set the URL here
                                style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                                target="_blank"
                                rel="noopener noreferrer"
                                // link through generating SAS 
                            >
                                download
                            </Link>
                            {" "}and use the template.
                        </Typography>
                        
                        } arrow sx={{ fontSize: '2.5em' }}>
                            <InfoOutlinedIcon style={{ position: 'relative', top: -45, left: 810 }} />
                    </Tooltip>

                    <a href="https://tceaiblob.blob.core.windows.net/cro/Conduit%20List%20TEMPLATE.xlsx?sp=r&st=2024-07-31T18:31:08Z&se=2030-01-02T03:31:08Z&spr=https&sv=2022-11-02&sr=b&sig=7ndgvoRAPmJEmuq7xJZb73GoYOhDf%2BNhUEYJIGgbZok%3D">
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            sx={{ 
                                marginTop: '5px', 
                                marginLeft: '0px', 
                                width: '350px', 
                                backgroundColor: '#8B5A73',
                                '&:hover': {
                                    backgroundColor: '#784E63', 
                                },
                            }}
                            size="large"
                        >
                            Download Required template
                        </Button>
                    </a>

                    <label htmlFor="pullsheetInput">
                        <Button
                            variant="contained"
                            startIcon={<Upload />}
                            sx={{ marginTop: '5px', 
                                marginLeft: '60px', 
                                width: '350px',
                                backgroundColor: '#609CCF',
                                '&:hover': {
                                    backgroundColor: '#568CBA', 
                                },
                            }}
                            size="large"
                            onClick={() => {
                                document.getElementById('pullsheetInput').click();
                            }}
                        >
                            Upload Conduit List
                        </Button>
                    </label>

                    <input
                        type="file"
                        id="pullsheetInput"
                        accept=".xlsx, .xls, .csv" // should take all excel files
                        style={{ display: 'none' }} // Hide the file input
                        onChange={(e) => {
                            setPullsheet(e.target.files[0]);
                            setRunType("PullBox");
                        }}
                        
                    />
                        
                </div>
                
                

                {/* GENERATE CABLE RUN Box */}
                <div style={{ margin: '10px' }}></div>
                <div className={isBoxExpanded ? 'rounded-rectangle-2-expanded' : 'rounded-rectangle-2'}></div>

                <Button
                    variant="contained"
                    color="success"
                    sx={{ marginTop: isBoxExpanded ? '-180px' : '-95px', 
                        marginLeft: '0px', 
                        marginBottom: '30px', 
                        width: '325px',
                        backgroundColor: '#8B5A73',
                        '&:hover': {
                            backgroundColor: '#784E63', 
                        },
                    }}
                    size="large"
                    onClick={() => {
                        setIsBoxExpanded(true); // Expand the box
                        cro();                  // Run the cro function
                    }}
                    disabled={!(pullsheet)}
                >
                    <Typography variant="h5">GENERATE</Typography>
                </Button>

            
                {loading ? (
                    <>
                        {console.log("Optimization process started")}
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
                                Click to download Excel File of Generated Pull Box Dimensions
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

            <Box sx={{ marginBottom: '40px' }}></Box>
        </Box>

        
    );
};

export default CRO;