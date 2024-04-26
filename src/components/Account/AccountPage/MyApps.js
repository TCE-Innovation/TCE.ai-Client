import React, { useContext, useState } from 'react';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// CONTEXT
import { AuthContext } from "../../../authentication/Auth";

// IMAGES
const Procore = require('../../../img/PartnerImages/ProCore.png');
const Airtable = require('../../../img/PartnerImages/Airtable.png');
const ezOffice = require('../../../img/PartnerImages/EZ.png');
const OpenSpace = require('../../../img/PartnerImages/OpenSpace.png');
const BambooHR = require('../../../img/PartnerImages/BambooHR.png');

function MyApps() {
    const { userApplications } = useContext(AuthContext);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Full list of applications excluding BambooHR (assuming everyone has it)
    const allApplications = ['Procore', 'AirTable', 'EzOffice', 'OpenSpace'];

    // Append BambooHR as it is included for everyone
    const userAppsArray = userApplications.split(', ').concat('BambooHR');

    // Filter applications that the user does not have
    const availableApplications = allApplications.filter(app => !userAppsArray.includes(app));

    // Map names to corresponding image and URLs
    const imageMap = {
        'Procore': { image: Procore, url: 'https://login.procore.com/' },
        'AirTable': { image: Airtable, url: 'https://www.airtable.com' },
        'EzOffice': { image: ezOffice, url: 'https://tcelectric.ezofficeinventory.com/dashboard' },
        'OpenSpace': { image: OpenSpace, url: 'https://www.openspace.ai/orgs' },
        'BambooHR': { image: BambooHR, url: 'https://iovino.bamboohr.com/home' }
    };

    const applicationArray = ['BambooHR', ...allApplications].map((app, index) => ({
        id: `app-${index}`,
        name: app,
        image: imageMap[app].image,
        url: imageMap[app].url
    }));

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

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
                <Button
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 16,
                        color: '#1b365f',
                        backgroundColor: 'white',
                        boxShadow: 'none',
                        '&:hover': {
                            color: '#142850',
                            backgroundColor: 'white',
                            boxShadow: 'none',
                        }
                    }}
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleDialogOpen}
                >
                    Request Application
                </Button>
            </Grid>
            <Dialog onClose={handleDialogClose} open={dialogOpen} maxWidth="sm" fullWidth>
                <DialogTitle>Request Access to Applications</DialogTitle>
                <DialogContent>
                    {availableApplications.length > 0 ? (
                        <List>
                            {availableApplications.map((app, index) => (
                                <ListItem button key={index} onClick={handleDialogClose}>
                                    <ListItemText primary={app} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <div>You already have access to all applications.</div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default MyApps;
