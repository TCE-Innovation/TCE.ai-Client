import React, { useState, useEffect, useContext } from 'react';
import TrainLoader from '../General/TrainLoader';
import { FormControl, InputLabel, Select, MenuItem, Box, Paper, Typography } from '@mui/material';
import { getUserProjectsArray } from '../../data/SQL'; // Import the getUserProjects function
import { AuthContext } from "../../authentication/Auth";

const projectLocationMap = {
    '207th Street Yard': ['Yard'],
    'Rockaways': ['North', 'West', 'East'],
    'Fulton-Liberty': ['East', 'West', 'Both (low-res)'],
};

const RockawaysLocationIFrameMap = {
    'North': "https://cloud.pix4d.com/project/embed/1877194-21583576bc254bd1b4c10a926d35b5e5/",
    'West': "https://cloud.pix4d.com/project/embed/1869741-9bcc232a350e46ee8f7b98256995ab88/",
    'East': "https://cloud.pix4d.com/project/embed/1869711-de6bf6526fd4493abc7320fcaa7f094b/",
};

// Separate map for 207th Street Yard
const YardLocationIFrameMap = {
    'Yard': "https://cloud.pix4d.com/project/embed/1878517-0701e39043844f67b1f23dad1bf26f25/",
};

const FultonLibertyLocationIFrameMap = {
    'East': "https://cloud.pix4d.com/project/embed/2275383-9c3d98f512b1429ca2d1c0c700fc9a62/",
    'West': "https://cloud.pix4d.com/project/embed/2275189-1353f4e23cfb4168842e38ac07f6f894/",
    'Both (low-res)': ""
};

const DroneCaptures = () => {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const { userEmail } = useContext(AuthContext);

    useEffect(() => {
        async function fetchUserProjects() {
            try {
                const projects = await getUserProjectsArray(userEmail, 'drone_captures');
                setFilteredProjects(projects);
                setSelectedProject(projects[0]); // Select the first project by default
            } catch (error) {
                console.error('Error fetching user projects:', error);
            }
        }

        fetchUserProjects();
    }, [userEmail]);

    useEffect(() => {
        setLocations(projectLocationMap[selectedProject] || []);
        setSelectedLocation(projectLocationMap[selectedProject]?.[0] || '');
    }, [selectedProject]);

    useEffect(() => {
        // Reset iframe loaded state when changing projects/locations
        setIframeLoaded(false);
        
        // Set the appropriate iframe link based on the selected project and location
        if (selectedProject === 'Rockaways') {
            setIframeLink(RockawaysLocationIFrameMap[selectedLocation] || '');
        } else if (selectedProject === 'Fulton-Liberty') {
            setIframeLink(FultonLibertyLocationIFrameMap[selectedLocation] || '');
        } else if (selectedProject === '207th Street Yard') {
            setIframeLink(YardLocationIFrameMap[selectedLocation] || '');
        } else {
            setIframeLink('');
        }
    }, [selectedLocation, selectedProject]);

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column" }}>
            {!iframeLoaded && iframeLink && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            <Box sx={{ width: '100%', display: 'flex', marginBottom: 2 }}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="project-label">Project</InputLabel>
                    <Select
                        labelId="project-label"
                        id="project-select"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        label="Project"
                    >
                        {filteredProjects.map((project) => (
                            <MenuItem key={project} value={project}>{project}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {locations.length > 1 && (
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="location-label">Location</InputLabel>
                        <Select
                            labelId="location-label"
                            id="location-select"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            label="Location"
                        >
                            {locations.map((location) => (
                                <MenuItem key={location} value={location}>{location}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>
            {iframeLink ? (
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '74vh', margin: 'auto' }}>
                    <iframe
                        onLoad={handleIframeLoad}
                        src={iframeLink}
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                        title="Drone Captures"
                    ></iframe>
                </div>
            ) : (
                <Paper 
                    elevation={3} 
                    sx={{ 
                        width: '100%', 
                        height: '74vh', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5'
                    }}
                >
                    <Box sx={{ textAlign: 'center', p: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Capture Not Available
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            The drone capture for {selectedProject} - {selectedLocation} is not available yet.
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                            Please check back later or contact your administrator for more information.
                        </Typography>
                    </Box>
                </Paper>
            )}
        </div>
    );
};

export default DroneCaptures;