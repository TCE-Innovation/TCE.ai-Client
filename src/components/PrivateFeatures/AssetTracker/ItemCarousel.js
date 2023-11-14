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

//CUSTOM ARROWS
const renderArrowPrev = (onClickHandler, hasPrev, label) => {
    return (
        <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={{
                ...arrowStyles,
                left: 0,
            }}
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
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
};


const ItemCarousel = () => {
    const cardData = [
        {
            image: MatterPortPro2Image,
            title: 'MatterPort Pro2',
            description: 'A stationary, 3D capture solution for recording tours of job sites and internal rooms. Common uses include high-quality photography for remote inspections and documenting milestones, removing the need for being on-site 24/7. Recommended for projects with mostly indoor scans.',
            showDescription: false,
        },
        {
            image: MatterPortPro3Image,
            title: 'MatterPort Pro3',
            description: 'Same usage as the Matterport Pro 2. Improvements include higher detail, longer range, and better outdoor usage. Recommended for projects with mostly outdoor scans.',
            showDescription: false,
        },
        {
            image: FerretPlusImage,
            title: 'Ferret Plus',
            description: 'A camera best used for inspections, maintenance, and repair work in extremely tight spaces. Can be attached to a pull rope for recording the inside of conduit, metal ducts, pipes, etc.',
            showDescription: false,
        },
        {
            image: RicohThetaZ1Image,
            title: 'Ricoh Theta Z1',
            description: 'An alternative to the Insta 360 One X2, the Ricoh Theta Z1 is also used for OpenSpace but has better camera quality at the expense of lower battery life. Best used for shorter tours due to battery life in indoor, low-light applications.',
            showDescription: false,
        },
        {
            image: Insta360Image,
            title: 'Insta360 OneX2',
            description: 'Attachable to a hard hat, the Insta 360 One X2 is the go-to camera for capturing field sites on OpenSpace. Can be used for long sessions of image capturing due to its ~1:30 hour battery life and hot-swappable battery.',
            showDescription: false,
        },
        {
            image: BushmanImage,
            title: 'Bushman Halo 360 Light',
            description: 'A portable light attached to a selfie stick, primarily for use with either the Ricoh Theta Z1 or Insta 360 One X2 for low light areas. Low visibility areas such as under a platform edge can now be easily seen with the combination of the light and one of our cameras.',
            showDescription: false,
        },
    ];

    //DESCRIPTION POPUP HOVER
    const [hoverIndex, setHoverIndex] = useState(null);  
    const handleMouseEnter = (index) => {
        setHoverIndex(index);
    };
    const handleMouseLeave = () => {
        setHoverIndex(null);
    };

    const styles = {
        carouselContainer: {
            marginTop: 40,
            marginBottom: 40,
            width: '100%',
            height: "1000%",
            margin: 'auto',
            //border: '1px solid green'
        },
        carouselCard: {
            width: '40%', 
            height: '100%', 
            margin: 'auto',
            marginBottom: 50,
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            padding: '25px',
            //border: '1px solid blue'
        },
        cardImage: {
            width: '100%', 
            height: '90%',  
            //border: '1px solid green'
        },
        titleContainer: {
            position: 'absolute',
            left: 0,
            right: 0,
            marginTop: '250px',
            //border: '1px solid #ccc'
        },
        cardTitle: {
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'black',
        },
        descriptionPopup: {
            visibility: 'hidden',
            position: 'absolute',
            background: 'rgba(255, 255, 255, 0.9',
            padding: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            zIndex: '999',
            fontSize: '14px',
        },
        descriptionPopupVisible: { 
            visibility: 'visible',
        },
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
                    <div 
                        key={index} 
                        style={styles.carouselCard} 
                        onMouseEnter={() => handleMouseEnter(index)} 
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={card.image} alt={card.title} style={styles.cardImage}/>    
                        <div style={styles.titleContainer}>
                            <h4 style={styles.cardTitle}>{card.title}</h4>
                        </div>
                        <div className="description-popup" 
                            style={
                                hoverIndex === index 
                                ? {...styles.descriptionPopup, ...styles.descriptionPopupVisible} 
                                : styles.descriptionPopup
                            }
                        >
                            <p>{card.description}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ItemCarousel
