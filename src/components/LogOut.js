import React from 'react';
import '../App.css'
import Button from "@mui/material/Button";
import { useMsal } from "@azure/msal-react";

function LogOutButton() {
    console.log("in LogOutButton")
    const { instance } = useMsal();

    async function MicrosoftSignOut() {
        instance.logoutPopup({
            postLogoutRedirectUri: "/login",
            mainWindowRedirectUri: "/login"
        });
    }

    return (
        <Button variant="outlined" onClick={MicrosoftSignOut}>
            Sign Out
        </Button>
    )
}

export { LogOutButton };

