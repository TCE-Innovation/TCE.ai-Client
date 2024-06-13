import React, { useState, useEffect } from 'react';
import TrainLoader from '../General/TrainLoader';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

// define the possible locations at each Project
const projectLocationMap = {
    '207th Street Yard': ['Yard'],
    'Rockaways': ['North', 'West', 'East']
};

// maps each location to the embed URL that should be displayed
const locationIFrameMap = {
    'North': '<iframe style="width: calc(100% - 50px); height: calc(100vh - 50px); margin: 10px;" src="https://cloud.pix4d.com/project/embed/1877194-21583576bc254bd1b4c10a926d35b5e5/" frameborder="0" allowfullscreen></iframe>',
    'West': '<iframe style="width: calc(100% - 50px); height: calc(100vh - 50px); margin: 10px;" src="https://cloud.pix4d.com/project/embed/1869741-9bcc232a350e46ee8f7b98256995ab88/" frameborder="0" allowfullscreen></iframe>',
    'East': '<iframe style="width: calc(100% - 50px); height: calc(100vh - 50px); margin: 10px;" src="https://cloud.pix4d.com/project/embed/1869711-de6bf6526fd4493abc7320fcaa7f094b/" frameborder="0" allowfullscreen></iframe>',
    'Yard': '<iframe style="width: calc(100% - 50px); height: calc(100vh - 50px); margin: 10px;" src="https://cloud.pix4d.com/project/embed/1878517-0701e39043844f67b1f23dad1bf26f25/" frameborder="0" allowfullscreen></iframe>',
};


const DroneCaptures = () => {
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    useEffect(() => {
        // Select the first project by default
        setSelectedProject(Object.keys(projectLocationMap)[0]);
    }, []);

    useEffect(() => {
        // Update locations when the selected project changes
        setLocations(projectLocationMap[selectedProject] || []);
        // Select the first location by default
        setSelectedLocation(projectLocationMap[selectedProject]?.[0] || '');
    }, [selectedProject]);

    useEffect(() => {
        // Update the iframeLink when the selected location changes
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
                        {Object.keys(projectLocationMap).map((project) => (
                            <MenuItem key={project} value={project}>{project}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {locations.length > 0 && (
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
                <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '75vh', margin: 'auto' }}>
                    <iframe
                        onLoad={handleIframeLoad}
                        srcDoc={iframeLink} // Use srcDoc instead of src to directly embed the HTML content
                        style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                        title="Drone Captures"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default DroneCaptures;