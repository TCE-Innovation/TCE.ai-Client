import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './pubCarousel.module.css';
import DownloadIcon from '@mui/icons-material/Download';
import axios from 'axios';

export default function PubCarousel() {

    const settings = {
        dots: true, 
        infinite: true,
        vertical: true,
        verticalSwiping: true, 
        speed: 500,
        slidesToShow: 2, 
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false, 

    };

    const data = [
        {
            title: 'PRDC Ripper',
            content: "This White Paper introduces the PRDC Ripper, an innovative software solution developed by the TCE Innovation Group to automate the extraction, classification, and presentation of Project Requirements and Design Criteria documents associated with Design-Build project pursuits.",
            link: 'prdc-ripper',
            blobName: 'PRDC Ripper White Paper R3.pdf'
        },
        {
            title: 'Airtable',
            content: "The purpose of this document is to highlight issues with the current project portfolio management and resource planning process and to offer a solution for TCE's leadership.",
            link: 'airtable',
            blobName: 'AirTable White Paper.pdf'
        },
        {
            title: 'OpenSpace',
            content: "The purpose of this document is to introduce OpenSpace, a 360° construction photo documentation software that uses a cloud-based AI to stitch 3D images captured on off-the-shelf cameras to create interactive, highly detailed jobsite documentation to allow project teams to collaborate, resolve problems, and track progress.",
            link: 'openspace',
            blobName: 'OpenSpace White Paper .pdf'

        }
    ];

    return (
        <div className={styles.carouselContainer}>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index}>
                        <CarouselCard item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    ); 
}

function CarouselCard({ item }) {

    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                <div className={styles.cardTitleBox}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>

                <div className={styles.cardContent}>{item.content}</div>

                <div className={styles.buttonsContainer}>
                    <ReadMoreButton item={item} />
                    <DownloadButton item={item} />    
                </div>
            </div>
        </div>
    );
}

function ReadMoreButton({ item }) {
    const handleReadMoreClick = (documentName) => {
        window.open(`/document?file=${documentName}`, '_blank');
    };

    return (
        <div className={styles.readMoreButton} onClick={() => handleReadMoreClick(item.link)}>Read More</div>
    );
}

function DownloadButton({ item }) {
    const handleDownloadClick = async () => {
        try {
            // Fetch the file data as a Blob
            const response = await axios.post(`https://tce-ai-api.azurewebsites.net/api/download-doc?blobName=${encodeURIComponent(item.blobName)}`, {
                responseType: 'blob', // Important to receive the data as a Blob
            });

            // Create a URL for the Blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a temporary link to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', item.blobName); // Set the file name for the download
            document.body.appendChild(link);

            link.click(); // Programmatically click the link to trigger the download

            // Clean up by revoking the Blob URL and removing the temporary link
            window.URL.revokeObjectURL(url);
            link.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
            // Handle the error (e.g., display a notification)
        }
    };

    return (
        <DownloadIcon className={styles.downloadButton} onClick={handleDownloadClick}/>
    );
}


