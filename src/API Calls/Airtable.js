//DEPENDENCIES
import axios from 'axios';

//function to pull job title from Airtable based on name
export async function getJobTitle(name) { 
    // Define a unique key for localStorage based on the function and parameters
    const localStorageKey = `jobTitle-${name}`;

    // Try to get the cached data from localStorage
    console.log("Checking for cached job title")
    const cachedData = localStorage.getItem(localStorageKey);
    if (cachedData) {
        console.log("Cached job title found")
        // Parse and return the cached data if it exists
        return JSON.parse(cachedData);
    }

    try {
        console.log("No cached job title, getting from Airtable")
        // If no cached data, proceed with the API call
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-job-title', { name });

        // Store the API response in localStorage for future use
        localStorage.setItem(localStorageKey, JSON.stringify(data));

        return data;
    } catch (error) {
        console.error('Error fetching job title:', error);
    }
}


//function to pull job title from Airtable based on email
export async function getProjects(email) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-user-projects', { email } );
        return data;
    }
    catch(error){
        console.error('Error fetching projects:', error);
    }
}

//function to send private form data to airtable base
export async function sendPrivateFormData(name, email, description) {
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/send-private-form', { name, email, description } );
        return data;
    }
    catch(error){
        console.error('Error sending private form data:', error);
    }
}

//function to send public form data to airtable base
export async function sendPublicFormData(name, email, organization, phone, contactMessage) {
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/send-public-form', { name, email, organization, phone, contactMessage } );
        return data;
    }
    catch(error){
        console.error('Error sending public form data:', error);
    }    
}


//function to send asset form data to airtable base
export async function sendAssetFormData(name, email, item, project, reason, dateNeeded, dateReturn, initials) {
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/send-asset-form', { name, email, item, project, reason, dateNeeded, dateReturn, initials } );
        return data;
    }
    catch(error){
        console.error('Error sending asset form data:', error);
    }    
}

//function to get project data from airtable base
export async function getActiveProjects() {
    try{
        const {data} = await axios.get('https://tce-ai-api.azurewebsites.net/api/get-active-projects');
        return data;
    }
    catch(error){
        console.error('Error getting active projects:', error);
    }    
}


//function to log when someone has signed into the site
export async function updateUserLog(name) {
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/update-user-log', { name } );
        return data;
    }
    catch(error){
        console.error('Error updating user log:', error);
    }    
}