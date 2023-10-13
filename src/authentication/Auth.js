//REACT
import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
//AUTH
import { useMsal } from "@azure/msal-react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { accounts, instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    const cachedAuthState = localStorage.getItem('msalAuthState');
    if (cachedAuthState === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const activeAccount = accounts[0]; 
      instance.acquireTokenSilent({
        account: activeAccount,
        scopes: ["openid", "profile", "User.Read"], 
      }).then((response) => {
        if (response) {
          const { name, username } = response.account;
          setUserName(name);
          setUserEmail(username);

          const headers = new Headers();
          const bearer = `Bearer ${response.accessToken}`;
          headers.append("Authorization", bearer);
          const options = {
            method: "GET",
            headers: headers,
          };
          const graphEndpoint = "https://graph.microsoft.com/v1.0/me/photo/$value";
          fetch(graphEndpoint, options)
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(blob);
              setUserPic(url);
            });
          
          localStorage.setItem('msalAuthState', 'authenticated'); // Save authentication state
        }
      }).catch((error) => {
        console.error('Error fetching user details:', error);
      });
    } else {
      localStorage.removeItem('msalAuthState'); // Remove cached authentication state
    }
  }, [isAuthenticated, accounts, instance]);

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