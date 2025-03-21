import React, {useState} from "react";
import styles from "./home.module.css";

import ProCore from "../../../img/PartnerImages/ProCore.png";
import Airtable from "../../../img/PartnerImages/Airtable.png";
// import FieldWire from "../../../img/PartnerImages/FieldWire.png";
// import Bridgit from "../../../img/PartnerImages/Bridgit.png";
import OpenSpace from "../../../img/PartnerImages/OpenSpace.png";
import EZ from "../../../img/PartnerImages/EZ.png";
import Matterport from "../../../img/PartnerImages/Matterport.png";
import Oracle from "../../../img/PartnerImages/Oracle.png";
import PeakVisuals from "../../../img/PartnerImages/PeakVisual.png";

import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Tooltip } from "@mui/material";

const partnerData = [
  {
    name: "ProCore",
    imgSrc: ProCore,
    description: "Work more efficiently, communicate better, and build faster from a single source of truth",
    extraText: "Procore streamlines project management by centralizing document storage and eliminating the hassles of fragmented version control. This all-in-one platform enhances the workflows of all project personnel, whether they're in the field or in the office. Preconstruction tasks like estimate management, bid coordination, budget calculations, and team personnel tracking become effortless. During active projects, Procore excels at automating RFIs and Submittals, simplifying mark-ups and drawing labeling, maintaining comprehensive daily logs in real-time, providing fillable Quality and Safety reports, and offering numerous other invaluable features.",
    contactName: "Patrick Besser",
    contactEmail: "pbesser@tcelect.net",
    documents: [],
    supportLink: "https://support.procore.com/",
    trainingLink: "/private/training"
  },
  {
    name: "OpenSpace",
    imgSrc: OpenSpace,
    description: "Visual documentation of construction sites from walk-throughs",
    extraText: "OpenSpace offers engineers and project managers a practical solution for progress tracking, featuring a 360-degree camera attached to a hard hat that automatically records construction sites in 3-D. Executive Leadership can now remotely view the walk through of a project, in a similar manner to Google Maps, without the need to be there in-person. It allows for the addition of detailed photos and field notes during site walkthroughs, providing a comprehensive view for remote oversight, timeline tracking, and cost-effective insurance management.",
    contactName: "Rory O'Neill",
    contactEmail: "roneill@tcelect.net",
    documents: [
      {title: "OpenSpace SOP", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/ESGFy6NJP6pHteZx0vyLLygBb7XFxuGv4EnzGyuA5WOOQQ?e=GZQcte", id: "openspace-sop"},
    ],
    supportLink: "https://support.openspace.ai/en/"
  },
  {
    name: "Airtable",
    imgSrc: Airtable,
    description: "A host for multiple internal applications for use across a wide range of workflows",
    extraText: "Airtable assists various user groups and their specific needs, including TCIG, Estimating, Safety, Engineers, and Project Managers. TCIG and Estimating leverage Airtable's static database functionality to track internal assets and plan future bids, complementing their workflow with Bridgit Bench. The efficiency gains are further enhanced through Airtable's process logic and email automation, seamlessly integrated into multiple applications. The safety team benefits from automation in capturing track/safety certifications in a database and notifies safety managers of expiration dates, reducing downtime required for updating certifications which often have lead times of over three months.",
    contactName: "Rory O'Neill",
    contactEmail: "roneill@tcelect.net",
    documents: [
      {title: "GO Tracker White Paper", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/ETEIqNwZPvFPsCP6KLnLxYIBjt_3LmFY_SAtRvYhBchi_Q?e=GgEatL", id: "go-tracker"},
      {title: "GO Tracker SOP", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/EehYuVJdG9NJj_8Hp4_gqskBg8G5xFP0W6s7iQKaslYRDA?e=LL6t1E", id: "go-tracker-sop"}
    ]
  },
  {
    name: "Matterport",
    imgSrc: Matterport,
    description: "Capture and connect rooms to create detailed, interactive 3D spaces",
    extraText: "By utilizing Matterport cameras in construction settings, the camera seamlessly converts physical environments into immersive 3D models. This digital recreation enables remote viewing from any location and allows for quick, accurate distance measurements. Whether applied indoors or outdoors, Matterport's 3D documentation system captures a visual snapshot at each project milestone, serving as a comprehensive record-keeping tool throughout the construction process.",
    contactName: "Rory O'Neill",
    contactEmail: "roneill@tcelect.net",
    documents: [],
    supportLink: ""
  },
  {
    name: "EZOfficeInventory",
    imgSrc: EZ,
    description: "Asset management for maximizing overstock usage and minimizing item surplus",
    extraText: "EZOffice Inventory provides comprehensive asset tracking capabilities for items that can be allocated to various project sites. It mitigates the risk of lost or misused assets while optimizing resource utilization. Warehouse users benefit from streamlined processes for efficiently managing the inflow and outflow of items. Notable features, including location tracking and customized item groupings, eliminate the need for manual searches, ensuring zero downtime and efficient access to available in-stock items.",
    contactName: "Thomas Marston",
    contactEmail: "tmarston@tcelect.net",
    documents: [
      {title: "TCE EZOffice Dashboard", url: "https://tcelectric.ezofficeinventory.com/dashboard"},
    ],
    supportLink: "https://ezo.io/ezofficeinventory/knowledge-base/"
  },
  {
    name: "Oracle",
    imgSrc: Oracle,
    description: "Maximize efficiency and performance with an integrated project management solution",
    extraText: "Oracle P6 offers unparalleled control over project complexity by facilitating planning, scheduling, and resource management across your entire portfolio. P6 is tailored for large-scale, highly sophisticated project management and enables organizations to meet deadlines, stay within budget, and achieve their project goals. It excels in multi-user and multi-project environments with features like Gantt charts, Work Breakdown Structures, and comprehensive reporting tools.",
    contactName: "Sahul Kadarpeta",
    contactEmail: "skadarpeta@tcelect.net",
    documents: []
  },
  // {
  //   name: "Bridgit",
  //   imgSrc: Bridgit,
  //   description: "Transforms workforce data into insights that inform strategic and tactical business decisions",
  //   extraText: "Bridgit Bench improves project management by seamlessly integrating project and individual employee data, enabling more precise timelines and workforce optimization. During the pre-construction phase, it facilitates the creation and assignment of role titles and streamlines the coordination of Key Personnel for Design-Build Projects. As projects transition into the active phase and employees are assigned to specific roles, Bridgit Bench ensures optimal allocation, preventing overwork, and strategically placing employees based on their qualifications, certifications, and project history to meet both their needs and the project's requirements.",
  //   contactName: "Jacob Shavel",
  //   contactEmail: "jshavel@tcelect.net",
  //   documents: [
  //     {title: "Bridgit White Paper", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/EQyO1dDTWFxDjvk9Gr5tN5YBQqF6b73gNlDd3jGcNjQ9Yg?e=Zp6Ply", id: "bridgit"},
  //   ]
  // },
  {
    name: "Peak Visuals",
    imgSrc: PeakVisuals,
    description: "Advanced aerial surveying and construction documentation",
    extraText: "Peak Visuals specializes in drone surveying to capture high-resolution imagery of large outdoor areas for construction documentation and surveying. Leveraging state-of-the-art drone technology, Peak Visuals provides accurate, comprehensive site data that enhances project planning and monitoring. This service is essential for construction managers and engineers who require detailed aerial perspectives to guide decision-making and track project progress.",
    contactName: "Rory O'Neill",
    contactEmail: "roneill@tcelect.net",
    documents: []
  },
  // {
  //   name: "FieldWire",
  //   imgSrc: FieldWire,
  //   description: "Standardized workflow and collaboration for marking up drawings",
  //   extraText: "Fieldwire streamlines collaboration and version control for multiple engineers, eliminating the need to constantly ensure that work is done on the latest document version. In the past, projects faced challenges with communication among engineers and maintaining consistency in project drawings. However, Fieldwire offers a standardized space for document history and collaborative drawing markups, effectively reducing the pain points associated with maintaining consistency, enhancing communication, and improving overall efficiency.",
  //   contactName: "Rory O'Neill",
  //   contactEmail: "roneill@tcelect.net",
  //   documents: []
  // }
];

const Home = () => {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const handleInsideCardClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className="container">
      <br />
      <div className={styles.techSubheader}>
      Welcome to TCE.tools–home of TCE's innovative tools! Here, you'll have access to tools
      and associated documentation designed to enhance our internal operations and collaboration. 
      Our goal is to empower each team member with the resources and support necessary to excel in our projects. 
      Dive into our tools and reach out for any assistance you need!
      </div>

      <div className={styles.techSubheader}>
        On this page you will find overviews about TCE's software tools. 
        In addition to these overviews, you will find links to documentation from the 
        partners as well as standard operating procedures and white papers. To 
        contact the relevant tool owner with questions or requests on a certain tool, please 
        click the email icon under any tool to draft an email and start a conversation. 
      </div>
      
      <div>
        {partnerData.map((partner, index) => (
          <div className={styles.card} key={index} onClick={() => toggleReadMore(index)}>
            
            <div className={styles.oneLinerContainer}>
              <div style={{width: "22vw"}}>
                <div className={styles.cardImage}>
                  <img src={partner.imgSrc} alt={partner.name} className={styles.image}/>
                </div>
              </div>
  
              <div className={styles.cardBody}>
                <p className={styles.cardText}>{partner.description}</p>
              </div>    

              <IconButton onClick={() => toggleReadMore(index)} className={styles.readMoreButton} disableRipple>
                {expandedIndex === index ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>        
            </div>
  
            {expandedIndex === index && (
              <div className={styles.expandedContainer}>
                <div className={styles.expandedCardBody}>

                  <p className={styles.extraText}>{partner.extraText}</p>
                  
                  <div className={styles.linkBox}>

                    {partner.trainingLink && (
                      <a 
                        className={styles.linkText}
                        href={partner.trainingLink}
                        rel="noopener noreferrer"
                        onClick={handleInsideCardClick}
                      >
                        Training
                        <SchoolIcon className={styles.icon} />
                      </a>

                    )}

                    {partner.documents && partner.documents.map((doc, docIndex) => (
                      <div key={docIndex} onClick={handleInsideCardClick}>
                        <span
                          className={styles.linkText}
                          onClick={() => window.open(`/document?file=${doc.id}`, '_blank')}
                        >
                          {doc.title}
                          <ArticleIcon className={styles.icon} />
                        </span>
                      </div>
                    ))}

                    {partner.supportLink && (
                      <a
                        className={styles.linkText}
                        href={partner.supportLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleInsideCardClick}
                      >
                        Documentation
                        <OpenInNewIcon className={styles.icon} />
                      </a>
                    )}

                    <Tooltip title={`Email ${partner.contactName} at ${partner.contactEmail}`}>
                      <a className={styles.linkText} href={`mailto:${partner.contactEmail}?subject=Question%20about%20${partner.name}`}  onClick={handleInsideCardClick}>
                          Need assistance?
                        <EmailIcon className={styles.icon} />
                      </a>
                    </Tooltip>

                  </div>

                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Home;