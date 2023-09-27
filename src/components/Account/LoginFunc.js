//AUTH
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authentication/authConfig";

export function useMicrosoftSignIn() {
    const { instance } = useMsal(); 
    async function MicrosoftSignIn() {
        try {
            const response = await instance.loginPopup(loginRequest);
            console.log("Login response:", response);
        } catch (e) {
            console.error("Login error:", e);
        }
    }

    return MicrosoftSignIn;
}
