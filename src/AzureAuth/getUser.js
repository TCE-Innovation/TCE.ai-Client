// Import necessary libraries and dependencies
import { msalConfig, graphConfig } from './authConfig'; // Import your authentication and graph config
import { useMsal } from '@azure/msal-react';

// Function to fetch current user's information
const getUser = async () => {
  const { instance, accounts } = useMsal();

  // Check if there's a signed-in account
  if (accounts.length > 0) {
    try {
      // Make a request to Microsoft Graph API to get user's profile
      const response = await instance
        .acquireTokenSilent({
          ...msalConfig.auth,
          account: accounts[0], // Use the first signed-in account
        })
        .then((response) => {
          // Use the access token to make a request to Graph API
          return fetch(graphConfig.graphMeEndpoint, {
            headers: {
              Authorization: `Bearer ${response.accessToken}`,
            },
          });
        });

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();
        return {
          email: data.userPrincipalName, // User's email
          name: data.displayName, // User's name
        };
      } else {
        // Handle error
        throw new Error('Error fetching user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  return null; // No signed-in account found
};

export default getUser;
