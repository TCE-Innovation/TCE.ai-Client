import React from 'react';
import { Box, FormControl, Select, MenuItem, Typography, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ProjectTeam = ({
    activeProjects,
    selectedProject,
    handleProjectChange,
    projectTeam,
    handleAddProjectTeam,
    handleCancelProjectSelection
}) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormControl sx={{ marginBottom: '2rem', marginRight: '1vw', width: '20%' }}>
                    <Select
                        value={selectedProject}
                        onChange={handleProjectChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Add Project Team' }}
                    >
                        <MenuItem value="" disabled>Add Project Team</MenuItem>
                        {activeProjects.map((project, index) => (
                            <MenuItem key={index} value={project.name}>{project.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {selectedProject && projectTeam && projectTeam.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginBottom: '2rem' }}>
                    <Typography variant="subtitle1" style={{ marginRight: '1vw' }}>
                        {projectTeam.length} users from project "{selectedProject}" will be added.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleAddProjectTeam}
                        style={{
                            backgroundColor: '#d7edd1',
                            color: 'green',
                            border: '1px solid green'
                        }}
                    >
                        Add {projectTeam.length} Users
                    </Button>
                    <IconButton
                        onClick={handleCancelProjectSelection}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            marginLeft: '1vw'
                        }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Box>
            )}
        </>
    );
};

export default ProjectTeam;
