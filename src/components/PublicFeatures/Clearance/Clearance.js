import React, { useState, useEffect } from 'react';
import './Clearance.css'; // Import CSS file
import { TextField, InputAdornment, Button } from '@mui/material';
import { isBrowser, isMobile, isTablet } from 'react-device-detect';

const Clearance = () => {
  const [division, setDivision] = useState('A Division');
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
  const [hStep] = useState(0.125);
  const [dStep] = useState(0.125);
  const [moStep] = useState(0.125);
  const [superStep] = useState(0.125);
  const [A_height_to_clearance, setATranslate] = useState({0:33.875});
  const [B_height_to_clearance, setBTranslate] = useState({0:35.125});
  const [calculateEnabled, setCalculateEnabled] = useState(false);
  const [state, setState] = useState("INPUT") // [INPUT, RESULTS]
  const [res1Label, setRes1Label] = useState('LLLE (without Excess)')
  const [res2Label, setRes2Label] = useState('LLLE (with Excess)')

  const isClearanceGreater = clearance > 0;

  const findNearestKey = (map, key) => {
    const keys = Object.keys(map).map(Number).sort((a, b) => a - b);
    let nearestKey = keys.reduce((prev, curr) => Math.abs(curr - key) < Math.abs(prev - key) ? curr : prev);
    return map[nearestKey];
  };

  const handleHChange = (event) => {
    let { value } = event.target;
    const floatValue = parseFloat(value);
    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    if (value === '' || (regex.test(value) && floatValue >= -0.5 && floatValue <= divMaxH)) {
      if (value === '') { setH(' ') }
      else { setH(value) }
    } else {
      if (floatValue < -0.5) {
        setH('-0.5')
      } else if (floatValue > divMaxH) {
        setH(divMaxH.toString());
      } else { setH(value) }
    }
  };

  const formatNumber = (number, precision) => {
    let num;
    try {
      num = number.toFixed(precision)
    } catch (error) {
      num = number;
    }
    return num
  }

  const handleDChange = (event) => {
    let { value } = event.target;
    const floatValue = parseFloat(value);
    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    if (value === '' || (regex.test(value) && floatValue >= 0)) {
      if (value === '') { setD(' ') }
      else { setD(value) }
    } else {
      if (floatValue < 0) {
        setD('0')
      } else { setD(value) }
    }
  };

  const handleMOChange = (event) => {
    let { value } = event.target;
    const floatValue = parseFloat(value);
    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    if (value === '' || (regex.test(value) && floatValue >= 0)) {
      if (value === '') { setMO(' ') }
      else { setMO(value) }
    } else {
      if (floatValue < 0) {
        setMO('0')
      } else { setMO(value) }
    }
  };

  const handleSUPERChange = (event) => {
    let { value } = event.target;
    const floatValue = parseFloat(value);
    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    if (value === '' || (regex.test(value) && floatValue >= 0)) {
      if (value === '') { setSUPER(' ') }
      else { setSUPER(value) }
    } else {
      if (floatValue < 0) {
        setSUPER('0')
      } else { setSUPER(value) }
    }
  };

  const handleTrackTypeClick = (type) => {
    if (type === 'tangent') {
      setTrackType('tangent');
    } else {
      setTrackType('curve');
    }
  };

  const handleDivisionChange = (new_div) => {
    let newDivision;
    let newDivMaxH; 
    if (new_div === 'A') {
      newDivision = 'A Division';
      newDivMaxH = 145.625;
    } else if (new_div === 'B') {
      newDivision = 'B Division';
      newDivMaxH = 148.4375;
    }
    setDivision(newDivision);
    setDivMaxH(newDivMaxH);
  };

  const updateCalcs = () => {

    if (state === 'RESULTS') {
      setState('INPUT');

      // reset all inputs to defaults / empty
      /*setDivision('A Division');
      setTrackType('curve');
      setDirection('IN');*/
      setH(' ');
      setD(' ');
      setMO(' ');
      setSUPER(' ');

      // reset all calculations to 0s
      setR(0);
      setSE(0.000);
      setEE(0.000);
      setCE(0.000);
      setLLLEMinReq(0.000);
      setLLLEClearance(0.000);
      setClearance(0.000);

    } else if (state === 'INPUT') {
      setState('RESULTS')

      // Define calculations to update and later be set
      let r, se, ee, ce, minreq, llleclearance, clearance;

      // Update the LLLE Min Req based on new division (if there is one)
      if (division === 'A Division') {
        if (A_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 145.625) {
          minreq = A_height_to_clearance[H];
        } else if (H >= -0.5 && H <= 145.625) {
          minreq = findNearestKey(A_height_to_clearance, H);
        }
      } else if (division === 'B Division') {
        if (B_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 148.625) {
          minreq = B_height_to_clearance[H];
        } else if (H >= -0.5 && H <= 148.4375) {
          minreq = findNearestKey(B_height_to_clearance, H);
        }
      }

      if (H === ' ') { setH(0) }
      else if (D === ' ') { setD(0) }
      else if (MO === ' ') { setMO(0) }
      else if (SUPER === ' ') { setSUPER(0) }

      // TANGENT TRACK CALCULATIONS
      if (trackType === 'tangent') {
        r = 0;
        ee = 0;
        ce = 0;

        // calc SE based on side of track
        if (direction === 'IN') {
          se = (-1 * SUPER * H) / 56.5;
        } else if (direction === "OUT") {
          se = (SUPER * H) / 56.5;
        } else {
          se = 0;
        }

        // calc clearance based on D, se
        if (direction === 'IN' || direction === 'OUT') {
          llleclearance = parseFloat(minreq) + parseFloat(se);
        } else {
          llleclearance = parseFloat(minreq);
        }
      
      // CURVED TRACK CALCULATIONS
      } else {
        if (MO !== 0) {
          r = (1.5 * 2500) / parseFloat(MO);
        } else {
          r = 0;
        }

        if (!(isFinite(r))) {
          r = 0;
        }

        // Calculate se based on direction and SUPER
        if (direction === 'IN') {
          se = (parseFloat(SUPER) * parseFloat(H)) / 56.5;
        } else if (direction === "OUT") {
          se = (-1 * parseFloat(SUPER) * parseFloat(H)) / 56.5;
        } else {
          se = 0;
        }

        // Calculate ce and ee based on r and direction
        if (r !== 0 && division === "A Division") {
          if (direction === 'IN') {
            ce = 1944 / r;
            ee = 0;
          } else if (direction === 'OUT') {
            ee = 1512 / r;
            ce = 0;
          } else {
            ce = 0;
            ee = 0;
          }
        } else if (r !== 0 && division === "B Division") {
          if (direction === 'IN') {
            ce = 4374 / r;
            ee = 0;
          } else if (direction === 'OUT') {
            ee = 2945 / r;
            ce = 0;
          } else {
            ce = 0;
            ee = 0;
          }
        } else {
          ce = 0;
          ee = 0;
        }
        
        // Calculate llleclearance based on direction
        if (direction === 'IN' || direction === 'OUT') {
          llleclearance = parseFloat(minreq) + parseFloat(se) + parseFloat(ce) + parseFloat(ee);
        } else {
          llleclearance = parseFloat(minreq);
        }
      }

      clearance = D - llleclearance

      // Update state values
      setR(r);
      setSE(se);
      setEE(ee);
      setCE(ce);
      setLLLEMinReq(minreq);
      setLLLEClearance(parseFloat(llleclearance));
      setClearance(clearance);

    }
  };

  // Check if have enough data to make calculation
  useEffect(() => {

    const isNumeric = (value) => {
      return typeof value === 'number' || !isNaN(parseFloat(value))
    }

    const canCalculate = () => {
      if (trackType === 'curve') {
        if (isNumeric(H) && isNumeric(D) && isNumeric(MO) && isNumeric(SUPER)) {
          setCalculateEnabled(true)
        } else {
          setCalculateEnabled(false)
        }
      } else if (trackType === 'tangent') {
        if (isNumeric(H) && isNumeric(D) && isNumeric(SUPER)) {
          setCalculateEnabled(true)
        } else {
          setCalculateEnabled(false)
        }
      } else {
        setCalculateEnabled(false)
      }
    };

    canCalculate()
  }, [H, D, MO, SUPER, trackType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/translations.json'); 
        if (!response.ok) {
          throw new Error('Failed to fetch translations.json');
        }
        const jsonData = await response.json();

        // Extract the mappings
        const divA_height_to_clearance = jsonData.A_Division || {};
        const divB_height_to_clearance = jsonData.B_Division || {};

        // Set the state with the mappings
        setATranslate(divA_height_to_clearance);
        setBTranslate(divB_height_to_clearance);

      } catch (error) {
        console.error('Error fetching or parsing translations.json:', error);
      }
    };
    
    fetchData();
  }, []); 

  useEffect(() => {
    const handleResize = () => {
      if (isBrowser) {
        setRes1Label("LLLE Minimum Requirement (Before Excess)");
        setRes2Label("LLLE Minimum Requirement (Accounting for Excess)");
      } else {
        setRes1Label("LLLE (without Excess)");
        setRes2Label("LLLE (with Excess)");
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="calculator-container" style={{ backgroundColor: isMobile || isTablet ? '#B4D8F7' : 'transparent' }}>
      <div>
        <div className="input-container">
          <div className={`section-container ${state === 'RESULTS' ? 'results' : ''}`}>
            <div className="side-by-side">
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
                    step: hStep,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  onChange={handleHChange}
                  disabled={state === 'RESULTS'}
                  style={{ width: '100%' }}
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
                    step: dStep,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  onChange={handleDChange}
                  disabled={state === 'RESULTS'}
                  style={{ width: '100%' }}
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
                    step: moStep,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  disabled={trackType === 'tangent' || state === 'RESULTS'}
                  onChange={handleMOChange}
                  style={{ width: '100%' }}
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
                    step: superStep,
                    style: { textAlign: 'center' }
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>
                  }}
                  onChange={handleSUPERChange}
                  disabled={state === 'RESULTS'}
                  style={{ width: '100%' }}
                />
              </div>
              <div className="item">
                <Button
                  variant="contained"
                  size="large"
                  disabled={calculateEnabled === false}
                  onClick={updateCalcs}
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: calculateEnabled ? '#1D469E' : '#D3D3D3', 
                    '&:hover': {
                      backgroundColor: calculateEnabled ? '#173880' : '#1D469E', 
                    },
                    }}
                >
                  {state === "INPUT" ? 'Calculate' : 'Reset'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={`result-container ${isClearanceGreater === true ? 'okay' : 'bad'} ${state === 'INPUT' ? 'disabled' : ''}`}>
          <h2 className="calculations"> 
            Calculated Values and Results
          </h2>
          <div id="container">
            <div className="inner-container">
              <div className="calculated-item">
                <TextField
                  label="Radius"
                  type="number"
                  value={R.toFixed(3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">ft.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                  disabled={trackType === 'tangent'}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="Super Elevation Excess"
                  type="number"
                  value={SE.toFixed(3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="End Excess"
                  type="number"
                  value={EE.toFixed(3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                  disabled={trackType === 'tangent'}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="Center Excess"
                  type="number"
                  value={CE.toFixed(3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                  disabled={trackType === 'tangent'}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div id="container">
            <div className="inner-container">
              <div className="calculated-item">
                <TextField
                  label={res1Label}
                  type="number"
                  value={formatNumber(LLLEMinReq, 4)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label={res2Label}
                  type="number"
                  value={LLLEClearance.toFixed(3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                  readOnly
                />
              </div>
              <div className="calculated-item">
                <TextField
                  label="Calculated Clearance"
                  type="number"
                  value={clearance.toFixed(3)}
                  InputProps={{
                    style: { textAlign: 'center' },
                    endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                    inputProps: {
                      readOnly: true,
                      style: { textAlign: 'center', cursor: 'default' }
                    }
                  }}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clearance;