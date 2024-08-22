import React, { useState, useEffect } from 'react';
import TrainLoader from '../General/TrainLoader';
import { getOverviewDashboardLink } from '../../data/Airtable'; // Adjust the path to where your function is located

const Training = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');
    const [roles, setRoles] = useState([]);
    const [tools, setTools] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedTool, setSelectedTool] = useState('');
    const [embedLink, setEmbedLink] = useState('');

    useEffect(() => {
        const fetchLink = async () => {
            try {
                const response = await getOverviewDashboardLink();
                if (response && response.length > 0) {
                    setIframeSrc(response[0].url);
                } else {
                    console.error('No URL found in the response');
                }
            } catch (error) {
                console.error('Error fetching the dashboard link:', error);
            }
        };

        fetchLink();
    }, []);

    const handleIframeLoad = () => {
        setIframeLoaded(true);
    };

    const handleRoleChange = (e) => {
        const selectedRole = e.target.value;
        setSelectedRole = selectedRole;

        // filter tools based on selected role
        const filteredTools = tools.filter(tool => tool.role === selectedRole);
        setTools(filteredTools);
        setSelectedTool('');
        setEmbedLink('');
    }

    const handleToolChange = (e) => {
        const selectedTool = e.target.value;
        setSelectedTool(selectedTool);

        // find embed link for selected tool
        const tool = tools.find(tool => tool.name === selectedTool);
        if (tool) {
            setEmbedLink(tool.embedLink);
        }
    }

    const spinnerContainerStyle = {
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <select 
                    value={selectedRole} 
                    onChange={handleRoleChange} 
                    style={{ marginRight: '10px' }}
                >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                    ))}
                </select>
                
                <select 
                    value={selectedTool} 
                    onChange={handleToolChange} 
                    disabled={!selectedRole}
                >
                    <option value="">Select Tool</option>
                    {tools.map(tool => (
                        <option key={tool.id} value={tool.name}>
                            {tool.name}
                        </option>
                    ))}
                </select>
            </div>

            {embedLink && (
                <iframe
                    title="Training Video"
                    src={embedLink}
                    style={{
                        width: '100%',
                        height: '500px',
                        border: 'none',
                    }}
                    allowFullScreen
                ></iframe>
            )}
        </div>
    );
};

export default Training;