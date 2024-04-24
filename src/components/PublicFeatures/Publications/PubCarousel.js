import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './pubCarousel.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

// Predefined data for carousel items
const initialData = [
    {
        title: 'PRDC Ripper White Paper',
        content: "This White Paper introduces the PRDC Ripper, an innovative software solution developed by the TCE Innovation Group to automate the extraction, classification, and presentation of Project Requirements and Design Criteria documents associated with Design-Build project pursuits.",
        link: 'prdc-ripper',
        blobName: 'PRDC Ripper White Paper R3.pdf'
    },
    {
        title: 'Airtable White Paper',
        content: "The purpose of this document is to highlight issues with the current project portfolio management and resource planning process and to offer a solution for TCE's leadership.",
        link: 'airtable',
        blobName: 'AirTable White Paper.pdf'
    },
    {
        title: 'OpenSpace White Paper',
        content: "The purpose of this document is to introduce OpenSpace, a 360° construction photo documentation software that uses a cloud-based AI to stitch 3D images captured on off-the-shelf cameras to create interactive, highly detailed jobsite documentation to allow project teams to collaborate, resolve problems, and track progress.",
        link: 'openspace',
        blobName: 'OpenSpace White Paper.pdf'
    }
];

export default function PubCarousel() {
    const [documents, setDocuments] = useState(initialData);

    useEffect(() => {
        const fetchSasUrls = async () => {
            const updatedDocuments = await Promise.all(initialData.map(async (item) => {
                try {
                    const response = await axios.post(`https://tce-ai-api.azurewebsites.net/api/download-doc?blobName=${item.blobName}`);
                    return { ...item, sasUrl: response.data.sasUrl };
                } catch (error) {
                    console.error('Error fetching SAS URL:', error);
                    return { ...item, sasUrl: null };
                }
            }));
            setDocuments(updatedDocuments);
        };

        fetchSasUrls();
    }, []);

    let slider = null;
    const setSliderRef = sliderInstance => {
        slider = sliderInstance;
    };

    const settings = {
        dots: false, 
        infinite: true,
        vertical: true,
        verticalSwiping: true, 
        speed: 500,
        slidesToShow: 2, 
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        arrows: false
    };

    return (
        <div className={styles.carouselContainer}>
            <div className={styles.topNav} onClick={() => slider?.slickPrev()}><KeyboardArrowUpIcon/></div>
            <Slider ref={setSliderRef} {...settings}>
                {documents.map((item, index) => (
                    <div key={index} className={styles.slide}>
                        <CarouselCard item={item} />
                    </div>
                ))}
            </Slider>
            <div className={styles.bottomNav} onClick={() => slider?.slickNext()}><KeyboardArrowDownIcon/></div>
        </div>
    );
}

function CarouselCard({ item }) {
    return (
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", width: "100%"}}>
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.cardTitleBox}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
                <div className={styles.cardContent}>{item.content}</div>
                <div className={styles.buttonsContainer}>
                    <ReadMoreButton link={item.link} />
                    <DownloadButton sasUrl={item.sasUrl} blobName={item.blobName} />
                </div>
            </div>
        </div>
        </div>
    );
}

function ReadMoreButton({ link }) {
    return (
        <button className={styles.readMoreButton} onClick={() => window.open(`/document?file=${link}`, '_blank')}>
            Read More
        </button>
    );
}

function DownloadButton({ sasUrl, blobName }) {
    const handleDownloadClick = async () => {
        if (!sasUrl) {
            console.error('SAS URL not available');
            return;
        }

        try {
            const response = await fetch(sasUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            const blobData = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blobData);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', blobName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl); 
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <Tooltip title="Click to download">
            <DownloadIcon className={styles.downloadButton} onClick={handleDownloadClick} />
        </Tooltip>
    );
}
