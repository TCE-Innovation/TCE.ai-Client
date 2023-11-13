//REACT
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//AUTH
import { useMsal } from "@azure/msal-react";
import { getUserProfilePic } from '../API Calls/Graph';
import { getJobTitle, getProjects } from '../API Calls/Airtable';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { accounts, instance } = useMsal();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [userTitle, setUserTitle] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //get user details
  useEffect(() => {
    console.log('useEffect');
    const getAccount = async () => {
      try{
        const activeAccount = accounts[0]; 
        console.log('activeAccount', activeAccount);
        console.log('instance', instance);
        setTimeout(async () => {
          if (activeAccount) {
            const response = await instance.acquireTokenSilent({
              account: activeAccount,
              scopes: ["openid", "profile", "User.Read", "Mail.Send"], 
            });
            fetchAndSetUserDetails(response.accessToken, response.account.name, response.account.username);
          }
        }, 0)
        
      } catch(error){
            console.error('Error fetching user details:', error);
      };
    }

    if(instance && accounts){
      if (!instance.getAllAccounts().length && window.location.hash) {
        // MSAL is still processing the redirect, handle the response
        instance.handleRedirectPromise().then(() => {
          getAccount(); // Now that MSAL has processed the redirect, get the account
        });
      } else {
        // No redirect is being processed, it's safe to get the account
        getAccount();
      }
    }

  }, [accounts, instance]);

  //function to fetch user details
  function fetchAndSetUserDetails(accessToken, name, email) {
    setUserName(name);
    setUserEmail(email);
    setAccessToken(accessToken);

    getUserProfilePic(accessToken)
      .then(setUserPic)
      .catch((error) => console.error('Error fetching user profile picture:', error));

    getJobTitle(name)
      .then(setUserTitle)
      .catch((error) => console.error('Error fetching user job title:', error));

    getProjects(name)
      .then(setUserProjects)
      .catch((error) => console.error('Error fetching user projects:', error));
  }

  const loginContextValue = {
    userName,
    userEmail,
    userPic,
    userTitle,
    userProjects,
    accessToken
  };

  return (
    <AuthContext.Provider value={loginContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthenticatedRoute() {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}