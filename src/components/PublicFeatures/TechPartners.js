import "./style.css";

//REACT
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//IMAGES
import ProCore from "../../img/PartnerImages/ProCore.png";
import Airtable from "../../img/PartnerImages/Airtable.png";
import FieldWire from "../../img/PartnerImages/FieldWire.png";
import Bridgit from "../../img/PartnerImages/Bridgit.png";
import OpenSpace from "../../img/PartnerImages/OpenSpace.png";
import EZ from "../../img/PartnerImages/EZ.png";
import Matterport from "../../img/PartnerImages/Matterport.png";
import Oracle from "../../img/PartnerImages/Oracle.png";

const ItemCarousel = () => {
    const cardData = [
        {
            image: ProCore,
            title: 'ProCore',
        },
        {
            image: Bridgit,
            title: 'Bridgit',
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
            image: FieldWire,
            title: 'FieldWire',

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
        <div className='container'>
            <div className="header">Tech Partners</div>
            <div className = 'carousel-container'>
                <Carousel 
                    showThumbs={false} 
                    autoPlay
                    infiniteLoop 
                    centerMode 
                    dynamicHeight={false} 
                    centerSlidePercentage={30}
                    showIndicators={false}
                >
                    {cardData.map((card, index) => (

                        <div key={index} className="carousel-card">
                            {card.link ? (
                                <a href={card.link} target="_blank" rel="noopener noreferrer">
                                    <img src={card.image} alt={card.title} className="clickable"/>
                                </a>
                            ) : (
                                <img src={card.image} alt={card.title}/>
                            )}
                        </div>

                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default ItemCarousel;






