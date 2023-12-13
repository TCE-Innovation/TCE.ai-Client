import styles from "./techCarousel.module.css";

//REACT
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

//IMAGES
import ProCore from "../../../img/PartnerImages/ProCore.png";
import Airtable from "../../../img/PartnerImages/Airtable.png";
import Bridgit from "../../../img/PartnerImages/Bridgit.png";
import OpenSpace from "../../../img/PartnerImages/OpenSpace.png";
import EZ from "../../../img/PartnerImages/EZ.png";
import Matterport from "../../../img/PartnerImages/Matterport.png";
import Oracle from "../../../img/PartnerImages/Oracle.png";

const TechCarousel = () => {
    const [numSlides, setNumSlides] = useState(getSlidesToShow(window.innerWidth));

    useEffect(() => {
        function handleResize() {
            setNumSlides(getSlidesToShow(window.innerWidth));
        }

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function getSlidesToShow(width) {
        if (width < 600) return 1;
        if (width < 900) return 2;
        if (width < 1200) return 3;
        return 4;
    }
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: numSlides,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        draggable: false,
    };

    const cardData = [
        {
            image: ProCore,
            title: 'ProCore',
        },
        {
            image: Bridgit,
            title: 'Bridgit',
            link: "https://gobridgit.com/case-studies/tc-electric/"
        },
        {
            image: Airtable,
            title: 'Airtable',
        },
        {
            image: Matterport,
            title: 'Matterport',

        },
        {
            image: EZ,
            title: 'EZOfficeInventory',
        },
        {
            image: OpenSpace,
            title: 'OpenSpace',
            link: "https://www.openspace.ai/resources/webinars/fireside-chat-how-tces-transit-projects-arrive-on-time-with-openspace/"
        },
        {
            image: Oracle,
            title: 'Oracle',
        },
    ];

    return (
        <div className={styles.carouselContainer}>          
            <Slider {...settings}>
                {cardData.map((card, index) => (
                    <div key={index} className={styles.carouselCard}>
                        <img src={card.image} alt={card.title} />
                    </div>
                ))}
            </Slider>
            <div className={styles.description}>Energized by construction technology leaders</div>
        </div>
    );
    
};

export default TechCarousel;






