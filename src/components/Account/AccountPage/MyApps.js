import React, { useContext } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// CONTEXT
import { AuthContext } from "../../../authentication/Auth";

// IMAGES
const Procore = require('../../../img/PartnerImages/ProCore.png');
const Airtable = require('../../../img/PartnerImages/Airtable.png');
const ezOffice = require('../../../img/PartnerImages/EZ.png');
const OpenSpace = require('../../../img/PartnerImages/OpenSpace.png');
const BambooHR = require('../../../img/PartnerImages/BambooHR.png');
const CMIC = require('../../../img/PartnerImages/CMIC.png');

function MyApps() {
    const { userApplications } = useContext(AuthContext);

    // User's applications as an array, excluding Bridgit
    const userAppsArray = userApplications.split(', ').filter(app => app !== 'Bridgit').concat('BambooHR');

    // Map names to corresponding image and URLs
    const imageMap = {
        'Procore': { image: Procore, url: 'https://login.procore.com/' },
        'AirTable': { image: Airtable, url: 'https://www.airtable.com' },
        'EzOffice': { image: ezOffice, url: 'https://tcelectric.ezofficeinventory.com/dashboard' },
        'OpenSpace': { image: OpenSpace, url: 'https://www.openspace.ai/orgs' },
        'BambooHR': { image: BambooHR, url: 'https://iovino.bamboohr.com/home' },
        'CMIC': { image: CMIC, url: 'https://enterprise.cmiccloudr12.com/cmicprod/SdMenu/AppSelector.jsp' },
    };

    const applicationArray = userAppsArray.map((app, index) => {
        const appDetails = imageMap[app] || { image: 'path/to/default/image.png', url: '#' }; // Fallback for undefined apps
        return {
            id: `app-${index}`,
            name: app,
            image: appDetails.image,
            url: appDetails.url
        };
    });

    return (
        <div>
            <br />
            <Grid container spacing={2} justifyContent="flex-start" style={{ padding: '20px', position: 'relative' }}>
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
                                padding: '10px',
                                transition: 'box-shadow 0.3s',
                                '&:hover': {
                                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)'
                                }
                            }}
                            component="a"
                            href={app.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={app.image} alt={app.name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default MyApps;
