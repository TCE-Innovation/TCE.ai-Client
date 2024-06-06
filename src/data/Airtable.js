//DEPENDENCIES
import axios from 'axios';

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

//function to get project data from airtable base
export async function getUsageLog(sortField = 'Last Login', sortDirection = 'desc') {
    try {
        const { data } = await axios.get(`https://tce-ai-api.azurewebsites.net/api/get-usage-log`, {
            params: { sortField, sortDirection }
        });
        return data;
    } catch (error) {
        console.error('Error getting usage log:', error);
        throw error;
    }
}

//function to get PBI log data from airtable base
export async function getPBILog() {
    try{
        const {data} = await axios.get('https://tce-ai-api.azurewebsites.net/api/get-pbi-log');
        return data;
    }
    catch(error){
        console.error('Error getting PBI Log:', error);
    }    
}

//function to get overview dashboard link from airtable base
export async function getOverviewDashboardLink() {
    try{
        const {data} = await axios.get('https://tce-ai-api.azurewebsites.net/api/get-overview-dashboard-link');
        return data;
    }
    catch(error){
        console.error('Error getting Overview Dashboard Link:', error);
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

//function to send support form data to airtable base and create asana task
export async function sendSupportFormData(formData) {
    try{
        const {data} = await axios.post('https://support-functions.azurewebsites.net/api/airtable-asana', { formData } );
        return data;
    }
    catch(error){
        console.error('Error sending support form data:', error);
    }    
}

//function to send 3D printing form data to airtable base
export async function send3dPrintingFormData(item, reason, project, dateNeeded, email, file) {
    try {
        let formData = { item, reason, project, dateNeeded, email };
        
        if (file !== undefined) {
            formData.file = file;
        }
        
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/send-3d-printing-form', formData);
        return data;
    } catch (error) {
        console.error('Error sending asset form data:', error);
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