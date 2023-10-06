//REACT
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//IMAGES
import MatterPortPro2Image from '../../../img/AssetImages/Pro2.png';
import MatterPortPro3Image from '../../../img/AssetImages/Pro3.png';
import FerretPlusImage from '../../../img/AssetImages/Ferret.png';
import RicohThetaZ1Image from '../../../img/AssetImages/Ricoh.png';
import Insta360Image from '../../../img/AssetImages/Insta360.png';
import BushmanImage from '../../../img/AssetImages/Bushman.png';

//ICONS
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const renderArrowPrev = (onClickHandler, hasPrev, label) => {
    return (
        <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
                ...arrowStyles,
                left: 0,
            }} // Change this to suit your needs
        >
            <ArrowBackIosNewIcon />
        </button>
    );
};

const renderArrowNext = (onClickHandler, hasNext, label) => {
    return (
        <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
                ...arrowStyles,
                right: 0,
            }}
        >
            <ArrowForwardIosIcon />
        </button>
    );
};

const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    cursor: 'pointer',
    backgroundColor: 'white',
    border: 'none',
    outline: 'none',
};

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
        {
            image: BushmanImage,
            title: 'Bushman Halo 360 Light',
            description: 'A portable light attached to a selfie stick, primarily for use with either the Ricoh Theta Z1 or Insta 360 One X2 for low light areas. Low visibility areas such as under a platform edge can now be easily seen with the combination of the light and one of our cameras.',
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
            marginTop: 40,
            width: 1500,
            height: 400,
            margin: 'auto',
            //border: '1px solid red'
        },
        carouselCard: {
            width: 250, 
            height: 250, 
            margin: 'auto',
            marginBottom: 50,
            display: 'flex',
            flexDirection: 'column',
            padding: '25px',
            //border: '1px solid blue'
        },
        cardImage: {
            width: '100%', 
            height: '100%',  
            //border: '1px solid green'
        },
        titleContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            marginTop: '220px',
            //border: '1px solid #ccc'
        },
        cardTitle: {
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'black',
        },
        descriptionPopup: {
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: '999',
        }
    };

    return (
        <div style={styles.carouselContainer}>
              <div style={{ paddingBottom: '20px' }}></div>
            <Carousel 
                renderArrowPrev={renderArrowPrev}
                renderArrowNext={renderArrowNext}
                showArrows={true} 
                showThumbs={false} 
                autoPlay 
                infiniteLoop 
                centerMode 
                dynamicHeight={false} 
                centerSlidePercentage={40}
                showIndicators={false}

    
            >
                {cardData.map((card, index) => (

                    <div key={index} style={styles.carouselCard} onClick={() => toggleDescription(index)}>

                        <img src={card.image} alt={card.title} style={styles.cardImage}/>    

                        <div style={styles.titleContainer}>
                            <h4 style={styles.cardTitle}>{card.title}</h4>
                        </div>

                        {card.showDescription && (
                            <div className="description-popup" style={styles.descriptionPopup}>
                                <p>{card.description}</p>
                            </div>
                        )}

                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ItemCarousel
