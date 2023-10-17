// LoginFunc.js
import { useContext } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authentication/authConfig";
import { AuthContext } from "../../authentication/Auth";  
import { useNavigate } from 'react-router-dom';

export function useMicrosoftSignIn() {
  const { instance } = useMsal(); 
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  async function MicrosoftSignIn() {
    try {
      const response = await instance.loginPopup(loginRequest);
      if (response) {
        //user is authenticated, update authContext
        setIsAuthenticated(true); 

        //navigate to private route
        navigate('/private');
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  }
  //test
  return MicrosoftSignIn;
}
