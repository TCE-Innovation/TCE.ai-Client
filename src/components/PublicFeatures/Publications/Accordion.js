//REACT
import React, { useState } from 'react';

//MUI
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const accordionSummaryStyle = {
    height: "5vw",
    backgroundColor: "#1e1e1e",
    fontWeight: "bold",
    fontSize: "1.5vw",
    fontFamily: "Roboto",
    color: "white"
};

const accordionStyle = {
    width: "40vw",
};

const accordionDetailsStyle = {
    fontSize: "1vw",
    fontFamily: "Roboto",
}

export default function WPAccordion() {
    const [expanded, setExpanded] = useState(false);

    const handleReadMoreClick = (documentName) => {
        window.open(`/whitepaper?document=${documentName}`, '_blank');
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
        <Accordion 
            expanded={expanded === 'panel1'}
            onChange={handleChange('panel1')}
            sx={accordionStyle}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color:"white"}}/>}
                aria-controls="panel1-content"
                id="prdc-ripper"
                sx={accordionSummaryStyle}>
                PRDC Ripper
            </AccordionSummary>
            <AccordionDetails
                sx={accordionDetailsStyle}
            >
                This White Paper introduces the PRDC Ripper, an innovative software solution developed by the TCE Innovation Group (TCIG) 
                to automate the extraction, classification, and presentation of Project Requirements and Design Criteria (PRDC) documents 
                associated with Design-Build (DB) project pursuits. By providing insight into the tool's background, features, and benefits, 
                this paper highlights the tool's functionality and utility to the TCE estimating team related to DB pursuits. 
            </AccordionDetails>
            <AccordionActions>
                <Button onClick={() => handleReadMoreClick("prdc-ripper")}>Read More</Button>
            </AccordionActions>
        </Accordion>

        <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleChange('panel2')}
            sx={accordionStyle}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon  style={{color:"white"}}/>}
                aria-controls="panel2-content"
                id="airtable"
                sx={accordionSummaryStyle}>
                Airtable
            </AccordionSummary>
            <AccordionDetails                
                sx={accordionDetailsStyle}
            >
                The purpose of this document is to highlight issues with the current project portfolio management (PPM) and resource planning (RP) 
                process and to offer a solution for TC's leadership. The proposed solution, AirTable, will help TC leaders unlock value through 
                transparency, real-time editing and sharing, leading to smarter allocation and scheduling capability. After framing the problem and 
                providing background, later sections will go into detail about the new solution, including some screenshots of the platform and an 
                explanation of the data structures used. Finally, this document ends with a look to the future, how the solution can grow with our 
                organization to address future challenges. 
            </AccordionDetails>
            <AccordionActions>
                <Button onClick={() => handleReadMoreClick("airtable")}>Read More</Button>
            </AccordionActions>
        </Accordion>


        <Accordion
            expanded={expanded === 'panel3'}
            onChange={handleChange('panel3')}
            sx={accordionStyle}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon  style={{color:"white"}}/>}
                aria-controls="panel3-content"
                id="openspace"
                sx={accordionSummaryStyle}>
                OpenSpace
            </AccordionSummary>
            <AccordionDetails              
                sx={accordionDetailsStyle}
            >
                The purpose of this document is to introduce OpenSpace, a 360° construction photo documentation software that 
                uses a cloud-based AI to stitch 3D images captured on off-the-shelf cameras to create interactive, highly 
                detailed jobsite documentation to allow project teams to collaborate, resolve problems, and track progress. 
                OpenSpace allows project teams to share information that previously could only be visualized and understood by 
                traveling to the jobsite. For TCE project teams working on geographically dispersed projects, OpenSpace represents 
                an opportunity to enhance visibility and empower teamwork without the hassle of travel. Besides introducing 
                OpenSpace, this document will outline key use cases identified by TCIG.  
            </AccordionDetails>
            <AccordionActions>
                <Button onClick={() => handleReadMoreClick("openspace")}>Read More</Button>
            </AccordionActions>
        </Accordion>
    </div>
    );
}
