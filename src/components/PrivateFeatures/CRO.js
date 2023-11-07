//REACT
import React, {useState} from 'react';
import { Input } from 'reactstrap';

//MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
// Radio buttons for selecting run type
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//DEPENDENCIES
import axios from 'axios';
// import RunTypeRadioButtons from './RunTypeRadioButtons'; // Import the radio buttons component

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
            setResponse(data);
        } catch (error) {
            console.log("HERE:",error)
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

                    {showCableSizeSheet ? (
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
                    ) : null}

                    <Button
                            variant="contained"
                            sx={{ color: 'black', fontWeight: 700, backgroundColor: 'white', '&:hover': { backgroundColor: 'grey' }, marginTop: 4}}
                            onClick={() => {
                                setShowCableSizeSheet(!showCableSizeSheet);
                                if (showCableSizeSheet) {
                                    setCableSizes('standard');
                                }
                            }}
                        >
                            {showCableSizeSheet ? 'Use Standard Cable Sizes Sheet' : 'OPTIONAL: Upload Your Cable Sizes'}
                    </Button>

                    <div style={{ margin: '40px 0' }}></div>

                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Select Run Type</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="Conduit" control={<Radio />} label="Conduit" />
                            <FormControlLabel value="Messenger Bundle" control={<Radio />} label="Messenger Bundle" />
                            <FormControlLabel value="Cable Tray" disabled control={<Radio />} label="Cable Tray" />
                        </RadioGroup>
                    </FormControl>

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


// //REACT
// import React, { useState } from 'react';
// import { Input } from 'reactstrap';

// //MUI
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import CircularProgress from '@mui/material/CircularProgress';

// //DEPENDENCIES
// import axios from 'axios';

// // Move the RunTypeRadioButtons import here from the previous import section
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

// // Define the RunTypeRadioButtons component
// const RunTypeRadioButtons = ({ selectedRunType, setSelectedRunType }) => {
//   return (
//     <FormControl component="fieldset">
//       <FormLabel id="run-type-label">Select Run Type</FormLabel>
//       <RadioGroup
//         aria-labelledby="run-type-label"
//         name="run-type"
//         value={selectedRunType}
//         onChange={(e) => setSelectedRunType(e.target.value)}
//       >
//         <FormControlLabel
//           value="Conduit"
//           control={<Radio />}
//           label="Conduit"
//         />
//         <FormControlLabel
//           value="Messenger Bundle"
//           control={<Radio />}
//           label="Messenger Bundle"
//         />
//         <FormControlLabel
//           value="Cable Tray"
//           control={<Radio />}
//           label="Cable Tray"
//           disabled
//         />
//       </RadioGroup>
//     </FormControl>
//   );
// };

// const CRO = () => {
//   const [pullsheet, setPullsheet] = useState('');
//   const [cableSizes, setCableSizes] = useState('');
//   const [response, setResponse] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showCableSizeSheet, setShowCableSizeSheet] = useState(false);

//   // Add a state variable to manage the selected run type
//   const [selectedRunType, setSelectedRunType] = useState('Conduit');

//   const cro = async () => {
//     // ... (rest of your code)
//   };

//   return (
//     <Box
//       sx={{
//         // ... (styles for the outer box)
//       }}
//     >
//       <Box
//         sx={{
//           // ... (styles for the inner box)
//         }}
//       >
//         <Typography variant="body2" fontSize="20px">
//           {/* ... (your text content) */}
//         </Typography>

//         <label style={{ fontSize: '20px', marginBottom: '10px' }}>
//           Upload Pull Sheet
//         </label>
//         <Input
//           type="file"
//           id="pullsheetInput"
//           accept=".xlsx, .xls"
//           onChange={(e) => setPullsheet(e.target.files[0])}
//         />

//         <RunTypeRadioButtons
//           selectedRunType={selectedRunType}
//           setSelectedRunType={setSelectedRunType}
//         />

//         {/* ... (rest of your code) */}
//       </Box>
//       <Box
//         sx={{
//           // ... (styles for the inner box)
//         }}
//       >
//         {loading ? (
//           <>
//             <CircularProgress />
//             <Typography variant="body2" mt={2}>
//               Optimizing...
//             </Typography>
//           </>
//         ) : response && (
//           <>
//             <a href={response} target="_blank" rel="noopener noreferrer">
//               Click here to download output file
//             </a>
//           </>
//         )}
//         {error && (
//           <Typography variant="body2" color="error" mt={2}>
//             {error}
//           </Typography>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default CRO;
