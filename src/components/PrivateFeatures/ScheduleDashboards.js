import React, { useState, useEffect, useContext } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; 
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

import { AuthContext } from "../../authentication/Auth";


const ScheduleDashboards = () => {
    const [projects, setProjects] = useState({});
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    const { userDashboards } = useContext(AuthContext);
    console.log(userDashboards);

    //need to make sure i handle if the user has no dashboards (either set to none default or if its empty, make it none here)

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getPBILog();
                setProjects(data);
                const firstProject = Object.keys(data)[0];
                setSelectedProject(firstProject);
                setSelectedMonth(data[firstProject][0].month);
                setIframeLink(data[firstProject][0].link);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        setSelectedMonth(projects[event.target.value][0].month);
        setIframeLink(projects[event.target.value][0].link);
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
        <div style={{ width: '100%', display: 'flex', flexDirection: "column"}}>
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
                        {Object.keys(projects).map((project) => (
                            <MenuItem key={project} value={project}>{project}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
            </Box>
            <div style={{ display: iframeLoaded ? 'block' : 'none', width: '100%', height: '75vh', margin: 'auto' }}>
                <iframe
                    onLoad={handleIframeLoad}
                    src={iframeLink}
                    style={{ width: '100%', height: '100%', border: '1px solid #ccc', background: 'transparent' }}
                    title="Schedule Dashboard"
                ></iframe>
            </div>
        </div>
    );
};

export default ScheduleDashboards;
