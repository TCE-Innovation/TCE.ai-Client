import React, { useState, useEffect, useContext } from 'react';
import TrainLoader from '../General/TrainLoader';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { getUserProjectsArray } from '../../data/SQL'; // Import the getUserProjects function
import { AuthContext } from "../../authentication/Auth";

const projectLocationMap = {
    '207th Street Yard': ['Yard'],
    'Rockaways': ['North', 'West', 'East']
};

const locationIFrameMap = {
    'North': "https://cloud.pix4d.com/project/embed/1877194-21583576bc254bd1b4c10a926d35b5e5/",
    'West': "https://cloud.pix4d.com/project/embed/1869741-9bcc232a350e46ee8f7b98256995ab88/",
    'East': "https://cloud.pix4d.com/project/embed/1869711-de6bf6526fd4493abc7320fcaa7f094b/",
    'Yard': "https://cloud.pix4d.com/project/embed/1878517-0701e39043844f67b1f23dad1bf26f25/",
};

const DroneCaptures = () => {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');
    const [filteredProjects, setFilteredProjects] = useState([]); // Define filteredProjects state
    const { userEmail } = useContext(AuthContext);

    useEffect(() => {
        async function fetchUserProjects() {
            try {
                const projects = await getUserProjectsArray(userEmail, 'drone_captures');
                setFilteredProjects(projects); // Set filteredProjects state
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
        setIframeLink(locationIFrameMap[selectedLocation] || '');
    }, [selectedLocation]);

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
            {!iframeLoaded && (
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
                        {filteredProjects.map((project) => ( // Use filteredProjects here
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
            {iframeLink && (
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '68vh', margin: 'auto' }}>
                    <iframe
                        onLoad={handleIframeLoad}
                        src={iframeLink} // Use srcDoc instead of src to directly embed the HTML content
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                        title="Drone Captures"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default DroneCaptures;