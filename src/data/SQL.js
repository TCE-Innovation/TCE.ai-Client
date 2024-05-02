//function to pull tools from SQL db based on email
export async function getTools(email) { 
    // Define a unique key for localStorage based on the function and parameters
    const sessionStorageKey = `tools-${email}`;

    // Try to get the cached data from localStorage
    //console.log("Checking for cached applications")
    const cachedData = sessionStorage.getItem(sessionStorageKey);
    if (cachedData) {
        //console.log("Cached applications found")
        // Parse and return the cached data if it exists
        return JSON.parse(cachedData);
    }
    
    try{
        //console.log("No cached applications, getting from SQL db")
        // If no cached data, proceed with the API call
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/get-user-tools', { email } );

        // Store the API response in localStorage for future use
        sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

        return data;
    } catch(error){
        console.error('Error fetching tools:', error);
    }
}

//function to add users to a tool table in SQL db based on email. users is an array of user objects [{email: email, name: name}, ... ]
export async function addUsersToTool(users, tool) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/add-users-to-tool', { users, tool } );
        return data;
    } catch(error){
        console.error('Error adding users to tool table:', error);
    }
}

//function to remove users from a tool table in SQL db based on email. users is an array of user objects [{email: email, name: name}, ... ]
export async function addUsersToTool(users, tool) { 
    try{
        const {data} = await axios.post('https://tce-ai-api.azurewebsites.net/api/remove-users-from-tool', { users, tool } );
        return data;
    } catch(error){
        console.error('Error removing users from tool table:', error);
    }
}