import React, { useState } from "react";
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
// import MuiInput from '@mui/material/Input';

const conduitSizeMarks = [
  { value: 0, label: '0.75' },
  { value: 1, label: '1' },
  { value: 2, label: '1.25' },
  { value: 3, label: '1.5' },
  { value: 4, label: '2' },
  { value: 5, label: '2.5' },
  { value: 6, label: '3' },
  { value: 7, label: '3.5' },
  { value: 8, label: '4' },
  { value: 9, label: '4.5' },
  { value: 10, label: '5' },
  { value: 11, label: '5.5' },
  { value: 12, label: '6' },
];

// Function to return the label instead of the value from the slider
function convertConduitSizeValue(value) {
  const mark = conduitSizeMarks.find(mark => mark.value === value);
  return mark ? `Number: ${mark.label}` : `Number: ${value}`;
}

export function ConduitSizeRangeSlider({ value: initialValue = [0, 8], setValue, disabled }) {
  const [value, setConduitSizeRange] = useState([0, 8]);

  const handleConduitSizeRangeChange = (event, newValue) => {
    setConduitSizeRange(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 340 }}>
      <div style={{ marginLeft: '-10px', marginTop: '-10px', marginBottom: '10px', 
                    fontSize: '16px', height: '1em', color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.87)' }}>
      Input Range of Conduit Sizes (in):
    </div>

      <Slider
        getAriaLabel={() => "Conduit Size Range"}
        value={value}
        onChange={handleConduitSizeRangeChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => {
          const mark = conduitSizeMarks.find(mark => mark.value === value);
          return mark ? mark.label : value;
        }}
        getAriaValueText={convertConduitSizeValue}
        step={null}
        marks={conduitSizeMarks.map((mark) => ({
          ...mark,
          label: <span style={{ color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'inherit' }}>{mark.label}</span>
        }))}
        min={0}
        max={12}
        disabled={disabled}
      />
    </Box>
  );
}

const bundleWeightMarks = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
];

// const Input = styled(MuiInput)`
//   width: 55px;
//   margin-right: -100px;
//   margin-left: 25px;
//   margin-bottom: 10px;
//   padding-left: 5px; /* Adjust padding to move text closer to spinner arrows */
//   text-align: right; /* Align text to the right */

//   /* Ensure spinner arrows are always visible */
//   input[type='number']::-webkit-outer-spin-button,
//   input[type='number']::-webkit-inner-spin-button {
//     opacity: 1;
//     transform: scale(1.75); /* Make spinner arrows larger */
//   }

//   /* For Firefox */
//   input[type='number'] {
//     -moz-appearance: textfield;
//   }
// `;

export function BundleWeightSlider({ value: initialValue = 25, setValue, disabled }) {
  // const [value, setValue] = React.useState(25);
  const [value, setMaxBundleWeight] = useState(25);

  const handleMaxBundleWeightChange = (event, newValue) => {
    setMaxBundleWeight(newValue);
    setValue(newValue);
  };

  // const handleInputChange = (event) => {
  //   setValue(event.target.value === '' ? 0 : Number(event.target.value));
  // };

  // const handleBlur = () => {
  //   if (value < 5) {
  //     setValue(5);
  //   } else if (value > 25) {
  //     setValue(25);
  //   }
  // };

  return (
    <Box sx={{ width: 237, marginTop: "-10px", marginLeft: "-10px"}}>
      <Typography id="input-slider" gutterBottom>
        Input Max Bundle Weight (lb/ft):
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleMaxBundleWeightChange}
            aria-labelledby="input-slider"
            min={5}
            max={25}
            marks={bundleWeightMarks}
            sx={{ marginTop: '-3px'}}
            valueLabelDisplay="auto"
          />
        </Grid>
        {/* <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 5,
              min: 5,
              max: 25,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid> */}
      </Grid>
    </Box>
  );
}