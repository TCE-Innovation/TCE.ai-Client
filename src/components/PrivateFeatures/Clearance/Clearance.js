import React, { useState } from 'react';
import './Clearance.css'; // Import CSS file
import { Unstable_NumberInput as BaseNumberInput } from '@mui/base/Unstable_NumberInput';

const Clearance = () => {
  const [division, setDivision] = useState('A Division (IRT)');
  const [H, setH] = useState(0); // Field for H (in inches)
  const [D, setD] = useState(0); // Field for D (in inches)
  const [trackType, setTrackType] = useState('curve'); // Tab selection for track type
  const [direction, setDirection] = useState('IN'); // Tab selection for direction
  const [MO, setMO] = useState(0); // Field for MO (in inches)
  const [SUPER, setSUPER] = useState(0); // Field for Super Elevation 

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

  return (
    <div className="clearance-container">
      <h2>
        Please input values into all applicable fields below.
      </h2>
      
      <div className="section-container">
        <div className="pill-selector">
          <div
            className={`tab ${division === 'A Division (IRT)' ? 'active' : ''}`}
            onClick={() => setDivision('A Division (IRT)')}
          >
            A Division (IRT)
          </div>
          <div
            className={`tab ${division === 'B Division (IND / BMT)' ? 'active' : ''}`}
            onClick={() => setDivision('B Division (IND / BMT)')}
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
          <div className="input-field">
            <label>
              Equipment Height from Top of Rail:
                <BaseNumberInput 
                  slotProps={{
                    root: { className: 'custom-number-input' },
                    input: { className: 'input' },
                    incrementButton: { className: 'btn incrementButton', children: '▴' },
                    decrementButton: { className: 'btn decrementButton', children: '▾' },
                  }}
                  min={0}
                  max={1000}
                  aria-label="Top of Rail Input"
                  placeholder={H}
                  value={H}
                  onChange={(event, val) => setH(val)}
                />
              <span className="unit">in.</span>
            </label>
          </div>
        </div>
        <div className="box box2">
          <div className="input-field">
            <label>
              Middle Ordinate (M.O.):
                <BaseNumberInput
                  slotProps={{
                    root: { className: 'custom-number-input' },
                    input: { className: 'input' },
                    incrementButton: { className: 'btn incrementButton', children: '▴' },
                    decrementButton: { className: 'btn decrementButton', children: '▾' },
                  }}
                  min={0}
                  max={1000}
                  aria-label="Middle Ordinate Input"
                  placeholder={MO}
                  value={MO}
                  onChange={(event, val) => setMO(val)}
                />
              <span className="unit">in.</span>
            </label>
          </div>
        </div>
        <div className="box box3">
          <div className="input-field">
            <label>
              Equipment Distance from Gauge of Rail:
                <BaseNumberInput
                  slotProps={{
                    root: { className: 'custom-number-input' },
                    input: { className: 'input' },
                    incrementButton: { className: 'btn incrementButton', children: '▴' },
                    decrementButton: { className: 'btn decrementButton', children: '▾' },
                  }}
                  min={0}
                  max={1000}
                  aria-label="Gauge of Rail Input"
                  placeholder={D}
                  value={D}
                  onChange={(event, val) => setD(val)}
                />
              <span className="unit">in.</span>
            </label>
          </div>
        </div>
        <div className="box box4">
          <div className="input-field">
            <label>
              Super Elevation:
                <BaseNumberInput
                  slotProps={{
                    root: { className: 'custom-number-input' },
                    input: { className: 'input' },
                    incrementButton: { className: 'btn incrementButton', children: '▴' },
                    decrementButton: { className: 'btn decrementButton', children: '▾' },
                  }}
                  min={0}
                  max={1000}
                  aria-label="Super Elevation Input"
                  placeholder={SUPER}
                  value={SUPER}
                  onChange={(event, val) => setSUPER(val)}
                />
              <span className="unit">in.</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clearance;