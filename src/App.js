import React, { useState, useEffect } from 'react';
import {
  TextField, InputAdornment, Button, Dialog, DialogActions,
  DialogContent, DialogTitle, Tabs, Tab, Snackbar, Alert, Box
} from '@mui/material';
import { isBrowser } from 'react-device-detect';
import { storageManager } from './utils/storageManager';
import ConnectionStatus from './components/ConnectionStatus';
import SavedCalculations from './components/SavedCalculations';
import StorageManager from './components/StorageManager';
import ServiceWorkerStatus from './components/ServiceWorkerStatus';
import './App.css'; // Import CSS file

// TabPanel component for Tab navigation
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}   
      className={`tab-panel tab-panel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Clearance = () => {
  const [division, setDivision] = useState('B Division');
  const [H, setH] = useState(' '); // Field for H (in inches)
  const [D, setD] = useState(' '); // Field for D (in inches)
  const [MO, setMO] = useState(' '); // Field for MO (in inches)
  const [SE, setSE] = useState(0); // Field for SE - Super Elevation Excess (in inches)
  const [trackType, setTrackType] = useState('curve'); // Tab selection for track type
  const [direction, setDirection] = useState('IN'); // Tab selection for direction
  const [SUPER, setSUPER] = useState(' '); // Field for Super Elevation 
  const [R, setR] = useState(0); // Field for R - Radius (in inches)
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
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [calculationName, setCalculationName] = useState('');
  const [storageWarning, setStorageWarning] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  // Load saved calculations on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      // Check storage status
      const isLow = await storageManager.isStorageLow();
      if (isLow) {
        setStorageWarning({
          show: true,
          message: "Storage space is running low. Consider exporting and deleting older calculations."
        });
      }

      // Load saved calculations 
      try {
        const storedCalculations = localStorage.getItem('savedCalculations');
        if (storedCalculations) {
          setSavedCalculations(JSON.parse(storedCalculations));
        }
      } catch (error) {
        console.error("Error loading saved calculations:", error);
      }
    }; 

    loadSavedData();
  }, []);

  // Add this effect to your App component

  // Listen for storage updates
  useEffect(() => {
      const handleStorageUpdate = async () => {
          // Check storage status
          const isLow = await storageManager.isStorageLow();
          if (isLow) {
              setStorageWarning({
                  show: true,
                  message: "Storage space is running low. Consider exporting and deleting older calculations."
              });
          }
          
          // Load saved calculations
          try {
              const storedCalculations = localStorage.getItem('savedCalculations');
              if (storedCalculations) {
                  setSavedCalculations(JSON.parse(storedCalculations));
              }
          } catch (error) {
              console.error("Error loading saved calculations:", error);
          }
      };
      
      window.addEventListener('storageUpdate', handleStorageUpdate);
      
      return () => {
          window.removeEventListener('storageUpdate', handleStorageUpdate);
      };
  }, []);

  const saveCalculation = async () => {
    // Create calculation object 
    const newCalculation = {
      id: Date.now(),
      name: calculationName || `Calculation ${savedCalculations.length +1}`,
      timestamp: new Date().toISOString(),
      inputs: {
        division,
        H,
        D,
        MO,
        SUPER,
        trackType,
        direction
      },
      results: {
        R,
        SE,
        EE,
        CE,
        LLLEMinReq,
        LLLEClearance,
        clearance
      }
    };

    const updatedCalculations = [...savedCalculations, newCalculation];

    // Check if we can save this safely
    const saveResult = await storageManager.saveCalculations(updatedCalculations);

    if (saveResult.success) {
      setSavedCalculations(updatedCalculations);
      setShowSaveDialog(false);
      setCalculationName('');
    } else {
      // Handle storage limit issue
      setStorageWarning({
        show: true,
        message: "Storage space is full. Please export and delete some calculations."
      });

      // Try to free up space
      const cleanupResult = await storageManager.performStorageCleanup();
      if (cleanupResult.success) {
        // Retry save after cleanup 
        const retrySaveResult = await storageManager.saveCalculations([
          ...savedCalculations.slice(cleanupResult.removedCount),
          newCalculation
        ]);

        if (retrySaveResult.success) {
          setSavedCalculations([
            ...savedCalculations.slice(cleanupResult.removedCount),
            newCalculation
          ]);
          setShowSaveDialog(false);
          setCalculationName('');
          setStorageWarning({
            show: true,
            message: `Storage cleanup removed ${cleanupResult.removedCount} old calculations to free up space.`
          });
        }
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const isClearanceGreater = clearance > 0;

  const findNearestKey = (map, key) => {
    const keys = Object.keys(map).map(Number).sort((a, b) => a - b);
    let nearestKey = keys.reduce((prev, curr) => Math.abs(curr - key) < Math.abs(prev - key) ? curr : prev);
    return map[nearestKey];
  };

  const handleHChange = (event) => {
    let { value } = event.target;

    // Regular expression to allow up to 3 digits after decimal
    const regex = /^-?\d*\.?\d{0,3}$/;
    
    if (value === '' || (regex.test(value) && parseFloat(value) >= -0.5 && parseFloat(value) <= divMaxH)) {
      if (value === '') { 
        setH(' ') 
      } else { 
        setH(value) 
      }
    } else {
      if (parseFloat(value) < -0.5) {
        setH('-0.5')
      } else if (parseFloat(value) > divMaxH) {
        setH(divMaxH.toString());
      } else { 
        // If more than 3 decimal places are entered, truncate the extra digits
        const truncatedValue = parseFloat(value).toFixed(3);
        setH(truncatedValue); 
      }
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
      newDivMaxH = 142.3125;
    } else if (new_div === 'B') {
      newDivision = 'B Division';
      newDivMaxH = 148.4375;
    }
    setDivision(newDivision);
    setDivMaxH(newDivMaxH);
  };

  const handleFocus = (e) => {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.body.style.touchAction = 'none';  // Disable scrolling
  };

  const handleBlur = () => {
    document.body.style.touchAction = 'auto';  // Re-enable scrolling
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

  useEffect(() => {
    // TODO: Change for web testin
    if (isBrowser) {
      setShowMobileWarning(false);
    }
  }, []);

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

  
  // CSS Styles for the Mobile Warning Popup
  const mobileWarningStyles = `
  /* Assuming this is in a CSS file linked to your React component */
  body {
      background-image: url('/images/blurred_subway_map.png'); 
      background-size: cover; 
      background-position: center; 
      height: 100vh; 
      margin: 0; 
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .mobile-warning {
      background-color: rgba(255, 255, 255, 0.50); 
      padding: 50px;
      border: 1px solid #ccc;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      display: flex;
      flex-direction: column; 
      align-items: center;
      min-height: 10vh; 
      min-width: 10vw; 
  }

  .popup-content h2 {
      font-size: 38px; 
      font-weight: bold; 
  }

  .popup-content p {
      font-size: 16px; 
  }

  .popup-content {
      text-align: center;
  }

  .container-style {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 10px;
      height: 200px;
      transform: rotate(180deg);
  }
  `;
  
  // Popup component for mobile warning
  const MobileWarningPopup = () => (
      <div className="mobile-warning">
          <div className="popup-content">
              <h2>This page is designed for mobile viewing.</h2>
              <p>
                To use the calculator on your computer or learn how to download the tool on your mobile device, visit{' '}
                <a href="https://www.tce.tools/private/clearance-calculator" target="_blank" rel="noopener noreferrer">
                  tce.tools/private/clearance-calculator
                </a>
              </p>
          </div>
      </div>
  );

  React.useEffect(() => {
    if (isBrowser) {
        const styleTag = document.createElement('style');
        styleTag.textContent = mobileWarningStyles;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }
  });

  return (
    <div className="pwa-calculator-container">
      <ConnectionStatus />
      <ServiceWorkerStatus />

      {showMobileWarning ? (
        <MobileWarningPopup />
      ) : (
        <div>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Calculator" />
            <Tab label="Saved Calculations" />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <div className="calculator-container">
              <div className="pwa-input-container">
                <div className={`pwa-section-container ${state === 'RESULTS' ? 'results' : ''}`}>
                  <div className="pwa-side-by-side">
                    <div className={`pwa-small-pill-selector ${state === 'RESULTS' ? 'results' : ''}`}>
                      <div
                        className={`pwa-tab ${division === 'A Division' ? 'active' : ''}`}
                        onClick={() => handleDivisionChange('A')}
                      >
                        A Division
                      </div>
                      <div
                        className={`pwa-tab ${division === 'B Division' ? 'active' : ''}`}
                        onClick={() => handleDivisionChange('B')}
                      >
                        B Division
                      </div>
                      <div className={`pwa-slider ${division === 'B Division' ? 'slide-right' : 'slide-left'}`}></div>
                    </div>
                    <div className={`pwa-small-pill-selector ${state === 'RESULTS' ? 'results' : ''}`}>
                      <div
                        className={`pwa-tab ${trackType === 'tangent' ? 'active' : ''}`}
                        onClick={() => handleTrackTypeClick('tangent')}
                      >
                        Tangent Track
                      </div>
                      <div
                        className={`pwa-tab ${trackType === 'curve' ? 'active' : ''}`}
                        onClick={() => handleTrackTypeClick('curve')}
                      >
                        Curved Track
                      </div>
                      <div className={`pwa-slider ${trackType === 'curve' ? 'slide-right' : 'slide-left'}`}></div>
                    </div>
                    <div className={`pwa-small-pill-selector ${state === 'RESULTS' ? 'results' : ''}`}>
                      <div
                        className={`pwa-tab ${direction === 'IN' ? 'active' : ''}`}
                        onClick={() => setDirection('IN')}
                      >
                        {trackType !== 'tangent' ? 'Inside of Curve' : 'Side of Lower Rail'}
                      </div>
                      <div
                        className={`pwa-tab ${direction === 'OUT' ? 'active' : ''}`}
                        onClick={() => setDirection('OUT')}
                      >
                        {trackType !== 'tangent' ? 'Outside of Curve' : 'Side of Higher Rail'}
                      </div>
                      <div className={`pwa-slider ${direction === 'OUT' ? 'slide-right' : 'slide-left'}`}></div>
                    </div>
                  </div>
                </div>

                <div id="container">
                  <div className="pwa-inner-container">
                    <div className={`pwa-item ${state === 'RESULTS' ? 'results' : ''}`}>
                      <TextField
                        label="Height from TOR"
                        type="number"
                        id="height-tor"
                        value={formatNumber(H, 3)}
                        inputProps={{
                          inputMode: "decimal",
                          min: -0.5,
                          precision: 3,
                          max: divMaxH,
                          step: hStep,
                          style: { textAlign: 'center' }
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">in.</InputAdornment>,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleHChange}
                        disabled={state === 'RESULTS'}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className={`pwa-item ${state === 'RESULTS' ? 'results' : ''}`}>
                      <TextField
                        label="Distance from GOR"
                        type="number"
                        id="height-gor"
                        value={D}
                        inputProps={{
                          inputMode: "decimal",
                          min: 0,
                          precision: 2,
                          max: 1000, // arbitrary max value
                          step: dStep,
                          style: { textAlign: 'center' }
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">in.</InputAdornment>
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleDChange}
                        disabled={state === 'RESULTS'}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className={`pwa-item ${state === 'RESULTS' ? 'results' : ''}`}>
                      <TextField
                        label="Middle Ordinate"
                        type="number"
                        id="middle-ordinate"
                        value={MO}
                        inputProps={{
                          inputMode: "decimal",
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
                        onFocus={handleFocus}
                        onBlur={handleBlur}
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
                    <div className={`pwa-item ${state === 'RESULTS' ? 'results' : ''}`}>
                      <TextField
                        label="Super Elevation"
                        type="number"
                        id="super-elevation"
                        value={SUPER}
                        inputProps={{
                          inputMode: "decimal",
                          min: 0,
                          precision: 2,
                          max: 1000, // arbitrary max value
                          step: superStep,
                          style: { textAlign: 'center' }
                        }}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">in.</InputAdornment>
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleSUPERChange}
                        disabled={state === 'RESULTS'}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div className="pwa-item">
                      <Button
                        variant="contained"
                        size="large"
                        disabled={calculateEnabled === false}
                        onClick={updateCalcs}
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: calculateEnabled ? '#003EAB' : '#D3D3D3', 
                          '&:hover': {
                            backgroundColor: calculateEnabled ? '#00328A' : '#1D469E', 
                          },
                        }}
                      >
                        {state === "INPUT" ? 'Calculate' : 'Reset'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`pwa-result-container ${isClearanceGreater === true ? 'okay' : 'bad'} ${state === 'INPUT' ? 'disabled' : ''}`}>
                <div id="container">
                  <div className="pwa-inner-container">
                    <div className="pwa-calculated-item">
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
                    <div className="pwa-calculated-item">
                      <TextField
                        label="Super Elev. Excess"
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
                    <div className="pwa-calculated-item">
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
                    <div className="pwa-calculated-item">
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
                  <div className="pwa-inner-container">
                    <div className="pwa-calculated-item">
                      <TextField
                        label="LLLE (without Excess)"
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
                    <div className="pwa-calculated-item">
                      <TextField
                        label="LLLE (with Excess)"
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
                    <div className="pwa-calculated-item">
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
                  <div className="pwa-item save-button-container">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setShowSaveDialog(true)}
                      disabled={state !== 'RESULTS'}
                      className="save-calculation-button"
                      sx={{
                        width: "100%",
                        height: "100%",
                        fontSize: "1rem",
                        backgroundColor: state === 'RESULTS' ? '#9c27b0' : '#D3D3D3', // Use your secondary color here
                        '&:hover': {
                          backgroundColor: state === 'RESULTS' ? '#7B1FA2' : '#D3D3D3', // Darker variant for hover
                        },
                        opacity: state === 'RESULTS' ? 1 : 0.7,
                      }}
                    >
                      Save This Calculation
                    </Button>
                  </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <div className="saved-calculations-layout">
              <div className="saved-calculations-container">
                <SavedCalculations
                  savedCalculations={savedCalculations}
                  setSavedCalculations={setSavedCalculations}
                />
              </div>
              <div className="storage-manager-container">
                <StorageManager
                  savedCalculations={savedCalculations}
                  setSavedCalculations={setSavedCalculations}
                />
              </div>
            </div>
          </TabPanel>

          <Snackbar
            open={storageWarning?.show}
            autoHideDuration={6000}
            onClose={() => setStorageWarning(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
          >
            <Alert
              onClose={() => setStorageWarning(null)}
              severity="warning"
              sx={{ width: '100%' }}
            >
              {storageWarning?.message}
            </Alert>
          </Snackbar>

          <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)}>
            <DialogTitle>Save Calculation</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Calculation Name"
                type="text"
                fullWidth
                value={calculationName}
                onChange={(e) => setCalculationName(e.target.value)}
                placeholder={`Calculation ${savedCalculations.length + 1}`}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
              <Button onClick={saveCalculation} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Clearance;