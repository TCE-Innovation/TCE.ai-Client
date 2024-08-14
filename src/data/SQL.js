//DEPENDENCIES
import axios from 'axios';

//_____________________________________________________HELPER FUNCTION(S)________________________________________________________

/* 
function to split comma-separated string into indidivual items
    use: "project1, project2" --> ["project1", "project2"]
*/
const splitString = str => str ? str.split(',').map(s => s.trim()) : [];

//_____________________________________________________ TOOL PROVISIONING FUNCTIONS ________________________________________________________

//function to pull tools from SQL db based on email
export async function getTools(email) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-user-tools', { email } );
        return data;
    } catch(error){
        console.error('Error fetching applications:', error);
    }
}

// function to add users to a tool table in SQL db based on email. users is an array of user objects [{email: email, name: name}, ...]
export async function addUsersToTool(users, tool, project) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/add-users-to-tool', { users, tool, project });
        return data;
    } catch (error) {
        console.error('Error adding user to tool table:', error);
        throw new Error('An error occurred while adding users to the tool table');
    }
}

//function to remove users from a tool table in SQL db based on email
export async function removeUserFromTool(email, tool) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/remove-user-from-tool', { email, tool });
        return data;
    } catch (error) {
        console.error('Error removing user from tool table:', error);
        throw new Error('An error occurred while removing user from the tool table');
    }
}

//function to remove users from a tool table in SQL db based on email
export async function removeAllUsersFromTool(tool) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/remove-all-users-from-tool', { tool });
        return data;
    } catch (error) {
        console.error('Error removing all users from tool table:', error);
        throw new Error('An error occurred while removing all users from the tool table');
    }
}

//function to get all the users of a single tool
export async function getUsersOfTool(tool) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-users-of-tool', { tool } );
        return data;
    } catch(error){
        console.error('Error getting users of tool:', error);
    }
}

// function to update project selection for a user in the schedule_dashboards table
export async function updateUserProject(email, project, table) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/sd-update-user-project', { email, project, table });
        return data;
    } catch (error) {
        console.error('Error updating user project:', error);
        throw new Error('An error occurred while updating user project');
    }
}

// function to fetch emails and projects from table
export async function getEmailsAndProjects(table) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/sd-get-user-project', { table });
        if (Array.isArray(data)) {
            return data.map(item => ({
                ...item,
                projects: splitString(item.projects)
            }));
        }
    } catch (error) {
        console.error('Error fetching user project:', error);
        throw new Error('An error occurred while fetching user project');
    }
}

// function to fetch a users projects in table and return in array form
export async function getUserProjectsArray(email, table) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/sd-get-user-dashboards', { email, table });
        return splitString(data);
    } catch (error) {
        console.error('Error fetching user dashboards:', error);
        throw new Error('An error occurred while fetching user dashboards');
    }
}


// function to fetch a users projects in table and return in comma-separated string form
export async function getUserProjects(email, table) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/sd-get-user-dashboards', { email, table });
        return data;
    } catch (error) {
        console.error('Error fetching user dashboards:', error);
        throw new Error('An error occurred while fetching user dashboards');
    }
}


//_____________________________________________________ USER DATA FUNCTIONS ________________________________________________________

//function to grab user applications from SQL db based on email
export async function getApplications(email) { 
    const sessionStorageKey = `apps-${email}`;
    const cachedData = sessionStorage.getItem(sessionStorageKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }
    
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-user-applications', { email } );

        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

        return data;
    } catch(error){
        console.error('Error fetching applications:', error);
    }
}

//function to pull user projects from SQL db based on email
export async function getProjects(email) { 
    const sessionStorageKey = `projects-${email}`;
    const cachedData = sessionStorage.getItem(sessionStorageKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }
    
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-user-projects', { email } );

        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

        return data;
    } catch(error){
        console.error('Error fetching projects:', error);
    }
}

//function to pull user job title from SQL db based on email
export async function getJobTitle(email) { 
    const sessionStorageKey = `jobTitle-${email}`;
    const cachedData = sessionStorage.getItem(sessionStorageKey);

    if (cachedData) {
        return JSON.parse(cachedData);
    }

    try {
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-job-title', { email });

        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

        return data;
    } catch (error) {
        console.error('Error fetching job title:', error);
    }
}






//_____________________________________________________ GENERAL DATA FUNCTIONS ________________________________________________________

//function to pull all personnel from Airtable in form of [{name: 'name', email: 'email'}, ...]
export async function getAllPersonnel() { 
    try {
        const { data } = await axios.get('https://tce-ai-api.azurewebsites.net/api/get-all-personnel');
        
        // Find the person with email 'stobin@tcelect.net' and set their name to 'Shane Tobin'
        const personToUpdate = data.find(person => person.email === 'stobin@tcelect.net');
        if (personToUpdate) {
            personToUpdate.name = 'Shane Tobin';
        }

        return data;
    } catch (error) {
        console.error('Error fetching applications:', error);
        return []; // Return an empty array or handle the error accordingly
    }
}

//function to pull project team from SQL db
export async function getProjectTeam(project) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-project-team', { project } );
        return data;
    } catch(error){
        console.error('Error fetching project team:', error);
    }
}