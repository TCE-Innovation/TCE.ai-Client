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
      //initiate the pop up to login
      const response = await instance.loginPopup(loginRequest);

      if (response) {
        //get the account
        const currentAccounts = instance.getAllAccounts();
        //if there is a logged in account (successful login)
        if (currentAccounts.length > 0) {
          //redirect to the cached url or the default url
          const postLoginRedirect = localStorage.getItem('postLoginRedirect') || '/private/welcome';
          navigate(postLoginRedirect);
          //clear the stored URL after redirecting
          localStorage.removeItem('postLoginRedirect'); 
          //update user log
          await updateUserLog(currentAccounts[0].name);
        }
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  }
  return MicrosoftSignIn;
}
