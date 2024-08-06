import React from 'react';
import { FormControl, Select, MenuItem } from '@mui/material';

const ToolSelect = ({ selectedTool, handleToolChange, tableNameMap }) => {
    return (
        <FormControl fullWidth sx={{ marginBottom: '.5rem' }}>
            <Select
                value={selectedTool}
                onChange={handleToolChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Select Tool' }}
            >
                <MenuItem value="" disabled>Select Tool</MenuItem>
                {Object.keys(tableNameMap).map((tool, index) => (
                    <MenuItem key={index} value={tool}>{tool}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ToolSelect;
