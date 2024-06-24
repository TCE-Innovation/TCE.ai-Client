import React, { useState, useEffect } from 'react';
import './Clearance.css'; // Import CSS file
import { TextField, InputAdornment } from '@mui/material';
import * as XLSX from 'xlsx';

const Clearance = () => {
  const [division, setDivision] = useState('A Division (IRT)');
  const [H, setH] = useState(0); // Field for H (in inches)
  const [D, setD] = useState(0); // Field for D (in inches)
  const [trackType, setTrackType] = useState('curve'); // Tab selection for track type
  const [direction, setDirection] = useState('IN'); // Tab selection for direction
  const [MO, setMO] = useState(0); // Field for MO (in inches)
  const [SUPER, setSUPER] = useState(0); // Field for Super Elevation 
  const [R, setR] = useState(0); // Field for R - Radius (in inches)
  const [SE, setSE] = useState(0); // Field for SE - Super Elevation Excess (in inches)
  const [EE, setEE] = useState(0); // Field for EE - End Excess (in inches)
  const [CE, setCE] = useState(0); // Field for CE - Center Excess (in inches)
  const [LLLEMinReq, setLLLEMinReq] = useState(33.875); // Field for LLLE Minimum Requirement (in inches)
  const [LLLEClearance, setLLLEClearance] = useState(0); // Field for calculated LLLE Clearance (in inches)
  const [clearance, setClearance] = useState(LLLEClearance - LLLEMinReq);
  const [divMaxH, setDivMaxH] = useState(145.625); 
  const [hStep] = useState(0.125);
  const [dStep] = useState(0.125);
  const [moStep] = useState(0.125);
  const [superStep] = useState(0.125);
  const [A_height_to_clearance, setATranslate] = useState({0:33.875});
  const [B_height_to_clearance, setBTranslate] = useState({0:35.125});

  const isClearanceGreater = LLLEClearance > LLLEMinReq;
  const clearanceClassName = `${isClearanceGreater ? 'greater-clearance' : 'lesser-clearance'}`

  const findNearestKey = (map, key) => {
    const keys = Object.keys(map).map(Number).sort((a, b) => a - b);
    let nearestKey = keys.reduce((prev, curr) => Math.abs(curr - key) < Math.abs(prev - key) ? curr : prev);
    return map[nearestKey];
  };

  const handleHChange = (event) => {
    let newH = event.target.value;
    if (newH > divMaxH) {
      newH = divMaxH;
    }
    setH(formatNumber(newH));
  }

  const formatNumber = (number) => {
    let num;
    try {
      num = number.toFixed(3)
    } catch (error) {
      num = number;
    }
    return num
  }

  const handleDChange = (event) => {
    setD(event.target.value);
  }

  const handleMOChange = (event) => {
    setMO(event.target.value);
  }

  const handleSUPERChange = (event) => {
    setSUPER(event.target.value);
  }

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
      newDivision = 'A Division (IRT)';
      newDivMaxH = 145.625;
    } else if (new_div === 'B') {
      newDivision = 'B Division (IND / BMT)';
      newDivMaxH = 148.4375;
    }
    setDivision(newDivision);
    setDivMaxH(newDivMaxH);
  };

  useEffect(() => {
    const updateCalcs = () => {

      // Define calculations to update and later be set
      let r, se, ee, ce, minreq, llleclearance, clearance;

      // Update the LLLE Min Req based on new division (if there is one)
      if (division === 'A Division (IRT)') {
        if (A_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 145.625) {
          minreq = A_height_to_clearance[H];
        } else if (H >= -0.5 && H <= 145.625) {
          minreq = findNearestKey(A_height_to_clearance, H);
        }
      } else if (division === 'B Division (IND / BMT)') {
        if (B_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 148.625) {
          minreq = B_height_to_clearance[H];
        } else if (H >= -0.5 && H <= 145.625) {
          minreq = findNearestKey(B_height_to_clearance, H);
        }
      }

      // TANGENT TRACK CALCULATIONS
      if (trackType === 'tangent') {
        r = 0;
        ee = 0;
        ce = 0;

        // calc SE based on side of track
        if (direction === 'IN' || direction === "OUT") {
          se = (SUPER * H) / 56.5;
        } else {
          se = 0;
        }

        // calc clearance based on D, se
        if (direction === 'IN') {
          llleclearance = parseFloat(D) - parseFloat(se);
        } else if (direction === 'OUT') {
          llleclearance = parseFloat(D) + parseFloat(se); 
        } else {
          llleclearance = parseFloat(D);
        }
      
      // CURVED TRACK CALCULATIONS
      } else {
        if (MO !== 0) {
          r = (1.5 * 2500) / MO;
        } else {
          r = 0;
        }

        if (!(isFinite(r))) {
          r = 0;
        }

        // Calculate se based on direction and SUPER
        if (direction === 'IN' || direction === 'OUT') {
          se = (SUPER * H) / 56.5;
        } else {
          se = 0;
        }

        // Calculate ce and ee based on r and direction
        if (r !== 0 && division === "A Division (IRT)") {
          if (direction === 'IN') {
            ce = 1944 / R;
            ee = 0;
          } else if (direction === 'OUT') {
            ee = 1512 / R;
            ce = 0;
          } else {
            ce = 0;
            ee = 0;
          }
        } else if (r !== 0 && division === "B Division (IND / BMT)") {
          if (direction === 'IN') {
            ce = 4374 / R;
            ee = 0;
          } else if (direction === 'OUT') {
            ee = 2945 / R;
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
        if (direction === 'IN') {
          llleclearance = parseFloat(D) - parseFloat(se) - parseFloat(ce);
        } else if (direction === 'OUT') {
          llleclearance = parseFloat(D) + parseFloat(se) - parseFloat(ee);
        } else {
          llleclearance = parseFloat(D);
        }

      }
  
      clearance = llleclearance - minreq;

      // Update state values
      setR(r);
      setSE(se);
      setEE(ee);
      setCE(ce);
      setLLLEMinReq(minreq);
      setLLLEClearance(parseFloat(llleclearance));
      setClearance(clearance);
    };

    updateCalcs();
  }, [division, H, D, trackType, direction, MO, SUPER, R, SE, EE, CE]);

  useEffect(() => {
    if (division === 'A Division (IRT)') {
      if (A_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 145.625) {
        setLLLEMinReq(A_height_to_clearance[H]);
      } else if (H >= -0.5 && H <= 145.625) {
        setLLLEMinReq(findNearestKey(A_height_to_clearance, H));
      }
    } else if (division === 'B Division (IND / BMT)') {
      if (B_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 148.625) {
        setLLLEMinReq(B_height_to_clearance[H]);
      } else if (H >= -0.5 && H <= 145.625) {
        setLLLEMinReq(findNearestKey(B_height_to_clearance, H));
      }
    }
  }, [division, A_height_to_clearance, B_height_to_clearance, H]);

  useEffect(() => {
    const filePath = '/tor_gor_translations.xlsx';
    const fetchDataFromExcel = async () => {
      try {
        const response = await fetch(filePath);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });

        const a_div_data = XLSX.utils.sheet_to_json(workbook.Sheets['A_Division']);
        const b_div_data = XLSX.utils.sheet_to_json(workbook.Sheets['B_Division']);

        const divA_height_to_clearance = {};
        const divB_height_to_clearance = {};

        a_div_data.forEach(row => {
          divA_height_to_clearance[row['Height']] = row['Clearance'];
        });
        setATranslate(divA_height_to_clearance);

        b_div_data.forEach(row => {
          divB_height_to_clearance[row['Height']] = row['Clearance'];
        });
        setBTranslate(divB_height_to_clearance);
      } catch (error) {
        console.error('Error reading Excel file:', error);
      }
    };
    fetchDataFromExcel();
  }, []);

  return (
    <div>
      <div className="clearance-container">
        <h2>
          Please input values into all applicable fields below.
        </h2>
        <div className="section-container">
          <div className="pill-selector">
            <div
              className={`tab ${division === 'A Division (IRT)' ? 'active' : ''}`}
              onClick={() => handleDivisionChange('A')}
            >
              A Division (IRT)
            </div>
            <div
              className={`tab ${division === 'B Division (IND / BMT)' ? 'active' : ''}`}
              onClick={() => handleDivisionChange('B')}
            >
              B Division (IND / BMT)
            </div>
            <div className={`slider ${division === 'B Division (IND / BMT)' ? 'slide-right' : 'slide-left'}`}></div>
          </div>
        </div>

        <div className="section-container">
          <div className="side-by-side">
            <div className="small-pill-selector">
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

            <div className="small-pill-selector">
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

        <div className="grid2x2">
          <div className="box box1">
            <TextField
              label="Equipment Height from Top of Rail"
              type="number"
              id="height-tor"
              value={formatNumber(H)}
              inputProps={{
                min: -0.5,
                precision: 3,
                max: divMaxH,
                step: hStep,
              }}
              InputProps={{
                style: { textAlign: 'center' },
                endAdornment: <InputAdornment position="end">in.</InputAdornment>
              }}
              onChange={handleHChange}
              style={{ width: '90%' }}
            />
          </div>
          <div className="box box2">
            <TextField
              label="Equipment Distance from Gauge of Rail"
              type="number"
              id="height-gor"
              value={D}
              inputProps={{
                min: 0,
                precision: 2,
                max: 1000, // arbitrary max value
                step: dStep,
              }}
              InputProps={{
                style: { textAlign: 'center' },
                endAdornment: <InputAdornment position="end">in.</InputAdornment>
              }}
              onChange={handleDChange}
              style={{ width: '90%' }}
            />
          </div>
          <div className={`box box3 ${trackType === 'tangent' ? 'inactive-field' : ''}`}>
            <TextField
              label="Middle Ordinate (M.O.)"
              type="number"
              id="middle-ordinate"
              value={MO}
              inputProps={{
                min: 0,
                precision: 2,
                max: 1000, // arbitrary max value
                step: moStep,
              }}
              InputProps={{
                style: { textAlign: 'center' },
                endAdornment: <InputAdornment position="end">in.</InputAdornment>
              }}
              onChange={handleMOChange}
              style={{ width: '90%' }}
            />
          </div>
          <div className="box box4">
            <TextField
              label="Super Elevation (S.E.)"
              type="number"
              id="super-elevation"
              value={SUPER}
              inputProps={{
                min: 0,
                precision: 2,
                max: 1000, // arbitrary max value
                step: superStep,
              }}
              InputProps={{
                style: { textAlign: 'center' },
                endAdornment: <InputAdornment position="end">in.</InputAdornment>
              }}
              onChange={handleSUPERChange}
              style={{ width: '90%' }}
            />
          </div>
        </div>
      </div>
      <div className="clearance-container">
        <h2 className={clearanceClassName}>
          Clearance Calculations 
        </h2>
        <div id="container">
          <div className="inner-container">
            <div className="item">
              <TextField
                label="Radius"
                type="number"
                value={R.toFixed(0)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">ft.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
                disabled={`${trackType === 'tangent' ? 'true': ''}`}
                readOnly
              />
            </div>
            <div className="item">
              <TextField
                label="S.E. Excess"
                type="number"
                value={SE.toFixed(3)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
                readOnly
              />
            </div>
            <div className="item">
              <TextField
                label="End Excess"
                type="number"
                value={EE.toFixed(3)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
                disabled={`${trackType === 'tangent' ? 'true': ''}`}
                readOnly
              />
            </div>
            <div className="item">
              <TextField
                label="Center Excess"
                type="number"
                value={CE.toFixed(3)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
                disabled={`${trackType === 'tangent' ? 'true': ''}`}
                readOnly
              />
            </div>
            <div className="item">
              <TextField
                label="LLLE Minimum Requirement"
                type="number"
                value={formatNumber(LLLEMinReq)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
                readOnly
              />
            </div>
            <div className="item">
              <TextField
                label="LLLE Clearance"
                type="number"
                value={LLLEClearance.toFixed(3)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
                readOnly
              />
            </div>
            <div className="item">
              <TextField
                label="Clearance"
                type="number"
                value={clearance.toFixed(3)}
                InputProps={{
                  style: { textAlign: 'center' },
                  endAdornment: <InputAdornment position="end">in.</InputAdornment>, 
                  disableUnderline: true,
                  inputProps: {
                    readOnly: true,
                    style: { textAlign: 'center', cursor: 'default' }
                  }
                }}
                style={{ width: '90%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clearance;