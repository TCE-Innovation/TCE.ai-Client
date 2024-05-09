import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
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

// Function to return the label instead of the value from the slider
function valuetext(value) {
  const mark = marks.find(mark => mark.value === value);
  return mark ? `Number: ${mark.label}` : `Number: ${value}`;
}

// export default function RangeSlider(setValue, disabled) {
//   const [value, setConduitSizeRange] = useState([0, 8]);

//   const handleConduitSizeRangeChange = (event, newValue) => {
//     setConduitSizeRange(newValue);
//     setValue(newValue);
//   };

export default function RangeSlider({ value: initialValue = [0, 8], setValue, disabled }) {
  const [value, setConduitSizeRange] = useState([0, 8]);

  const handleConduitSizeRangeChange = (event, newValue) => {
    setConduitSizeRange(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 340 }}>
      <div style={{ marginLeft: '10px', marginTop: '-5px', marginBottom: '0px', fontSize: '16px', height: '1em' }}>
        {!disabled && 'Input Range of Potential Conduit Sizes:'}
      </div>
      <Slider
        getAriaLabel={() => "Conduit Size Range"}
        value={value}
        onChange={handleConduitSizeRangeChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => {
          const mark = marks.find(mark => mark.value === value);
          return mark ? mark.label : value;
        }}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        min={0}
        max={12}
        disabled={disabled}
      />
    </Box>
  );
}
