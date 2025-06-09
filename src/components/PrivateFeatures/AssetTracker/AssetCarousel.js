import styles from './assetCarousel.module.css';

//REACT
import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//ICONS
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

//IMAGES
import MatterPortPro2Image from '../../../img/AssetImages/Pro2.png';
import MatterPortPro3Image from '../../../img/AssetImages/Pro3.png';
// import FerretPlusImage from '../../../img/AssetImages/Ferret.png';
// import RicohThetaZ1Image from '../../../img/AssetImages/Ricoh.png';
import Insta360Image from '../../../img/AssetImages/Insta360.png';
import Insta360X4Image from '../../../img/AssetImages/Insta360X4.png';
// import BushmanImage from '../../../img/AssetImages/Bushman.png';

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <ArrowForwardIosIcon style={{ color: 'gray', fontSize: '34px' }} />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <ArrowBackIosNewIcon style={{ color: 'gray', fontSize: '34px' }} />
        </div>
    );
}

const AssetCarousel = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [loadingState, setLoadingState] = useState({});

    const handleImageLoaded = (index) => {
        setLoadingState(prev => ({ ...prev, [index]: true }));
    };


    //settings for the carousel itself
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        draggable: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    //data for each card in the carousel
    const cardData = [
        {
            image: Insta360Image,
            title: 'Insta360 X2',
            description: 'Attachable to a hard hat, the Insta 360 X2 is the go-to camera for capturing field sites on OpenSpace. Can be used for long sessions of image capturing due to its ~1:30 hour battery life and hot-swappable battery.',
            showDescription: false,
        },
        // {
        //     image: FerretPlusImage,
        //     title: 'Ferret Plus',
        //     description: 'A camera best used for inspections, maintenance, and repair work in extremely tight spaces. Can be attached to a pull rope for recording the inside of conduit, metal ducts, pipes, etc.',
        //     showDescription: false,
        // },
        // {
        //     image: RicohThetaZ1Image,
        //     title: 'Ricoh Theta Z1',
        //     description: 'An alternative to the Insta 360 One X2, the Ricoh Theta Z1 is also used for OpenSpace but has better camera quality at the expense of lower battery life. Best used for shorter tours due to battery life in indoor, low-light applications.',
        //     showDescription: false,
        // },
        {
            image: Insta360X4Image,
            title: 'Insta360 X4',
            description: 'An alternative to the Insta 360 X2, the Insta 360 X4 is a heavier camera also used for OpenSpace with better image quality. It is advantageous in low-light areas.',
            showDescription: false,
        },
        {
            image: MatterPortPro2Image,
            title: 'Matterport Pro2',
            description: 'A stationary, 3D capture solution for recording tours of job sites and internal rooms. Common uses include high-quality photography for remote inspections and documenting milestones, removing the need for being on-site 24/7. Recommended for projects with mostly indoor scans.',
            showDescription: false,
        },
        {
            image: MatterPortPro3Image,
            title: 'Matterport Pro3',
            description: 'Same usage as the Matterport Pro2. Improvements include higher detail, longer range, and better outdoor usage. Recommended for projects with mostly outdoor scans.',
            showDescription: false,
        },
        // {
        //     image: BushmanImage,
        //     title: 'Bushman Halo 360 Light',
        //     description: 'A portable light attached to a selfie stick, primarily for use with either the Ricoh Theta Z1 or Insta 360 One X2 for low light areas. Low visibility areas such as under a platform edge can now be easily seen with the combination of the light and one of our cameras.',
        //     showDescription: false,
        // },
    ];

    return (
        <div className={styles.carouselContainer}>
            <Slider {...settings}>
                {cardData.map((card, index) => (
                    <div 
                        key={index} 
                        className={styles.carouselCard}
                        onMouseEnter={() => setHoveredCard(card)}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <div className={styles.imageContainer}>
                            {!loadingState[index] && <div className={styles.spinner}></div>}
                            <img 
                                src={card.image} 
                                alt={card.title} 
                                onLoad={() => handleImageLoaded(index)}
                                style={{ display: loadingState[index] ? 'block' : 'none' }} 
                            />
                        </div>
                        <div className={styles.cardTitle}>{card.title}</div>
                    </div>
                ))}
            </Slider>
            <div className={styles.descriptionContainer}>
                {hoveredCard && (
                    <div className={styles.descriptionText}>
                        {hoveredCard.description}
                    </div>
                )}
            </div>
        </div>
    );
    
};

export default AssetCarousel;