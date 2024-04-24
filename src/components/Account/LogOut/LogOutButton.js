import React from 'react';
import { useMicrosoftSignOut } from "./LogOutFunc"; 

// MUI
import Button from "@mui/material/Button";

function LogOutButton() {
    const MicrosoftSignOut = useMicrosoftSignOut(); 

    return (
        <Button variant="outlined" onClick={MicrosoftSignOut}
        sx={{
            backgroundColor: '#1b365f', 
            color: 'white',
            '&:hover': {
                color: '#1b365f',
                borderColor: '#1b365f',
            },
        }}>
            Log Out
        </Button>
    )
}

export { LogOutButton };
