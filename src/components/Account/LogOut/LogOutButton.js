import React from 'react';
import { useMicrosoftSignOut } from "./LogOutFunc"; 

// MUI
import Button from "@mui/material/Button";

function LogOutButton() {
    const MicrosoftSignOut = useMicrosoftSignOut(); 

    return (
        <Button variant="outlined" onClick={MicrosoftSignOut}>
            Log Out
        </Button>
    )
}

export { LogOutButton };
