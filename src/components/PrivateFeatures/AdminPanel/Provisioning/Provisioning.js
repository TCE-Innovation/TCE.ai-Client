import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar,  Box, Autocomplete, TextField, Button } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { getUsersOfTool, removeUserFromTool, addUsersToTool, removeAllUsersFromTool, getProjectTeam, updateUserProject, getEmailsAndProjects, getAllPersonnel } from '../../../../data/SQL';
import { getActiveProjects, getPBILog } from '../../../../data/Airtable';
import ToolSelect from './ToolSelect';
import UserTable from './UserTable';
import AddUserDialog from './AddUserDialog';
import ProjectTeam from './ProjectTeam';

const tableNameMap = {
    'Email Generator': 'email_generator',
    'Cable Run Optimizer': 'cable_run_optimizer',
    'Schedule Dashboards': 'schedule_dashboards',
    'Tool Usage Stats': 'tool_usage',
    'Drone Captures': 'drone_captures',
    'Chatbot': 'chatbot',
    'Equipment Install Tracking Dashboard': 'eit_dashboard',
    'Executive Dashboards': 'executive_dashboards',
    'Procore Dashboards' : 'procore_dashboards',
    'Chatbot Dashboard' : 'chatbot_dashboard',
};

const toolsWithProjectOption = [
    'Schedule Dashboards',
    'Drone Captures',
];

// map project team names to name of their Drone Captures Project name
const projectTeamToDroneProjectMap = {
    '207th St Rail Yard': '207th Street Yard',
    'Rockaway Line Resilience & Rehab': 'Rockaways',
}

