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
  const [EE, setEE] = useState(0); // Field for EE - Edge Excess (in inches)
  const [CE, setCE] = useState(0); // Field for CE - Center Excess (in inches)
  const [LLLEMinReq, setLLLEMinReq] = useState(33.875); // Field for LLLE Minimum Requirement (in inches)
  const [LLLEClearance, setLLLEClearance] = useState(-33.875); // Field for calculated LLLE Clearance (in inches)
  const [divMaxH, setDivMaxH] = useState(145.625); 
  const [hStep] = useState(0.125);
  const [dStep] = useState(0.125);
  const [moStep] = useState(0.1);
  const [superStep] = useState(0.125);
  const [A_height_to_clearance, setATranslate] = useState({0:33.875});
  const [B_height_to_clearance, setBTranslate] = useState({0:35.125});

  const isClearanceGreater = LLLEClearance > LLLEMinReq;
  const clearanceClassName = `value-box ${isClearanceGreater ? 'greater-clearance' : 'lesser-clearance'}`

  const findNearestKey = (map, key) => {
    const keys = Object.keys(map).map(Number).sort((a, b) => a - b);
    let nearestKey = keys.reduce((prev, curr) => Math.abs(curr - key) < Math.abs(prev - key) ? curr : prev);
    return map[nearestKey];
  };

  const handleHChange = (event) => {
    let newH = event.target.value;
    setH(newH);
    if (division === 'A Division (IRT)') {
      if (A_height_to_clearance.hasOwnProperty(newH) && newH >= -0.5 && newH <= 145.625) {
        setLLLEMinReq(A_height_to_clearance[newH]);
      } else if (newH >= -0.5 && newH <= 145.625) {
        setLLLEMinReq(findNearestKey(A_height_to_clearance, newH));
      }
    } else if (division === 'B Division (IND / BMT)') {
      if (B_height_to_clearance.hasOwnProperty(newH) && newH >= -0.5 && newH <= 148.625) {
        setLLLEMinReq(B_height_to_clearance[newH]);
      } else if (newH >= -0.5 && newH <= 145.625) {
        setLLLEMinReq(findNearestKey(B_height_to_clearance, newH));
      }
    }
  }

  const handleDChange = (event) => {
    setD(event.target.value);
  }

  const handleTrackTypeChange = (event) => {
    setTrackType(event.target.value);
  }

  const handleDirectionChange = (event) => {
    setDirection(event.target.value);
  }

  const handleMOChange = (event) => {
    setMO(event.target.value);
  }

  const handleSUPERChange = (event) => {
    setSUPER(event.target.value);
  }

  // Function to handle click on track type tabs
  const handleTrackTypeClick = (type) => {
    if (type === 'tangent') {
      // If 'tangent' is clicked, disable direction selection
      setTrackType('tangent');
      setDirection('');
    } else {
      // Otherwise, set track type and enable direction selection
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

  const updateCalcs = () => {
    let r, se, ee, ce, llleclearance;
    if (MO !== 0) {
      r = (1.5 * 2500) / MO;
    } else {
      r = 0;
    }
    if (direction === 'IN') {
      se = (SUPER * H) / 56.5;
      if (R !== 0) {
        ce = 4374 / R;
      } else { ce = 0; }
      llleclearance = D - se - ce;
    } else if (direction === 'OUT') {
      se = (-SUPER * H) / 56.5;
      if (R !== 0) {
        ee = 4374 / R;
      } else { ee = 0; }
      llleclearance = D + SE - EE
    }
    setR(r);
    setSE(se);
    setEE(ee);
    setCE(ce);
    setLLLEClearance(llleclearance);
  }

  useEffect(() => {
    updateCalcs();
  }, [division, H, D, trackType, direction, MO, SUPER])

  useEffect(() => {
    if (division === 'A Division (IRT)') {
      if (A_height_to_clearance.hasOwnProperty(H) && H >= -0.5 && H <= 145.625) {
        setLLLEMinReq(A_height_to_clearance[H]);
        console.log(H);
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
  }, [division]);

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

            <div className={`small-pill-selector ${trackType === 'tangent' ? 'disabled' : ''}`}>
              <div
                className={`tab ${direction === 'IN' ? 'active' : ''}`}
                onClick={() => setDirection('IN')}
                disabled={trackType === 'tangent'} // Disable clicks when trackType is 'tangent'
              >
                Inside of Curve
              </div>
              <div
                className={`tab ${direction === 'OUT' ? 'active' : ''}`}
                onClick={() => setDirection('OUT')}
                disabled={trackType === 'tangent'} // Disable clicks when trackType is 'tangent'
              >
                Outside of Curve
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
              value={H}
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
          <div className="box box3">
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
              }}
              onChange={handleMOChange}
              style={{ width: '90%' }}
            />
          </div>
          <div className="box box4">
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
        <h2>
          Calculated Values
        </h2>
        <div id="container">
          <div className="inner-container">
            <div className="item">
              <div className="title">Radius</div>
              <input type="text" className="value-box" value={R} readOnly />
            </div>
            <div className="item">
              <div className="title">Super Elevation Excess</div>
              <input type="text" className="value-box" value={SE} readOnly />
            </div>
            <div className="item">
              <div className="title">Edge Excess</div>
              <input type="text" className="value-box" value={EE} readOnly />
            </div>
            <div className="item">
              <div className="title">Center Excess</div>
              <input type="text" className="value-box" value={CE} readOnly />
            </div>
            <div className="item">
              <div className="title">LLLE Minimum Requirement</div>
              <input type="text" className="value-box" value={LLLEMinReq} readOnly />
            </div>
            <div className="item">
              <div className="title">LLLE Clearance</div>
              <input type="text" className={clearanceClassName} value={LLLEClearance} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clearance;