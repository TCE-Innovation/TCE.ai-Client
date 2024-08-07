import React, { useState, useEffect } from 'react';
import './Clearance.css'; 
import { TextField, InputAdornment, Button } from '@mui/material';
import { calculateClearance } from '../../../data/General';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Clearance = () => {
  const [division, setDivision] = useState('B Division');
  const [H, setH] = useState(' '); // Field for H (in inches)
  const [D, setD] = useState(' '); // Field for D (in inches)
  const [trackType, setTrackType] = useState('curve'); // Tab selection for track type
  const [direction, setDirection] = useState('IN'); // Tab selection for direction
  const [MO, setMO] = useState(' '); // Field for MO (in inches)
  const [SUPER, setSUPER] = useState(' '); // Field for Super Elevation 
  const [R, setR] = useState(0); // Field for R - Radius (in inches)
  const [SE, setSE] = useState(0); // Field for SE - Super Elevation Excess (in inches)
  const [EE, setEE] = useState(0); // Field for EE - End Excess (in inches)
  const [CE, setCE] = useState(0); // Field for CE - Center Excess (in inches)
  const [LLLEMinReq, setLLLEMinReq] = useState(0); // Field for LLLE Minimum Requirement (in inches)
  const [LLLEClearance, setLLLEClearance] = useState(0); // Field for calculated LLLE Clearance (in inches)
  const [clearance, setClearance] = useState(LLLEClearance - LLLEMinReq);
  const [divMaxH, setDivMaxH] = useState(145.625); 
  const [step] = useState(0.125); // standard step size for measurements (1/8")
  const [calculateEnabled, setCalculateEnabled] = useState(false);
  const [state, setState] = useState("INPUT") // [INPUT, RESULTS]
  const [dialogOpen, setDialogOpen] = useState(false);

  const isClearanceGreater = clearance > 0;

  // Function to handle "Offline Mode" button click
  const handleOfflineButtonClick = () => {
    setDialogOpen(true);
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setDialogOpen(false);
  }

  // Function to handle the Download of the iOS instructions PDF
  const handleDownloadPDF = () => {
    const downloadUrl = '/downloads/ClearanceCalculatorSetup.pdf'; 
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', 'Clearance Calculator Setup.pdf'); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // function to handle and properly format changes to the Height input
  const handleHChange = (event) => {
    let { value } = event.target;
    const floatValue = parseFloat(value);
    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    if (value === '' || (regex.test(value) && floatValue >= -0.5 && floatValue <= divMaxH)) {
      if (value === '') { setH(' ') }
      else { setH(value) }
    } else {
      if (floatValue < -0.5) { setH('-0.5'); } 
      else if (floatValue > divMaxH) { setH(divMaxH.toString()); } 
      else { setH(value); }
    }
  };

  // function to return a number formatted to a specific precision
  const formatNumber = (number, precision) => {
    let num;
    try { 
      num = number.toFixed(precision);
      num = parseFloat(num).toString();
    } catch (error) { num = number; }
    return num
  };

  // generalized function used to handle changes and maintain required formatting
  const formatInput = (value) => {
    const floatValue = parseFloat(value);
    let result;
    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    if (value === '' || (regex.test(value) && floatValue >= 0)) {
      if (value === '') { result = ' '; }
      else { result = value; }
    } else {
      if (floatValue < 0) { result = '0'; } 
      else { result = value; }
    }
    return result;
  };

  // function to handle changes to Distance (from GOR) input 
  const handleDChange = (event) => {
    let { value } = event.target;
    setD(formatInput(value));
  };

  // function to handle changes to Middle Ordinate input 
  const handleMOChange = (event) => {
    let { value } = event.target;
    setMO(formatInput(value));
  };

  // function to handle changes to Super Elevation input 
  const handleSUPERChange = (event) => {
    let { value } = event.target;
    setSUPER(formatInput(value));
  };

  // function to handle toggle between track types
  const handleTrackTypeClick = (type) => {
    if (type === 'tangent') { setTrackType('tangent'); } 
    else { setTrackType('curve'); }
  };

  // function to handle toggle between divisions
  const handleDivisionChange = (new_div) => {
    if (new_div === 'A') {
      setDivision('A Division');
      setDivMaxH(145.625);
    } else if (new_div === 'B') {
      setDivision('B Division');
      setDivMaxH(148.4375);
    }
  };

  // function to make calculations by calling API or reset calculator
  const makeCalcs = () => {

    // "RESET" was clicked: Clear Everything
    if (state === 'RESULTS') {

      setState('INPUT');

      // reset all inputs to defaults / empty
      setH(' ');
      setD(' ');
      setMO(' ');
      setSUPER(' ');

      // reset all calculations to 0s
      setR(0.000);
      setSE(0.000);
      setEE(0.000);
      setCE(0.000);
      setLLLEMinReq(0.000);
      setLLLEClearance(0.000);
      setClearance(0.000);

    // "CALCULATE" was clicked: Perform Calculations
    } else if (state === 'INPUT') {

      setState('RESULTS')

      // prepare data format for backend API call
      if (H === ' ') { setH(0); }
      else if (D === ' ') { setD(0); }
      else if (MO === ' ') { setMO(0); }
      else if (SUPER === ' ') { setSUPER(0); }

      // make call to backend API to perform calculation
      const input_object = { division, trackType, direction, H, D, MO, SUPER };
      calculateClearance(input_object)
        .then((response) => {
          const { r, se, ee, ce, minreq, llleclearance, clearance } = response.result_object;
          // update state variables with calcualted values
          setR(r);
          setSE(se);
          setEE(ee);
          setCE(ce);
          setLLLEMinReq(minreq);
          setLLLEClearance(parseFloat(llleclearance));
          setClearance(clearance);
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  };

  // Check if have enough data to make calculation
  useEffect(() => {

    const isNumeric = (value) => {
      return typeof value === 'number' || !isNaN(parseFloat(value))
    };

    const canCalculate = () => {
      if (trackType === 'curve') {
        if (isNumeric(H) && isNumeric(D) && isNumeric(MO) && isNumeric(SUPER)) {
          setCalculateEnabled(true);
        } else { setCalculateEnabled(false); }
      } else if (trackType === 'tangent') {
        if (isNumeric(H) && isNumeric(D) && isNumeric(SUPER)) {
          setCalculateEnabled(true);
        } else { setCalculateEnabled(false); }
      } else { setCalculateEnabled(false); }
    };

    canCalculate();
  }, [H, D, MO, SUPER, trackType]);

  const PWAInstructions = () => (
    <div className='instruction-container'>
      <iframe 
        src="https://scribehow.com/embed/iOS_Clearance_Calculator_Setup__jgcVEhoATXyXwc_cBRrsHg?as=scrollable&skipIntro=true&removeLogo=true"
        width="100%" 
        height="100%" 
        allowfullscreen 
        frameborder="0"
        title='iOS Instructions'
      ></iframe>
    </div>
  );
  
  return (
    <div>
      <div className="description-container">
        <div className="description">
          This tool calculates LLLE clearance based on field measurements. Input your measurements and specifications, click "CALCULATE", and view the calculated values and results.
        </div>
        <Button
          className="offline-button"
          variant="contained"
          size="large"
          onClick={handleOfflineButtonClick}
          sx={{
            backgroundColor: '#8B5A73', 
            '&:hover': {
              backgroundColor: '#784E63', 
            },
          }}
        >
          Access on Mobile
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={handleClose}
          aria-labelledby="dialog-title"
          PaperProps={{
            style: {
              backgroundColor: 'rgba(255, 255, 255)',
              boxShadow: 'none',
              maxWidth: 'sm',
              width: '100%',
            },
          }}
        >
          <DialogTitle id="dialog-title">Mobile Access Guide</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <PWAInstructions />
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* Close button in the dialog */}
            <Button onClick={handleDownloadPDF} color="primary">
              Download as PDF
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <div className="input-container">
          <h2 className={`subtitle ${state === 'RESULTS' ? 'results' : ''}`}>
            Inputs
          </h2>
          <div className={`section-container ${state === 'RESULTS' ? 'results' : ''}`}>
            <div className="inner-container">
              <div className={`small-pill-selector ${state === 'RESULTS' ? 'results' : ''}`}>
                <div
                  className={`tab ${division === 'A Division' ? 'active' : ''}`}
                  onClick={() => handleDivisionChange('A')}
                >
                  A Division
                </div>
                <div
                  className={`tab ${division === 'B Division' ? 'active' : ''}`}
                  onClick={() => handleDivisionChange('B')}
                >
                  B Division
                </div>
                <div className={`slider ${division === 'B Division' ? 'slide-right' : 'slide-left'}`}></div>
              </div>
              <div className={`small-pill-selector ${state === 'RESULTS' ? 'results' : ''}`}>
                <div
                  className={`tab ${trackType === 'tangent' ? 'active' : ''}`}
                  onClick={() => handleTrackTypeClick('tangent')}
                >
                  Tangent Track
                </div>
                <div
                  className={`tab ${trackType === 'curve' ? 'active' : ''}`}
                  onClick={() => handleTrackTypeClick('curve')}
                >
                  Curved Track
                </div>
                <div className={`slider ${trackType === 'curve' ? 'slide-right' : 'slide-left'}`}></div>
              </div>
              <div className={`small-pill-selector ${state === 'RESULTS' ? 'results' : ''}`}>
                <div
                  className={`tab ${direction === 'IN' ? 'active' : ''}`}
                  onClick={() => setDirection('IN')}
                >
                  {trackType !== 'tangent' ? 'Inside of Curve' : 'Side of Lower Rail'}
                </div>
                <div
                  className={`tab ${direction === 'OUT' ? 'active' : ''}`}
                  onClick={() => setDirection('OUT')}
                >
                  {trackType !== 'tangent' ? 'Outside of Curve' : 'Side of Higher Rail'}
                </div>
                <div className={`slider ${direction === 'OUT' ? 'slide-right' : 'slide-left'}`}></div>
              </div>
            </div>
          </div>

          <div id="container">
            <div className="inner-container">
              <div className={`item ${state === 'RESULTS' ? 'results' : ''}`}>
                <TextField
                  label="Height from Top of Rail"
                  type="number"
                  id="height-tor"
                  value={formatNumber(H, 3)}
                  inputProps={{
                    min: -0.5,
                    precision: 3,
                    max: divMaxH,
                    step: step,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  onChange={handleHChange}
                  disabled={`${state === 'RESULTS' ? 'true': ''}`}
                  style={{ width: '90%' }}
                />
              </div>
              <div className={`item ${state === 'RESULTS' ? 'results' : ''}`}>
                <TextField
                  label="Distance from Gauge of Rail"
                  type="number"
                  id="height-gor"
                  value={D}
                  inputProps={{
                    min: 0,
                    precision: 2,
                    max: 1000, // arbitrary max value
                    step: step,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  onChange={handleDChange}
                  disabled={`${state === 'RESULTS' ? 'true': ''}`}
                  style={{ width: '90%' }}
                />
              </div>
              <div className={`item ${state === 'RESULTS' ? 'results' : ''}`}>
                <TextField
                  label="Middle Ordinate"
                  type="number"
                  id="middle-ordinate"
                  value={MO}
                  inputProps={{
                    min: 0,
                    precision: 2,
                    max: 1000, // arbitrary max value
                    step: step,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  disabled={`${trackType === 'tangent' || state === 'RESULTS' ? 'true': ''}`}
                  onChange={handleMOChange}
                  style={{ width: '90%' }}
                  sx={{
                    opacity: trackType === 'tangent' ? 0.3 : 1, 
                    '&:disabled': {
                    opacity: 0.3, 
                    },
                  }}
                />
              </div>
              <div className={`item ${state === 'RESULTS' ? 'results' : ''}`}>
                <TextField
                  label="Super Elevation"
                  type="number"
                  id="super-elevation"
                  value={SUPER}
                  inputProps={{
                    min: 0,
                    precision: 2,
                    max: 1000, // arbitrary max value
                    step: step,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  onChange={handleSUPERChange}
                  disabled={`${state === 'RESULTS' ? 'true': ''}`}
                  style={{ width: '90%' }}
                />
              </div>
              <div className="item">
                <Button
                  variant="contained"
                  size="large"
                  disabled={`${calculateEnabled === false ? 'true': ''}`}
                  onClick={makeCalcs}
                  sx={{
                    width: "90%",
                    height: "100%",
                    backgroundColor: '#8B5A73', 
                    '&:hover': {
                      backgroundColor: '#784E63', 
                    },
                  }}
                >
                  {state === "INPUT" ? 'Calculate' : 'Reset'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={`intermediate-container ${state === 'INPUT' ? 'disabled' : ''}`}>
          <h2 className="calculations"> 
            Calculated Values
          </h2>
          <div id="container">
            <div className="inner-container">
              <div className="calculated-item">
                <TextField
                  label="Radius"
                  type="number"
                  value={formatNumber(R,3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">ft.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                  disabled={`${trackType === 'tangent' ? 'true': ''}`}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="Super Elevation Excess"
                  type="number"
                  value={formatNumber(SE,3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="End Excess"
                  type="number"
                  value={formatNumber(EE,3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                  disabled={`${trackType === 'tangent' ? 'true': ''}`}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="Center Excess"
                  type="number"
                  value={formatNumber(CE,3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                  disabled={`${trackType === 'tangent' ? 'true': ''}`}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`clearance-container ${isClearanceGreater === true ? 'okay' : 'bad'} ${state === 'INPUT' ? 'disabled' : ''}`}>
          <h2 className="calculations">
            Results 
          </h2>
          <div id="container">
            <div className="inner-container">
            </div>
          </div>
          <div id="container">
            <div className="inner-container">
              <div className="calculated-item">
                <TextField
                  label="LLLE Minimum Requirement (Before Excess)"
                  type="number"
                  value={formatNumber(LLLEMinReq, 4)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="LLLE Minimum Requirement (Accounting for Excess)"
                  type="number"
                  value={formatNumber(LLLEClearance,4)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="Calculated Clearance"
                  type="number"
                  value={formatNumber(clearance,4)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    disableUnderline: true,
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '95%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Clearance;