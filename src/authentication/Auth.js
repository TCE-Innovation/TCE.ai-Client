//REACT
import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

//AUTH
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts, instance } = useMsal();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  //set role

  useEffect(() => {
    if (isAuthenticated) {
      // Get the user's claims from the ID token
      const activeAccount = accounts[0]; 
      instance.acquireTokenSilent({
        account: activeAccount,
        scopes: ["openid", "profile"], 
      }).then((response) => {
        console.log(response);
        if (response) {
          const { name, username } = response.account;
          setUserName(name);
          setUserEmail(username);
        }
      }).catch((error) => {
        console.error('Error fetching user details:', error);
      });
    }
  }, [isAuthenticated, accounts, instance]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthenticatedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}

/*export function UnauthenticatedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/private" />;
}*/
