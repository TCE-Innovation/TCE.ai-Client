import React from "react";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectComponent = ({ label, value, items, handleChange }) => {
  if (!items.length) return null;
  return (
    <FormControl style={{ width: "100%" }}>
      <Select
        value={value || ""}
        onChange={handleChange}
        fullWidth
        displayEmpty
        sx={styles}
      >
        <MenuItem value={""} disabled style={{ width: "100%" }}>
          {label}
        </MenuItem>
        {items.map((item) => {
          return (
            <MenuItem
              value={item.value}
              key={item.value}
              style={{ width: "100%" }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const styles = {
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
};

export default SelectComponent;
