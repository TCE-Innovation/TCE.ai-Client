import React, { useState, useEffect, useContext } from 'react';
import {pca} from './pcaConfig'; // Import the MSAL instance from pcaConfig.js
import { Navigate, Outlet } from 'react-router-dom';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("in auth provider use effect")
    try{
      pca.handleRedirectPromise().then((response) => {
        console.log("in auth provider redirect")
        if (response !== null && response.account !== null) {
          setCurrentUser(response.account);
          console.log("current user: ", response.account)
        }
      });
    } catch (error) {
      console.log('Use effect error:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthenticatedRoute() {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export function UnauthenticatedRoute() {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? <Outlet /> : <Navigate to="/" />;
}
