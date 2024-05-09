import React, { useState, useEffect } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getPBILog } from '../../data/Airtable'; 

const PBIDashboards = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeLink, setIframeLink] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getPBILog(); 
                if (data) {
                    setProjects(data);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleProjectChange = (event) => {
        setSelectedProject(event.target.value);
        const project = projects.find(p => p.projectName === event.target.value);
        if (project) {
            setSelectedMonth(project.records[0].month);  // Default to the first month
            setIframeLink(project.records[0].link);  // Default to the first link
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        const project = projects.find(p => p.projectName === selectedProject);
        const record = project.records.find(r => r.month === event.target.value);
        if (record) {
            setIframeLink(record.link);
        }
    };

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const spinnerContainerStyle = {
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: "column", alignContent: 'center', marginTop: 20}}>
            {!iframeLoaded && (
                <div style={spinnerContainerStyle}>
                    <TrainLoader />
                </div>
            )}
            <select value={selectedProject} onChange={handleProjectChange}>
                {projects.map((project) => (
                    <option key={project.projectName} value={project.projectName}>
                        {project.projectName}
                    </option>
                ))}
            </select>
            <select value={selectedMonth} onChange={handleMonthChange}>
                {projects.find(p => p.projectName === selectedProject)?.records.map((record) => (
                    <option key={record.month} value={record.month}>
                        {record.month}
                    </option>
                ))}
            </select>
            <div style={{ display: iframeLoaded ? 'block' : 'none' }}>
                <iframe
                    onLoad={handleIframeLoad}
                    className="airtable-embed airtable-dynamic-height"
                    src={iframeLink}
                    width="100%"
                    height="750px"
                    title="Data Dashboard"
                    style={{ background: 'transparent', border: '1px solid #ccc' }}
                ></iframe>
            </div>
        </div>
    );
};

export default PBIDashboards;
