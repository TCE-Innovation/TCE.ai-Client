import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';


const conduitSizeMarks = [
  { value: 0, label: '0.75"' },
  { value: 1, label: '1"' },
  { value: 2, label: '1.25"' },
  { value: 3, label: '1.5"' },
  { value: 4, label: '2.0"' },
  { value: 5, label: '2.5"' },
  { value: 6, label: '3.0"' },
  { value: 7, label: '3.5"' },
  { value: 8, label: '4.0"' },
  { value: 9, label: '4.5"' },
  { value: 10, label: '5.0"' },
  { value: 11, label: '5.5"' },
  { value: 12, label: '6"' },
];

const bundleWeightMarks = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
];

// Function to return the label instead of the value from the slider
function valuetext(value) {
  const mark = conduitSizeMarks.find(mark => mark.value === value);
  return mark ? `Number: ${mark.label}` : `Number: ${value}`;
}

export function RangeSlider({ value: initialValue = [0, 8], setValue, disabled }) {
  const [value, setConduitSizeRange] = useState([0, 8]);

  const handleConduitSizeRangeChange = (event, newValue) => {
    setConduitSizeRange(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 340 }}>
      <div style={{ marginLeft: '10px', marginTop: '-10px', marginBottom: '10px', 
                    fontSize: '16px', height: '1em', color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'rgba(0, 0, 0, 0.87)' }}>
      Input Range of Conduit Sizes:
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
        getAriaValueText={valuetext}
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

// const Input = styled(MuiInput)`
//   width: 40px;
// `;

const CustomInput = styled(OutlinedInput)`
  width: 70px;
  & input[type=number]::-webkit-inner-spin-button,
  & input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: auto;
    margin: 0;
  }
  & input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`;

// function bundleWeightText(value) {
//   const mark = bundleWeightMarks.find(mark => mark.value === value);
//   return mark ? `${mark.label}` : `${value}`;
// }

export function BundleWeightSlider({ value: initialValue = 5, setValue, disabled }) {
  const [value, setBundleWeight] = useState(initialValue);

  const handleSliderChange = (event, newValue) => {
    setBundleWeight(newValue);
    setValue(newValue);
  };

  // const handleInputChange = (event) => {
  //   setBundleWeight(event.target.value === '' ? 0 : Number(event.target.value));
  //   setValue(event.target.value === '' ? 0 : Number(event.target.value));
  // };

const handleInputChange = (event) => {
  const newValue = event.target.value === '' ? 0 : Number(event.target.value);
  const steppedValue = Math.round(newValue / 5) * 5;
  setBundleWeight(steppedValue);
  setValue(steppedValue);
};

  const handleBlur = () => {
    if (value < 5) {
      setBundleWeight(5);
      setValue(5);
    } else if (value > 25) {
      setBundleWeight(25);
      setValue(25);
    }
  };

  return (
    <Box sx={{ width: 340 }}>
      <Typography id="input-slider" gutterBottom>
        Input Maximum Bundle Weight:
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={1}
            marks={bundleWeightMarks.map((mark) => ({
              ...mark,
              label: <span style={{ color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'inherit' }}>{mark.label}</span>
            }))}
            min={5}
            max={25}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <CustomInput
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
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
}