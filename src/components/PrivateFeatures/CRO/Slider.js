import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
  { value: 0.75, label: '0.75"' },
  { value: 1, label: '1"' },
  { value: 1.25, label: '1.25"' },
  { value: 1.5, label: '1.5"' },
  { value: 2.0, label: '2.0"' },
  { value: 2.5, label: '2.5"' },
  { value: 3.0, label: '3.0"' },
  { value: 3.5, label: '3.5"' },
  { value: 3.5, label: '3.5"' },
  { value: 4.0, label: '4.0"' },
  { value: 4.5, label: '4.5"' },
  { value: 5.0, label: '5.0"' },
  { value: 5.5, label: '5.5"' },
  { value: 6, label: '6"' },
];

function valuetext(value) {
  return `${value}"`;
}

// export default function RangeSlider() {
//   const [value, setConduitSizeRange] = useState([0.75, 4]);

//   const handleConduitSizeRangeChange = (event, newValue) => {
//     setConduitSizeRange(newValue);
//   };
export default function RangeSlider({ value, setValue }) {
  const handleConduitSizeRangeChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 600 }}>

    <p style={{marginLeft: '-10px' }}>
        Input Range of Potential Conduit Sizes:
    </p>

      <Slider
        getAriaLabel={() => "Conduit Size Range"}
        value={value}
        onChange={handleConduitSizeRangeChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        min={0.75}
        max={6}
      />

      {/* <p style={{marginTop: '20px'}}>
        Current range: {value[0]}" - {value[1]}"
      </p> */}

    </Box>
  );
}