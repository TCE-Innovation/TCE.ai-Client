import React from 'react';
import { Box, FormControl, Select, MenuItem, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ProjectTeam = ({
    activeProjects,
    selectedProject,
    handleProjectChange,
    projectTeam,
    handleAddProjectTeam,
    handleCancelProjectSelection,
    isDisabled
}) => {
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '25%'}}>
                <FormControl sx={{ marginBottom: '1rem', marginTop: '0.5rem', marginRight: '1vw', width: '100%' }}>
                    <Select
                        value={selectedProject}
                        onChange={handleProjectChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Add Project Team' }}
                        disabled={isDisabled}
                    >
                        <MenuItem value="" disabled>Add Project Team</MenuItem>
                        {activeProjects.map((project, index) => (
                            <MenuItem key={index} value={project.name}>{project.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {selectedProject && projectTeam && projectTeam.length > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", marginBottom: '1rem' }}>
                    <Button
                        variant="contained"
                        onClick={handleAddProjectTeam}
                        style={{
                            backgroundColor: '#d7edd1',
                            color: 'green',
                            border: '1px solid green',
                            marginLeft: '.5vw',
                            paddingTop: '2px',
                            marginTop: '0.5rem',
                            paddingBottom: '2px',
                            height: '55px',
                        }}
                    >
                        Add {projectTeam.length} Users
                    </Button>
                    <IconButton
                        onClick={handleCancelProjectSelection}
                        style={{
                            backgroundColor: 'transparent',
                            color: 'black',
                            marginLeft: '.5vw'
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
