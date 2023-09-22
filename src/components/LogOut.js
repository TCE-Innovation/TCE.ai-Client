import React from 'react';
import '../App.css'
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useMsal } from "@azure/msal-react";

function LogOutButton() {
    const { instance } = useMsal();

    async function MicrosoftSignOut() {
        instance.logoutPopup({
            postLogoutRedirectUri: "/",
            mainWindowRedirectUri: "/"
        });
    }

    return (
        <Button variant="outlined" onClick={MicrosoftSignOut}>
            Sign Out
        </Button>
    )
}

const LogOut = () => {
    return <Navigate to='/login' />
}

export { LogOutButton };
export default LogOut;
