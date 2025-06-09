import React from 'react';
import styles from "./pressCards.module.css";

// import Bridgit from '../../../img/Public/bridgit.webp'
import Openspace from '../../../img/Public/Openspace.jpg'

const cardData = [
    {
        href: "https://www.openspace.ai/resources/webinars/fireside-chat-how-tces-transit-projects-arrive-on-time-with-openspace/",
        image: Openspace,
        alt: "Openspace",
        title: "Fireside Chat: How TCE's Transit Projects Arrive On Time with OpenSpace",
        description: "In this recorded fireside chat, you'll hear OpenSpace's Josh Berger and Colin Sucher in conversation with Jacob Shavel.",
    },
    // {
    //     href: "https://gobridgit.com/case-studies/tc-electric/",
    //     image: Bridgit,
    //     alt: "Bridgit",
    //     title: "Using Bridgit Bench to Forecast Accurately and Plan with Confidence",
    //     description: "How Bridgit Bench gives TCE confidence in their labor allocations and integrates with the rest of their software stack.",
    // }
];

const PressCards = () => {
    return (
        <div className={styles.mainContainer}>
            {cardData.map((card, index) => (
                <a href={card.href} target="_blank" rel="noopener noreferrer" className={styles.cardLink} style={index === 0 ? { marginRight: "2vw" } : {}} key={index}>
                    <div className={styles.cardContainer}>                        
                        <img src={card.image} alt={card.alt} className={styles.cardImage} />
                        <div className={styles.textContainer}>
                            <div variant="h5" component="div" className={styles.cardTitle}>
                                {card.title}
                            </div>
                            <div variant="body2" color="text.secondary" className={styles.cardText}>
                                {card.description}
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default PressCards;
