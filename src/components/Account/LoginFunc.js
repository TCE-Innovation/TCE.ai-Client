// LoginFunc.js
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authentication/authConfig"; 
import { useNavigate } from 'react-router-dom';
import { updateUserLog } from '../../API Calls/Airtable';

export function useMicrosoftSignIn() {
  const { instance } = useMsal(); 
  const navigate = useNavigate();

  async function MicrosoftSignIn() {
    try {
      const response = await instance.loginPopup(loginRequest);
      if (response) {
        const currentAccounts = instance.getAllAccounts();
        if (currentAccounts.length > 0) {
          const postLoginRedirect = localStorage.getItem('postLoginRedirect') || '/private/welcome';
          navigate(postLoginRedirect);
          localStorage.removeItem('postLoginRedirect'); // Clear the stored URL after redirecting
          await updateUserLog(currentAccounts[0].name);
        }
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  }
  return MicrosoftSignIn;
}
