//REACT
import React, { useState, useEffect, createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

//AUTH
import { useMsal } from "@azure/msal-react";
import { getUserProfilePic } from '../API Calls/Graph';
import { getJobTitle, getProjects } from '../API Calls/Airtable';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { accounts, instance } = useMsal();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [userTitle, setUserTitle] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  //get user account
  useEffect(() => {
    const getAccount = async () => {
      try{
        const activeAccount = accounts[0]; 
        setTimeout(async () => {
          if (activeAccount) {
            const response = await instance.acquireTokenSilent({
              account: activeAccount,
              scopes: ["openid", "profile", "User.Read", "Mail.Send"], 
            });
            fetchAndSetUserDetails(response.accessToken, response.account.name, response.account.username);
          }
        }, 0);

      } catch(error){
            console.error('Error fetching user details:', error);
      };
    }
    
    getAccount();
    
  }, [accounts, instance]);

  //function to fetch user details
  function fetchAndSetUserDetails(accessToken, name, email) {
    email = email.toLowerCase();
    setUserName(name);
    setUserEmail(email);
    setAccessToken(accessToken);

    getUserProfilePic(accessToken)
      .then(setUserPic)
      .catch((error) => console.error('Error fetching user profile picture:', error));

    getJobTitle(name)
      .then(setUserTitle)
      .catch((error) => console.error('Error fetching user job title:', error));

    getProjects(email)
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
  const location = useLocation();
  const isAuthenticated = accounts.length > 0;

  if (!isAuthenticated) {
    localStorage.setItem('postLoginRedirect', location.pathname + location.search);
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

export function UnauthenticatedRoute() {
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  if (isAuthenticated) {
    return <Navigate to="/private/welcome" replace />;
  }

  return <Outlet />;
}