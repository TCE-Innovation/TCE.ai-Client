//REACT
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//IMAGES
import ProCore from "../../img/PartnerImages/ProCore.jpg";
import Airtable from "../../img/PartnerImages/Airtable.png";
import FieldWire from "../../img/PartnerImages/FieldWire.jpg";
import Bridgit from "../../img/PartnerImages/Bridgit.jpg";
import OpenSpace from "../../img/PartnerImages/OpenSpace.jpg";
import EZ from "../../img/PartnerImages/EZ.jpg";

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
            image: ProCore,
            title: 'ProCore',
        },
        {
            image: Airtable,
            title: 'Airtable',
        },
        {
            image: FieldWire,
            title: 'FieldWire',
        },
        {
            image: Bridgit,
            title: 'Bridgit',
        },
        {
            image: OpenSpace,
            title: 'OpenSpace',
        },
        {
            image: EZ,
            title: 'EZOfficeInventory',
        },
    ];

    const styles = {
        carouselContainer: {
            width: '100%',
            height: 200,
            //border: '1px solid red',
            padding: '10px',
            paddingTop: '60px',
        },
        carouselCard: {
            width: 350, 
            height: '100%', 
            display: 'flex',
            //border: '1px solid blue'
        }
    };

    return (
      <div className='container'>
        <div className="header">TECH PARTNERS</div>
          <div style={styles.carouselContainer}>
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
                      <div 
                          key={index} 
                          style={styles.carouselCard} 
                      >
                          <img src={card.image} alt={card.title}/>    
                      </div>
                  ))}
              </Carousel>
          </div>
      </div>
    );
};

export default ItemCarousel
