//DEPENDENCIES
import axios from 'axios';

//function to calculate clearance given the input_object
export async function calculateClearance(input_object) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/post-llle-clearance', { input_object } );
        return data;
    } catch(error){
        console.error('Error fetching tools:', error);
    }
}