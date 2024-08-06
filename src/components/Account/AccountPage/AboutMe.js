import React, { useContext } from 'react';
import Box from "@mui/material/Box";
import { AuthContext } from "../../../authentication/Auth";
import { LogOutButton } from "../LogOut/LogOutButton";
import noUser from '../../../img/Utils/noUser.webp'; // Importing image directly

function ProfileImage() {
    const { userPic } = useContext(AuthContext);
    return (
        <Box
            component="img"
            sx={{
                maxHeight: 200,
                maxWidth: 200,
                border: 2,
                borderColor: '#1b365f', 
                borderRadius: '50%',
            }}
            alt="user avatar"
            src={userPic ? userPic : noUser}
            onError={({ currentTarget }) => {
                currentTarget.onerror = null; 
                currentTarget.src = noUser;
            }}
        />
    );
}

function AboutMe() {
    const { userName, userEmail, userTitle, userProjects, deviceType } = useContext(AuthContext);

    return (
        <Box textAlign="center" style={{ margin: 'auto', maxWidth: 600 }}>
            <br />
            <h2>Welcome back, {userName}!</h2>
            <br />
            
            <ProfileImage />
            <br />
            <br />
            <h3>{userTitle}</h3>
            <h3>{userProjects}</h3>
            <h4>{userEmail}</h4>
            
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    color: 'grey',
                    fontSize: '12px',
                }}
            >
                {deviceType}
            </Box>
            
            <br />
            <LogOutButton />
        </Box>
    );
}

export default AboutMe;
