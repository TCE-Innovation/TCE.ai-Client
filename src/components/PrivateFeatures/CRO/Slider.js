import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';


const conduitSizeMarks = [
  { value: 0, label: '0.75' },
  { value: 1, label: '1' },
  { value: 2, label: '1.25' },
  { value: 3, label: '1.5' },
  { value: 4, label: '2.0' },
  { value: 5, label: '2.5' },
  { value: 6, label: '3.0' },
  { value: 7, label: '3.5' },
  { value: 8, label: '4.0' },
  { value: 9, label: '4.5' },
  { value: 10, label: '5.0' },
  { value: 11, label: '5.5' },
  { value: 12, label: '6' },
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

// const CustomInput = styled(OutlinedInput)`
//   width: 70px;
//   margin-right: -10px;
//   margin-left: 5px;
//   margin-bottom: 5px;

//   /* Ensure spinner arrows (up/down) are always visible */
//   & input[type=number] {
//     -moz-appearance: textfield; /* Firefox */
//   }

//   & input[type=number]::-webkit-inner-spin-button,
//   & input[type=number]::-webkit-outer-spin-button {
//     -webkit-appearance: auto !important; /* Chrome, Safari */
//     opacity: 1 !important; /* Ensure they are visible */
//   }

//   /* Scale the size of the spinner arrows */
//   & input[type=number]::-webkit-inner-spin-button {
//     transform: scale(1.4); /* Increase the size of the spinner arrows */
//     display: block; /* Ensure the arrows are displayed */
//   }

//   /* For Firefox */
//   & input[type=number] {
//     font-size: 16px; /* Adjust size for visibility */
//   }
// `;

// function bundleWeightText(value) {
//   const mark = bundleWeightMarks.find(mark => mark.value === value);
//   return mark ? `${mark.label}` : `${value}`;
// }

// export function BundleWeightSlider({ value: initialValue = 15, setValue, disabled }) {
//   const [value, setBundleWeight] = useState(initialValue);

//   // Use useEffect to ensure that value is updated if initialValue changes
//   useEffect(() => {
//     setBundleWeight(initialValue);
//   }, [initialValue]);

//   const handleSliderChange = (event, newValue) => {
//     setBundleWeight(newValue);
//     setValue(newValue);
//   };

//   const handleInputChange = (event) => {
//     const newValue = event.target.value;
//     // Allow empty input and convert to number only if there's a valid input
//     if (newValue === '') {
//       setBundleWeight(newValue); // Allow it to be empty
//       setValue(newValue);
//     } else {
//       const steppedValue = Math.round(Number(newValue) / 5) * 5;
//       setBundleWeight(steppedValue);
//       setValue(steppedValue);
//     }
//   };
  
//   const handleBlur = () => {
//     if (value < 5) {
//       setBundleWeight(5);
//       setValue(5);
//     } else if (value > 25) {
//       setBundleWeight(25);
//       setValue(25);
//     }
//   };

//   return (
//     <Box sx={{ width: 340 }}>
//       <Typography id="input-slider" gutterBottom>
//         Input Maximum Bundle Weight:
//       </Typography>
//       <Grid container spacing={2} sx={{ alignItems: 'center' }}>
//         <Grid item xs>
//           <Slider
//             value={typeof value === 'number' ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//             step={1}
//             marks={bundleWeightMarks.map((mark) => ({
//               ...mark,
//               label: <span style={{ color: disabled ? 'rgba(0, 0, 0, 0.38)' : 'inherit' }}>{mark.label}</span>
//             }))}
//             min={5}
//             max={25}
//             disabled={disabled}
//           />
//         </Grid>
//         <Grid item>
//           <CustomInput
//             value={value}
//             size="small"
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             inputProps={{
//               step: 5,
//               min: 5,
//               max: 25,
//               type: 'number',
//               'aria-labelledby': 'input-slider',
//             }}
//             disabled={disabled}
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

const bundleWeightMarks = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 25, label: '25' },
];

const Input = styled(MuiInput)`
  width: 45px;
  margin-right: -100px;
  margin-left: 25px;
  margin-bottom: 10px;

  /* Ensure spinner arrows are always visible */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    opacity: 1;
    transform: scale(1.75); /* Make spinner arrows larger */
  }

  /* For Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export function BundleWeightSlider() {
  const [value, setValue] = React.useState(25);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 5) {
      setValue(5);
    } else if (value > 25) {
      setValue(25);
    }
  };

  return (
    <Box sx={{ width: 270, marginTop: "-10px", marginLeft: "-10px"}}>
      <Typography id="input-slider" gutterBottom>
        Input Maximum Bundle Weight (lb/ft):
      </Typography>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={5}
            max={25}
            marks={bundleWeightMarks}
            sx={{ marginTop: '-2px'}}
          />
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </Box>
  );
}