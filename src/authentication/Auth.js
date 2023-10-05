//REACT
import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
//AUTH
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const { accounts, instance } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(useIsAuthenticated());
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    console.log("in Auth.js useEffect")
    if (isAuthenticated) {
      const activeAccount = accounts[0]; 
      instance.acquireTokenSilent({
        account: activeAccount,
        scopes: ["openid", "profile", "User.Read"], 
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

  const loginContextValue = {
    isAuthenticated,
    setIsAuthenticated,
    userName,
    userEmail,
  };

  return (
    <AuthContext.Provider value={loginContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function AuthenticatedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}