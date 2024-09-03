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
export async function getUsageLog(sortField = 'Last Login (Date)', sortDirection = 'desc') {
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
export async function getPBILog(tableID) {
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-pbi-log', tableID);
        console.log(data);
        return data;
    }
    catch(error){
        console.error('Error getting PBI Log:', error);
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
export async function send3dPrintingFormData(formData) {
    try {
        // let formData = { item, reason, project, dateNeeded, email, file };
        const { file } = formData;

        console.log("In airtable function: ")
        if (file){
            console.log(file.name)
            console.log(file)
            console.log(typeof(file)) // should be string
        }
        else
            console.log("No file in airtable function")

        console.log("FORM DATA:")
        console.log(formData)
        const { data } = await axios.post('https://tce-ai-api.azurewebsites.net/api/send-3d-printing-form', formData);

        return data;
    } catch (error) {
        console.error('Error sending 3D printing form data:', error);
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

//function to log when someone has signed into the site
export async function getTrainingLink() {
    try{
        const {data} = await axios.get('https://tce-ai-api.azurewebsites.net/api/get-training-link');
        return data;
    }
    catch(error){
        console.error('Error updating user log:', error);
    }
}