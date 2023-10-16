//REACT
import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//AUTH
import { useMsal } from "@azure/msal-react";
import { getUserProfilePic } from '../API Calls/Graph';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { accounts, instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPic, setUserPic] = useState(null);

  //see if user is already authenticated
  useEffect(() => {
    const cachedAuthState = localStorage.getItem('msalAuthState');
    if (cachedAuthState === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  //get user details
  useEffect(() => {
    if (isAuthenticated) {
      const activeAccount = accounts[0]; 
      instance.acquireTokenSilent({
        account: activeAccount,
        scopes: ["openid", "profile", "User.Read"], 
      }).then((response) => {
        //user is authenticated
        if (response) {

          //get user name and email
          const { name, username } = response.account;
          setUserName(name);
          setUserEmail(username);

          //get user profile picture
          getUserProfilePic(response.accessToken)
          .then((url) => {
            setUserPic(url);
          })
          .catch((error) => {
            console.error('Error fetching user profile picture:', error);
          });

          //get user role from airtable

          //save authentication state in local storage cache
          localStorage.setItem('msalAuthState', 'authenticated'); 
        }
      }).catch((error) => {
        console.error('Error fetching user details:', error);
      });
    } else {
      //remove cached authentication state
      localStorage.removeItem('msalAuthState'); 
    }
  }, [isAuthenticated, accounts, instance ]);

  const loginContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userName,
    userEmail,
    userPic
  };

  return (
    <AuthContext.Provider value={loginContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthenticatedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}