import React, { useContext } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// CONTEXT
import { AuthContext } from "../../../authentication/Auth";

function MyApps() {
    const { userApplications } = useContext(AuthContext);

    // Assuming 'appearing_tables' is a string of application names separated by commas
    const applicationsString = userApplications[0].appearing_tables;
    const applicationArray = applicationsString.split(', ').map((app, index) => ({
        id: `app-${index}`, // Creating a unique id assuming no initial id is available
        name: app.trim()
    }));

    return (
        <div>
            <br />
            <Grid container spacing={2} justifyContent="center" style={{ padding: '20px' }}>
                {applicationArray.map((app) => (
                    <Grid item xs={12} sm={6} md={4} key={app.id}> 
                        <Box
                            sx={{
                                height: '200px', 
                                width: '100%', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                border: '1px solid #1b365f',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: '4px',
                                padding: '10px'
                            }}
                        >
                            <h3>{app.name}</h3>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default MyApps;
