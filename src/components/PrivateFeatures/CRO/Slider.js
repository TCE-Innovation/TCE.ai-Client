import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';


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
  { value: 5000, label: '5,000' },
  { value: 10000, label: '10,000' },
  { value: 15000, label: '15,000' },
  { value: 20000, label: '20,000' },
  { value: 25000, label: '25,000' },
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

const Input = styled(MuiInput)`
  width: 80px;
`;

function bundleWeightText(value) {
  const mark = bundleWeightMarks.find(mark => mark.value === value);
  return mark ? `${mark.label}` : `${value}`;
}
export function BundleWeightSlider({ value: initialValue = 5000, setValue, disabled }) {
  const [value, setBundleWeight] = useState(initialValue);

  const handleSliderChange = (event, newValue) => {
    setBundleWeight(newValue);
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setBundleWeight(event.target.value === '' ? 0 : Number(event.target.value));
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 5000) {
      setBundleWeight(5000);
      setValue(5000);
    } else if (value > 25000) {
      setBundleWeight(25000);
      setValue(25000);
    }
  };

  return (
    <Box sx={{ width: 340 }}>
      <Typography id="input-slider" gutterBottom>
        Input Maximum Bundle Weight:
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item>
          <VolumeUp />
        </Grid>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            step={5000}
            marks={bundleWeightMarks.map((mark) => ({
              ...mark,
              label: <span style={{ color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'inherit' }}>{mark.label}</span>
            }))}
            min={5000}
            max={25000}
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 5000,
              min: 5000,
              max: 25000,
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