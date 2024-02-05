import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function PubCarousel() {
    const settings = {
        dots: true, // Enable dots for navigation
        infinite: true,
        vertical: true, // Enable vertical mode
        verticalSwiping: true, // Enable swiping in vertical mode
        speed: 500,
        slidesToShow: 2, // Show one slide at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const data = [
        {
            title: 'PRDC Ripper',
            content: "This White Paper introduces the PRDC Ripper, an innovative software solution developed by the TCE Innovation Group (TCIG) to automate the extraction, classification, and presentation of Project Requirements and Design Criteria (PRDC) documents associated with Design-Build (DB) project pursuits. By providing insight into the tool's background, features, and benefits, this paper highlights the tool's functionality and utility to the TCE estimating team related to DB pursuits.",
            link: 'prdc-ripper'
        },
        {
            title: 'Airtable',
            content: "The purpose of this document is to highlight issues with the current project portfolio management (PPM) and resource planning (RP) process and to offer a solution for TC's leadership. The proposed solution, AirTable, will help TC leaders unlock value through transparency, real-time editing and sharing, leading to smarter allocation and scheduling capability. After framing the problem and providing background, later sections will go into detail about the new solution, including some screenshots of the platform and an explanation of the data structures used. Finally, this document ends with a look to the future, how the solution can grow with our organization to address future challenges.",
            link: 'airtable'
        },
        {
            title: 'OpenSpace',
            content: "The purpose of this document is to introduce OpenSpace, a 360° construction photo documentation software that uses a cloud-based AI to stitch 3D images captured on off-the-shelf cameras to create interactive, highly detailed jobsite documentation to allow project teams to collaborate, resolve problems, and track progress. OpenSpace allows project teams to share information that previously could only be visualized and understood by traveling to the jobsite. For TCE project teams working on geographically dispersed projects, OpenSpace represents an opportunity to enhance visibility and empower teamwork without the hassle of travel. Besides introducing OpenSpace, this document will outline key use cases identified by TCIG.",
            link: 'openspace'
        },
    ];



    return (
        <div style={{ width: '70%', margin: 'auto' }}>
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index} >
                        <CarouselCard item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    ); 
}


function CarouselCard({item}) {
    const handleReadMoreClick = (documentName) => {
        window.open(`/document?file=${documentName}`, '_blank');
    };

    return (
        <div style={{border: "1px solid white", borderRadius: "1vw", backgroundColor: "white", height: "15vw"}}>
            <div style={{
                height: "3vw", 
                width: "100%", 
                backgroundColor: "#999999", 
                color: "white", 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                borderRadius: "1vw",
            }}>
                <h3 style={{color:"black"}}>{item.title}</h3>
            </div>
            <p style={{color:"black"}}>{item.content}</p>
            <button onClick={() => handleReadMoreClick(item.link)}>Read More</button>
        </div>
    )
}