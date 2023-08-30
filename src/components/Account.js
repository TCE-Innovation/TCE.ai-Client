import React, { useContext } from 'react';
import '../App.css'
import { LogOutButton } from "./LogOut";
import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AuthContext } from "../firebase/Auth";
const noUser = require('../img/noUser.webp')

//const defaultData = {};

function ProfileImage(props) {
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
}


function AccountCard() {
    const { currentUser, avatar } = useContext(AuthContext);

    const user = currentUser['_delegate'];
    const { displayName } = user;

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
                        <Box textAlign="center">
                            <ProfileImage profileImage={avatar} />
                        </Box>
                        <br />
                        <h2>Welcome back, {displayName}!</h2>
                        <br />
                        <Box textAlign="center">
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
        </Grid>
    );
}

export default Account;
