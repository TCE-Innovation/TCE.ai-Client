import React, { useState, useEffect, createContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { getUserProfilePic } from '../data/Graph';
import { getApplications, getTools, getJobTitle, getProjects } from '../data/SQL';
import { isMobile, isTablet } from 'react-device-detect'; // Import isMobile and isTablet from react-device-detect

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { accounts, instance } = useMsal();
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [userTitle, setUserTitle] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [userApplications, setUserApplications] = useState(null);
  const [userTools, setUserTools] = useState(null);
  const [deviceType, setDeviceType] = useState('desktop'); // Default to desktop
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Detect device type on component mount
  useEffect(() => {
    if (isMobile) { setDeviceType('mobile'); }
    else if (isTablet) { setDeviceType('tablet'); }
    else { setDeviceType('desktop'); }
  }, []);

  // Get user account
  useEffect(() => {
    const getAccount = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching user details:', error);
      };
    }
    getAccount();
  }, [accounts, instance]);

  const fetchAndSetUserDetails = async (accessToken, name, email) => {
    email = email.toLowerCase();
    setUserName(name);
    setUserEmail(email);
    setAccessToken(accessToken);

    try {
      await Promise.all([
        getUserProfilePic(accessToken).then(setUserPic),
        getJobTitle(email).then(setUserTitle),
        getProjects(email).then(setUserProjects),
        getApplications(email).then(setUserApplications),
        getTools(email).then(setUserTools)
      ]);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginContextValue = {
    userName,
    userEmail,
    userPic,
    userTitle,
    userProjects,
    userApplications,
    userTools,
    deviceType,
    accessToken,
    loading
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
