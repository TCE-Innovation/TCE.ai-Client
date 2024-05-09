//DEPENDENCIES
import axios from 'axios';

//_____________________________________________________ TOOL PROVISIONING FUNCTIONS ________________________________________________________

//function to pull tools from SQL db based on email
export async function getTools(email) { 
    const sessionStorageKey = `tools-${email}`;
    const cachedData = sessionStorage.getItem(sessionStorageKey);
    
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-user-tools', { email } );

        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

        return data;
    } catch(error){
        console.error('Error fetching tools:', error);
    }
}

//function to add users to a tool table in SQL db based on email. users is an array of user objects [{email: email, name: name}, ...]
export async function addUsersToTool(users, tool) {
    try {
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/add-users-to-tool', { users, tool });
        console.log(users)
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