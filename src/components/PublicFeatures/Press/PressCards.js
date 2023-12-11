import React from "react";
import { Card } from 'flowbite-react';
import styles from "./pressCards.module.css";


const PressCards = () => {
  return (
    <div className={styles.mainContainer}>

        <a href="https://www.openspace.ai/resources/webinars/fireside-chat-how-tces-transit-projects-arrive-on-time-with-openspace/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <Card className={styles.cardContainer}>
                <h5 className={styles.cardTitle}>
                    Fireside Chat: How TCE's Transit Projects Arrive On Time with OpenSpace
                </h5>
                <p className={styles.cardText}>
                    In this recorded fireside chat, you'll hear OpenSpace's Josh Berger and Colin Sucher in conversation with Jacob Shavel.
                </p>
            </Card>
        </a>

        <a href="https://gobridgit.com/case-studies/tc-electric/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <Card className={styles.cardContainer}>
                <h5 className={styles.cardTitle}>
                    Using Bridgit Bench to Forecast Accurately and Plan with Confidence
                </h5>
                <p className={styles.cardText}>
                    How Bridgit Bench gives TCE confidence in their labor allocations and integrates with the rest of their software stack.
                </p>
            </Card>
        </a>
        <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
            <Card className={styles.cardContainer}>
                <h5 className={styles.cardTitle}>
                    Innovation Group White Papers: The Future of Construction Technology
                </h5>
                <p className={styles.cardText}>
                    A collection of innovative solutions that make up the technology ecosystem of TCE.
                </p>
            </Card>
        </a>

    </div>
  );
};

export default PressCards;