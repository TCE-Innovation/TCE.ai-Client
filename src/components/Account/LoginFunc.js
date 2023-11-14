// LoginFunc.js
import { useContext } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authentication/authConfig"; 
import { useNavigate } from 'react-router-dom';
import PrivateContext from "../Private/PrivateContext";

export function useMicrosoftSignIn() {
  const { instance } = useMsal(); 
  const { setPrivateFunctionality } = useContext(PrivateContext);
  const navigate = useNavigate();

  async function MicrosoftSignIn() {
    try {
      const response = await instance.loginPopup(loginRequest);
      if (response) {
        const currentAccounts = instance.getAllAccounts();
        if (currentAccounts.length > 0) {
          navigate('/private');
          setPrivateFunctionality('privateHome');
        }
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  }
  return MicrosoftSignIn;
}
