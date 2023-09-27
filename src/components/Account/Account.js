//REACT
import React, { useContext } from 'react';

//MUI
import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

//COMPONENTS
import Copyright from '../General/Copyright';
import { LogOutButton } from "./LogOut/LogOutButton";

//AUTH
import { AuthContext } from "../../authentication/Auth";

//const noUser = require('../img/noUser.webp')

//const defaultData = {};

/*function ProfileImage(props) {
    let src;
    if (props['profileImage'] === null) {
        src = noUser
    } else {
        src = props['profileImage']
    }

    return (
        <Box
            component="img"
            sx={{
                // height: 233,
                // width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
            alt="user avatar"
            src={src}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = noUser;
            }}
        />
    )
}*/

function AccountCard() {
    const { userName, userEmail } = useContext(AuthContext);

    return (
        <React.Fragment>
            <CardContent>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                >
                    <div>
                        <br />
                        <h2>Welcome back, {userName}!</h2>
                        <br />
                        
                        <Box textAlign="center">
                            <h4>{userEmail}</h4>
                            <br />
                            <br />
                            <LogOutButton />
                        </Box>
                    </div>
                </Grid>
            </CardContent>
        </React.Fragment>
    )
}

function Account() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh', }}
        >
            <Box sx={{ minWidth: 275, margin: "30px" }}>
                <Card className="m-5 p-5" variant="outlined">
                    <AccountCard />
                </Card>
            </Box>
            <Copyright sx={{ mt: 70, mb: 4 }} />
        </Grid>
    );
}

export default Account;
