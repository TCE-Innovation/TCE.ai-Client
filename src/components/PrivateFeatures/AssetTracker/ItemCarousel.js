import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import MatterPortPro2Image from '../../../img/AssetImages/Pro2.png';
import MatterPortPro3Image from '../../../img/AssetImages/Pro3.png';
import FerretPlusImage from '../../../img/AssetImages/Ferret.png';
import RicohThetaZ1Image from '../../../img/AssetImages/Ricoh.png';
import Insta360Image from '../../../img/AssetImages/Insta360.png';

const ItemCarousel = () => {
    const [cardData, setCardData] = useState([
        {
            image: MatterPortPro2Image,
            title: 'MatterPort Pro2',
            description: 'A stationary, 3D capture solution for recording tours of job sites and internal rooms. Common uses include high-quality photography for remote inspections and documenting milestones, removing the need for being on-site 24/7. Recommended for projects with mostly indoor scans. All active projects have utilized the Matterport Pro 2 for visualizing milestones.',
            showDescription: false,
        },
        {
            image: MatterPortPro3Image,
            title: 'MatterPort Pro3',
            description: 'Same usage as the Matterport Pro 2. Improvements include higher detail, longer range, and better outdoor usage. Recommended for projects with mostly outdoor scans. All active projects have utilized the Matterport Pro 3 for visualizing milestones. ',
            showDescription: false,
        },
        {
            image: FerretPlusImage,
            title: 'Ferret Plus',
            description: 'A camera best used for inspections, maintenance, and repair work in extremely tight spaces. Attached to a pull rope for recording the inside of conduit, metal ducts, pipes, etc. Most recently used on the Woodside Project.',
            showDescription: false,
        },
        {
            image: RicohThetaZ1Image,
            title: 'Ricoh Theta Z1',
            description: 'Attachable to a hard hat, this 3D camera allows field engineers to walk around a job site while automatically capturing the surroundings. Used primarily for long walking paths taken during an inspection of a job site, without the need for high detail imagery, but instead for an overview of progress. Actively used on: 207th Mainline, 207th Yard, 8 Stations, 8th Ave, Crosstown CBTC, Package 4, Rockaways, and Woodside',
            showDescription: false,
        },
        {
            image: Insta360Image,
            title: 'Insta360 OneX2',
            description: 'Same as the Ricoh Theta Z1, this 3D camera is placed on a hardhat to allow field engineers to walk around a job site while automatically capturing the surroundings. Compared to the Ricoh Theta Z1, this 3D camera has a removable back to allow for hot swapping batteries while on the job if it were to die. With slightly worse camera quality, the battery can last around ~1:30 hours and can still be swapped out. Best used for longer tours with a need for an overview of the surroundings. Actively used on: 207th Mainline, 207th Yard, 8 Stations, 8th Ave, Crosstown CBTC, Package 4, Rockaways, and Woodside',
            showDescription: false,
        },
    ]);

    const toggleDescription = (index) => {
        const updatedCardData = [...cardData];
        updatedCardData[index].showDescription = !updatedCardData[index].showDescription;
        setCardData(updatedCardData);
    };

    const styles = {
        carouselContainer: {
            marginTop: 30,
            marginBottom: 40,
            width: 1400,
            maxHeight: 900,
            margin: 'auto',
        },
        carouselCard: {
            width: 500, // Set a fixed width for the card
            height: 400, 
            textAlign: 'center',
            margin: 'auto',
            marginBottom: 50,
            display: 'flex',
            flexDirection: 'column',
            //border: '1px solid #ccc', used to test card size and shape
        },
        cardImage: {
            width: '70%', // Adjust the width as needed
            height: 'auto',
            objectFit: 'cover',
            alignSelf: 'center', // Center the image vertically
            cursor: 'pointer',
        },
        cardContent: {
            padding: '10px', // Add padding to the card content
            flex: 1,
            textAlign: 'center', // Center the text horizontally
        },
        titleContainer: {
            position: 'absolute',
            bottom: '10px', // Adjust the distance from the bottom
            left: 0,
            right: 0,
            marginBottom: '15px',
        },
        clickableCard: {
            cursor: 'pointer',
        },
        descriptionPopup: {
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: '999',
        },
    };

    return (
        <div style={styles.carouselContainer}>
            <Carousel showArrows={true} showThumbs={false} autoPlay infiniteLoop centerMode dynamicHeight={false} centerSlidePercentage={40}>
                {cardData.map((card, index) => (
                    <div key={index} style={styles.carouselCard}>
                        <div
                            onClick={() => toggleDescription(index)}  // Changed from onClick to onMouseEnter
                            style={{ ...styles.clickableCard, cursor: 'pointer' }}
                        >
                            <img
                                src={card.image}
                                alt={card.title}
                                style={styles.cardImage}
                            />
                            <div style={styles.cardContent}>
                                <div style={styles.titleContainer}>
                                    <h4 style={styles.cardTitle}>{card.title}</h4>
                                </div>
                            </div>
                        </div>
                        {card.showDescription && (
                            <div className="description-popup" style={styles.descriptionPopup}>
                                <p>{card.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </Carousel>
            <p  style={{textAlign: 'center'}}>Click an image above to learn more</p>
        </div>
    );
};

export default ItemCarousel
