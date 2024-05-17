import React, { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Button } from '@mui/material';
import { getUsersOfTool, removeUserFromTool, addUsersToTool, removeAllUsersFromTool, getProjectTeam, updateUserProject, getUserProjectSD, getAllPersonnel } from '../../../../data/SQL';
import { getActiveProjects, getPBILog } from '../../../../data/Airtable';
import ToolSelect from './ToolSelect';
import UserTable from './UserTable';
import AddUserDialog from './AddUserDialog';
import ProjectTeam from './ProjectTeam';

const toolNameMap = {
    'Email Generator': 'email_generator',
    'Cable Run Optimizer': 'cable_run_optimizer',
    'Schedule Dashboards': 'schedule_dashboards',
    'Tool Usage Stats': 'tool_usage',
};

const Provisioning = () => {
    const [selectedTool, setSelectedTool] = useState('');
    const [users, setUsers] = useState([]);
    const [personnelList, setPersonnelList] = useState([]);
    const [searched, setSearched] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filteredPersonnelList, setFilteredPersonnelList] = useState([]);
    const [activeProjects, setActiveProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [projectTeam, setProjectTeam] = useState([]);
    const [openAddAllDialog, setOpenAddAllDialog] = useState(false);
    const [openRemoveAllDialog, setOpenRemoveAllDialog] = useState(false);
    const [userProjects, setUserProjects] = useState({});
    const [dashboardProjects, setDashboardProjects] = useState([]);

    useEffect(() => {
        const fetchPersonnelList = async () => {
            try {
                const personnel = await getAllPersonnel();
                setPersonnelList(personnel);
            } catch (error) {
                console.error('Error fetching personnel list:', error);
            }
        };
        fetchPersonnelList();
    }, []);

    useEffect(() => {
        const fetchActiveProjects = async () => {
            try {
                const projects = await getActiveProjects();
                const activeProjects = projects.filter(project => project.status === 'Active');
                setActiveProjects(activeProjects);
            } catch (error) {
                console.error('Error fetching active projects:', error);
            }
        };
        fetchActiveProjects();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (selectedTool) {
                const sqlToolName = toolNameMap[selectedTool];
                if (sqlToolName) {
                    const result = await getUsersOfTool(sqlToolName);
                    setUsers(result);
                    setSearched(true);
                } else {
                    console.error('Tool not found in map');
                }
            }
        };
        fetchUsers();
    }, [selectedTool]);

    useEffect(() => {
        const filterPersonnel = () => {
            const filteredPersonnelList = personnelList.filter(person =>
                !users.some(user => user.email === person.email)
            );
            setFilteredPersonnelList(filteredPersonnelList);
        };
        filterPersonnel();
    }, [users, selectedTool, personnelList]);

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                const projects = await getUserProjectSD();
                const projectMap = projects.reduce((acc, project) => {
                    acc[project.email] = project.projects;
                    return acc;
                }, {});
                setUserProjects(projectMap);
            } catch (error) {
                console.error('Error fetching user projects:', error);
            }
        };
        fetchUserProjects();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getPBILog();
                let projectOptions = Object.keys(data);
                projectOptions = ["All", "None", ...projectOptions];
                setDashboardProjects(projectOptions);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    const handleRemoveUser = async (email) => {
        await removeUserFromTool(email, toolNameMap[selectedTool]);
        const removedUser = users.find(user => user.email === email);
        setUsers(prevUsers => prevUsers.filter(user => user.email !== email));
        setPersonnelList(prevPersonnel => [...prevPersonnel, removedUser].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const handleAddUser = async () => {
        if (selectedUsers.length > 0) {
            await addUsersToTool(selectedUsers, toolNameMap[selectedTool], 'None');
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);

            setPersonnelList(prevPersonnel =>
                prevPersonnel.filter(person =>
                    !selectedUsers.some(user => user.email === person.email)
                )
            );

            setSelectedUsers([]);
            setInputValue('');
        }
    };

    const handleOpenAddAllDialog = () => {
        setOpenAddAllDialog(true);
    };

    const handleCloseAddAllDialog = () => {
        setOpenAddAllDialog(false);
    };

    const handleConfirmAddAll = async () => {
        await addUsersToTool(filteredPersonnelList, toolNameMap[selectedTool]);
        const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
        setUsers(updatedUsers);
        setPersonnelList([]);
        setOpenAddAllDialog(false);
    };

    const handleOpenRemoveAllDialog = () => {
        setOpenRemoveAllDialog(true);
    };

    const handleCloseRemoveAllDialog = () => {
        setOpenRemoveAllDialog(false);
    };

    const handleConfirmRemoveAll = async () => {
        await removeAllUsersFromTool(toolNameMap[selectedTool]);
        setUsers([]);
        setPersonnelList(personnelList);
        setOpenRemoveAllDialog(false);
    };

    const handleProjectChange = async (event) => {
        setSelectedProject(event.target.value);
        try {
            const team = await getProjectTeam(event.target.value);
            setProjectTeam(team);
        } catch (error) {
            console.error('Error fetching project team:', error);
        }
    };

    const handleCancelProjectSelection = () => {
        setSelectedProject('');
        setProjectTeam([]);
    };

    const handleAddProjectTeam = async () => {
        if (projectTeam.length > 0) {
            const projectToAdd = dashboardProjects.includes(selectedProject) ? selectedProject : 'None';
            await addUsersToTool(projectTeam, toolNameMap[selectedTool], projectToAdd);
            const updatedUsers = await getUsersOfTool(toolNameMap[selectedTool]);
            setUsers(updatedUsers);

            setPersonnelList(prevPersonnel =>
                prevPersonnel.filter(person =>
                    !projectTeam.some(user => user.email === person.email)
                )
            );

            setSelectedProject('');
            setProjectTeam([]);
        }
    };

    const handleUserProjectChange = async (email, project) => {
        try {
            await updateUserProject(email, project);
            setUserProjects(prevProjects => ({ ...prevProjects, [email]: project }));
        } catch (error) {
            console.error('Error updating user project:', error);
        }
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: ".5vw", backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <Box sx={{ width: '70%', padding: 2 }}>
                <ToolSelect selectedTool={selectedTool} handleToolChange={handleToolChange} toolNameMap={toolNameMap} />

                {searched && (
                    <>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Autocomplete
                                value={selectedUsers}
                                onChange={(event, newValue) => setSelectedUsers(newValue)}
                                multiple
                                options={filteredPersonnelList}
                                getOptionLabel={(option) => option.name}
                                inputValue={inputValue}
                                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                                filterOptions={(options, state) =>
                                    state.inputValue.length >= 1
                                        ? options.filter(option => option.name.toLowerCase().includes(state.inputValue.toLowerCase()))
                                        : []
                                }
                                noOptionsText={inputValue.length < 1 ? "Start typing to search" : "No options"}
                                renderInput={(params) => <TextField {...params} label="Add User(s)" />}
                                style={{ marginBottom: '2rem', width: '40%', marginRight: '1vw' }}
                                disabled={filteredPersonnelList.length === 0}
                            />
                            
                            <ProjectTeam
                                activeProjects={activeProjects}
                                selectedProject={selectedProject}
                                handleProjectChange={handleProjectChange}
                                projectTeam={projectTeam}
                                handleAddProjectTeam={handleAddProjectTeam}
                                handleCancelProjectSelection={handleCancelProjectSelection}
                                isDisabled={filteredPersonnelList.length === 0}
                            />
                        </Box>
                            <Button
                                variant="contained"
                                onClick={handleAddUser}
                                disabled={selectedUsers.length === 0}
                                style={{
                                    backgroundColor: selectedUsers.length > 0 ? '#d7edd1' : 'gray',
                                    color: selectedUsers.length > 0 ? 'green' : 'white',
                                    border: selectedUsers.length > 0 ? '1px solid green' : 'white',
                                    marginBottom: '2rem',
                                    marginRight: '1vw'
                                }}
                            >
                                Add Selected User(s)
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleOpenAddAllDialog}
                                disabled={filteredPersonnelList.length === 0}
                                style={{
                                    backgroundColor: filteredPersonnelList.length > 0 ? '#d7edd1' : 'gray',
                                    color: filteredPersonnelList.length > 0 ? 'green' : 'white',
                                    border: filteredPersonnelList.length > 0 ? '1px solid green' : 'white',
                                    marginBottom: '2rem',
                                    marginRight: '1vw',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Add All Users
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleOpenRemoveAllDialog}
                                disabled={users.length === 0}
                                style={{
                                    backgroundColor: users.length > 0 ? '#fad9d9' : 'gray',
                                    color: users.length > 0 ? 'red' : 'white',
                                    border: users.length > 0 ? '1px solid red' : 'white',
                                    marginBottom: '2rem',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Remove All Users
                            </Button>
                        

                        <AddUserDialog
                            open={openAddAllDialog}
                            handleClose={handleCloseAddAllDialog}
                            handleConfirm={handleConfirmAddAll}
                            title="Confirm Add All"
                            description={`Are you sure you want to add ${filteredPersonnelList.length} people to ${selectedTool}?`}
                        />

                        <AddUserDialog
                            open={openRemoveAllDialog}
                            handleClose={handleCloseRemoveAllDialog}
                            handleConfirm={handleConfirmRemoveAll}
                            title="Confirm Remove All"
                            description={`Are you sure you want to remove all ${users.length} users from ${selectedTool}?`}
                        />

                        <UserTable
                            users={users}
                            handleRemoveUser={handleRemoveUser}
                            selectedTool={selectedTool}
                            userProjects={userProjects}
                            handleUserProjectChange={handleUserProjectChange}
                            dashboardProjects={dashboardProjects}
                            provisionedCount={users.length}
                            nonProvisionedCount={filteredPersonnelList.length}
                        />
                    </>
                )}
            </Box>
        </div>
    );
};

export default Provisioning;