// map project team names to name of their Schedule Dashboard Project name
const projectTeamToDashboardMap = {
    '8th Ave Structural Improvements': '8th Avenue Line (C-48731)',
    'Crosstown CBTC': 'Crosstown CBTC (S-48012)',
    'Rockaway Line Resilience & Rehab': 'Rockaway Resiliency (C-35327)',
    'ADA Package 4': 'ADA Package 4 (A-37139)',
    'DB PACIS Upgrades; Canarsie Line': 'Canarsie PACIS (W-32808)',
}

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
    const [userProjects, setUserProjects] = useState([]);
    const [dashboardProjects, setDashboardProjects] = useState([]);
    const [tableName, setTableName] = useState(null);
    const [defaultProjects, setDefaultProjects] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    /* 
    function to split comma-separated string into indidivual items
        use: "project1, project2" --> ["project1", "project2"]
    */
    const splitString = str => str ? str.split(',').map(s => s.trim()) : [];

    const handleToolChange = (event) => {
        setSelectedTool(event.target.value);
    };

    const handleRemoveUser = async (email) => {
        await removeUserFromTool(email, tableName);
        const removedUser = users.find(user => user.email === email);
        const updatedUsers = await getUsersOfTool(tableName);
        setUsers(updatedUsers)
        setFilteredPersonnelList(prevPersonnel => [...prevPersonnel, removedUser].sort((a, b) => a.name.localeCompare(b.name)));
    };

    const ManualEntryComponent = ({ open, onClose }) => {
        const [fullName, setFullName] = useState('');
        const [email, setEmail] = useState('');
        const [emailError, setEmailError] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [openSnackbar, setOpenSnackbar] = useState(false);

        const validateEmail = (email) => {
            // Basic email validation
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const handleProvision = async () => {
            if (!validateEmail(email)) {
                setEmailError(true);
                setErrorMessage('Please enter a valid email address');
                setOpenSnackbar(true);
                return;
            }
            setEmailError(false);
            setErrorMessage('');

            const selectedUser = [
                {
                    email: email,
                    name: fullName
                }
            ];

            await addUsersToTool(selectedUser, tableName, defaultProjects);
            const updatedUsers = await getUsersOfTool(tableName);
            setUsers(updatedUsers);

            // if (selectedTool in toolsWithProjectOption) {
            if (toolsWithProjectOption.includes(selectedTool)) {
                // set user projects accurately by referencing the DB
                const projects = await getEmailsAndProjects(tableName);
                setUserProjects(projects);
            }

            // Close the dialog after submission
            onClose();
        };

        return (
            <>
                <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                    <DialogTitle>Manual Entry</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={emailError}
                            helperText={emailError ? 'Invalid email address' : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleProvision}>Provision</Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                    <MuiAlert elevation={6} variant="filled" onClose={() => setOpenSnackbar(false)} severity="error">
                        {errorMessage}
                    </MuiAlert>
                </Snackbar>
            </>
        );
    };

    const handleManualEntry = async () => {
        setDialogOpen(true);
    }

    const handleAddUser = async () => {
        if (selectedUsers.length > 0) {
            await addUsersToTool(selectedUsers, tableName, defaultProjects);
            const updatedUsers = await getUsersOfTool(tableName);
            setUsers(updatedUsers)

            if (toolsWithProjectOption.includes(selectedTool)) {
                // set user projects accurately by referencing the DB
                const projects = await getEmailsAndProjects(tableName);
                setUserProjects(projects);
            }

            setFilteredPersonnelList(prevPersonnel =>
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
        await addUsersToTool(filteredPersonnelList, tableName, defaultProjects);
        const updatedUsers = await getUsersOfTool(tableName);
        setUsers(updatedUsers);
        setFilteredPersonnelList([]);
        setOpenAddAllDialog(false);
    };

    const handleOpenRemoveAllDialog = () => {
        setOpenRemoveAllDialog(true);
    };

    const handleCloseRemoveAllDialog = () => {
        setOpenRemoveAllDialog(false);
    };

    const handleConfirmRemoveAll = async () => {
        await removeAllUsersFromTool(tableName);
        setUsers([]);
        setFilteredPersonnelList(personnelList);
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
            let projectToAdd = null;
            if (selectedTool === "Schedule Dashboards") {
                const formattedProject = projectTeamToDashboardMap[selectedProject.trim()]
                if (dashboardProjects.includes(formattedProject)) {
                    projectToAdd = formattedProject
                } else { projectToAdd = defaultProjects; }
            } else if (selectedTool === "Drone Captures") {
                const formattedProject = projectTeamToDroneProjectMap[selectedProject.trim()]
                if (selectedProject.trim() in projectTeamToDroneProjectMap) {
                    projectToAdd = formattedProject
                } else { projectToAdd = defaultProjects; }
            }
            await addUsersToTool(projectTeam, tableName, projectToAdd);
            const updatedUsers = await getUsersOfTool(tableName);
            setUsers(updatedUsers)

            if (toolsWithProjectOption.includes(selectedTool)) {
                // set user projects accurately by referencing the DB
                const projects = await getEmailsAndProjects(tableName);
                setUserProjects(projects);
            }

            setFilteredPersonnelList(prevPersonnel =>
                prevPersonnel.filter(person =>
                    !projectTeam.some(user => user.email === person.email)
                )
            );
            setSelectedProject(projectToAdd);
            setProjectTeam([]);
        }
    };

    const handleUserProjectChange = async (email, projectString) => {
        try {
            await updateUserProject(email, projectString, tableName);
            const newProjectsArray = splitString(projectString);
            setUserProjects(prevProjects => {
                const updatedProjects = prevProjects.map(user =>
                    user.email === email ? {...user, projects: newProjectsArray } : user
                );
                return updatedProjects;
            });
        } catch (error) {
            console.error('Error updating user project:', error);
        }
    };

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
        const fetchProjects = async () => {
            try {
                const data = await getPBILog("tblGN3jn8NvpVOnFo");
                let projectOptions = Object.keys(data);
                projectOptions = [...projectOptions];
                setDashboardProjects(projectOptions);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    // When the selected tool changes
    useEffect(() => {

        // Table that corresponds to newly selected tool
        let new_table;

        // Set the table name
        if (selectedTool) {
            new_table = tableNameMap[selectedTool];
            setTableName(new_table);
        }

        // Fetch the correct list of users
        const fetchUsers = async () => {
            if (selectedTool) {
                if (new_table) {
                    const result = await getUsersOfTool(new_table);
                    setUsers(result);
                    setSearched(true);
                    const filteredPersonnelList = personnelList.filter(person =>
                        !result.some(user => user.email === person.email)
                    );
                    setFilteredPersonnelList(filteredPersonnelList);
                } else {
                    console.error('Tool not found in map');
                }
            }
        };
        fetchUsers();

        // Set the default project provisions for new users added
        if (selectedTool === "Schedule Dashboards") {
           setDefaultProjects("");
        } else if (selectedTool === "Drone Captures") {
            const allProjectString = (Object.values(projectTeamToDroneProjectMap)).join(', ');
            setDefaultProjects(allProjectString);
        } else {
            setDefaultProjects(null);
        }

        // set the users' projects
        const fetchUserProjects = async () => {
            try {
                const projects = await getEmailsAndProjects(new_table);
                setUserProjects(projects);
            } catch (error) {
                console.error('Error fetching user projects:', error);
            }
        };
        if (toolsWithProjectOption.includes(selectedTool)) {
            fetchUserProjects();
        }
        
    }, [selectedTool, personnelList]);

    useEffect(() => {
        const filterPersonnel = () => {
            const filteredPersonnelList = personnelList.filter(person =>
                !users.some(user => user.email === person.email)
            );
            setFilteredPersonnelList(filteredPersonnelList);
        };
        filterPersonnel();
    }, [users, selectedTool, personnelList]);

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: ".5vw", backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
            <Box sx={{ width: '95%', padding: 2 }}>
                <ToolSelect selectedTool={selectedTool} handleToolChange={handleToolChange} tableNameMap={tableNameMap} />

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
                                style={{ marginBottom: '1rem', width: '55%', marginRight: '1vw', marginTop: '0.5rem' }}
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
                                onClick={handleManualEntry}
                                style={{
                                    backgroundColor: '#F6F8FA',
                                    color: 'black',
                                    border: '1px solid #D0D7DE',
                                    marginBottom: '1rem',
                                    marginRight: '1vw'
                                }}
                            >
                                Manually Add User
                            </Button>
                            <ManualEntryComponent open={dialogOpen} onClose={() => setDialogOpen(false)} />

                            <Button
                                variant="contained"
                                onClick={handleAddUser}
                                disabled={selectedUsers.length === 0}
                                style={{
                                    backgroundColor: selectedUsers.length > 0 ? '#d7edd1' : '#D3D3D3',
                                    color: selectedUsers.length > 0 ? 'green' : '#9C9C9C',
                                    border: selectedUsers.length > 0 ? '1px solid green' : '1px solid #D3D3D3',
                                    marginBottom: '1rem',
                                    marginRight: '1vw'
                                }}
                            >
                                Add Selected User(s)
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleOpenAddAllDialog}
                                disabled={filteredPersonnelList.length === 0 || selectedUsers.length !== 0}
                                style={{
                                    backgroundColor: (filteredPersonnelList.length > 0 && selectedUsers.length === 0) ? '#d7edd1' : '#D3D3D3',
                                    color: (filteredPersonnelList.length > 0 && selectedUsers.length === 0) ? 'green' : '#9C9C9C',
                                    border: (filteredPersonnelList.length > 0 && selectedUsers.length === 0) ? '1px solid green' : '1px solid #D3D3D3',
                                    marginBottom: '1rem',
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
                                    marginBottom: '1rem',
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
                            tableNameMap={tableNameMap}
                            nonProvisionedCount={filteredPersonnelList.length}
                        />
                    </>
                )}
            </Box>
        </div>
    );
};

export default Provisioning;
