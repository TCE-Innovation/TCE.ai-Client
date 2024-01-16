import React from 'react';
import styles from "./pressCards.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import Bridgit from '../../../img/Public/bridgit.webp'
import Openspace from '../../../img/Public/Openspace.jpg'

const PressCards = () => {
    return (
        <div className={styles.mainContainer}>
            <a href="https://www.openspace.ai/resources/webinars/fireside-chat-how-tces-transit-projects-arrive-on-time-with-openspace/" target="_blank" rel="noopener noreferrer" className={styles.cardLink} style={{marginRight: "2vw"}}>
                <Card sx={{ maxWidth: "18vw", borderRadius: "1vw"}} className={styles.cardContainer}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={Openspace}
                        alt="Openspace"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
                                Fireside Chat: How TCE's Transit Projects Arrive On Time with OpenSpace
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className={styles.cardText}>
                                In this recorded fireside chat, you'll hear OpenSpace's Josh Berger and Colin Sucher in conversation with Jacob Shavel.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>

            <a href="https://gobridgit.com/case-studies/tc-electric/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                <Card sx={{ maxWidth: "18vw", borderRadius: "1vw" }} className={styles.cardContainer}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        height="140"
                        image={Bridgit}
                        alt="Bridgit"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
                                Using Bridgit Bench to Forecast Accurately and Plan with Confidence
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className={styles.cardText}>
                                How Bridgit Bench gives TCE confidence in their labor allocations and integrates with the rest of their software stack.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
        </div>
    );
};

export default PressCards;