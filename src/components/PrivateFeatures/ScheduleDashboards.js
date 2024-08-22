import React, { useState, useEffect, useContext } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; 
import { getUserProjectsArray } from '../../data/SQL';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';

import { AuthContext } from "../../authentication/Auth";

const ScheduleDashboards = () => {
    const [projects, setProjects] = useState({});
    const [projectOptions, setProjectOptions] = useState([]);
    const [userDashboards, setUserDashboards] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    const { userEmail } = useContext(AuthContext);

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
              
                const data = await getUserProjectsArray(userEmail, 'schedule_dashboards');
                setUserDashboards(data);
            } catch (error) {
                console.error('Error fetching dashboards:', error);
            }
        };
        fetchDashboards();
    }, [userEmail]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const tableID = "tblGN3jn8NvpVOnFo";
                const data = await getPBILog(tableID);
                setProjects(data);
    
                let projectKeys = Object.keys(data);
                if (userDashboards === "All") {
                    // If userDashboards is "All", use all project keys
                } else if (userDashboards === "None") {
                    projectKeys = []; // No projects to display
                } else {
                    projectKeys = projectKeys.filter(project => userDashboards.includes(project));
                }
    
                setProjectOptions(projectKeys);
    
                if (projectKeys.length > 0) {
                    const firstProject = projectKeys[0] !== "None" ? projectKeys[0] : "";
                    setSelectedProject(firstProject);
                    if (firstProject) {
                        const months = data[firstProject].map(record => record.month);
                        const mostRecentMonth = months[months.length - 1];
                        setSelectedMonth(mostRecentMonth);
                        const mostRecentRecord = data[firstProject].find(record => record.month === mostRecentMonth);
                        setIframeLink(mostRecentRecord.link);
                    }
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, [userDashboards]);
    

    const handleProjectChange = (event) => {
        const selectedProject = event.target.value;
        setSelectedProject(selectedProject);
    
        if (selectedProject !== "None") {
            // Get the list of months for the selected project
            const months = projects[selectedProject].map(record => record.month);
            
            // Select the most recent month (the last item in the list)
            const mostRecentMonth = months[months.length - 1];
            
            setSelectedMonth(mostRecentMonth);
            
            // Find the record corresponding to the most recent month
            const mostRecentRecord = projects[selectedProject].find(record => record.month === mostRecentMonth);
            
            // Set the iframe link to the link associated with the most recent month
            setIframeLink(mostRecentRecord.link);
        } else {
            setSelectedMonth('');
            setIframeLink('');
        }
    };
    
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        const record = projects[selectedProject].find(r => r.month === event.target.value);
        if (record) {
            setIframeLink(record.link);
        }
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column" }}>
            {!iframeLoaded && userDashboards !== "None" && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <TrainLoader />
                </div>
            )}
            {userDashboards === "None" ? (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                    <Typography variant="h6" align="center" color="error">
                        You do not have any schedule dashboards provisioned to you.
                    </Typography>
                    <Typography variant="h6" align="center">
                        Please reach out to an administrator.
                    </Typography>
                </div>
            ) : (
                <>
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
                                {projectOptions.map((project) => (
                                    <MenuItem key={project} value={project}>{project}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedProject && (
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="month-label">Month</InputLabel>
                                <Select
                                    labelId="month-label"
                                    id="month-select"
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    label="Month"
                                >
                                    {projects[selectedProject]?.map((record) => (
                                        <MenuItem key={record.month} value={record.month}>{record.month}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Box>
                    {iframeLink && (
                        <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '75vh', margin: 'auto' }}>
                            <iframe
                                onLoad={handleIframeLoad}
                                src={iframeLink}
                                style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                                title="Schedule Dashboard"
                            ></iframe>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ScheduleDashboards;
