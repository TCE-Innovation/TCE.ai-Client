import React, {useState} from "react";
import "./privateStyle.css";

import ProCore from "../../img/PartnerImages/ProCore.png";
import Airtable from "../../img/PartnerImages/Airtable.png";
import FieldWire from "../../img/PartnerImages/FieldWire.jpg";
import Bridgit from "../../img/PartnerImages/Bridgit.png";
import OpenSpace from "../../img/PartnerImages/OpenSpace.jpg";
import EZ from "../../img/PartnerImages/EZ.png";

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const partnerData = [
  {
    name: "Airtable",
    imgSrc: Airtable,
    description: "A host for multiple internal applications for use across a wide range of workflows within TCE as a whole.",
    extraText: "Airtable assists various user groups and their specific needs, including TCIG, Estimating, Safety, Engineers, and Project Managers. TCIG and Estimating leverage Airtable's static database functionality to track internal assets and plan future bids, complementing their workflow with Bridgit Bench. The efficiency gains are further enhanced through Airtable's process logic and email automation, seamlessly integrated into multiple applications. The safety team benefits from automation in capturing track/safety certifications in a database and notifies safety managers of expiration dates, reducing downtime required for updating certifications which often have lead times of over three months.",
    contactName: "Chris Kruger",
    contactEmail: "ckruger@tcelect.net",
    website: 'https://www.airtable.com',
    documents: [
      {title: "GO Tracker White Paper", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/ETEIqNwZPvFPsCP6KLnLxYIBjt_3LmFY_SAtRvYhBchi_Q?e=GgEatL"},
      {title: "GO Tracker SOP", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/EehYuVJdG9NJj_8Hp4_gqskBg8G5xFP0W6s7iQKaslYRDA?e=LL6t1E"}
    ]
  },
  {
    name: "ProCore",
    imgSrc: ProCore,
    description: "Work more efficiently, communicate better, and build faster from a single source of truth.",
    extraText: "Procore streamlines project management by centralizing document storage and eliminating the hassles of fragmented version control. This all-in-one platform enhances the workflows of all project personnel, whether they're in the field or in the office. Preconstruction tasks like estimate management, bid coordination, budget calculations, and team personnel tracking become effortless. During active projects, Procore excels at automating RFIs and Submittals, simplifying mark-ups and drawing labeling, maintaining comprehensive daily logs in real-time, providing fillable Quality and Safety reports, and offering numerous other invaluable features.",
    contactName: "Patrick Besser",
    contactEmail: "pbesser@tcelect.net",
    website: 'https://www.procore.com',
    documents: []
  },
  {
    name: "OpenSpace",
    imgSrc: OpenSpace,
    description: "Visual documentation of construction sites from walk-throughs.",
    extraText: "OpenSpace offers engineers and project managers a practical solution for progress tracking, featuring a 360-degree camera attached to a hard hat that automatically records construction sites in 3-D. Executive Leadership can now remotely view the walk through of a project, in a similar manner to Google Maps, without the need to be there in-person. It allows for the addition of detailed photos and field notes during site walkthroughs, providing a comprehensive view for remote oversight, timeline tracking, and cost-effective insurance management.",
    contactName: "Rory O'Neill",
    contactEmail: "roneill@tcelect.net",
    website: 'https://www.openspace.ai',
    documents: [
      {title: "OpenSpace SOP", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/ESGFy6NJP6pHteZx0vyLLygBb7XFxuGv4EnzGyuA5WOOQQ?e=GZQcte"},
    ]
  },
  {
    name: "Bridgit",
    imgSrc: Bridgit,
    description: "Transforms workforce data into actionable insights that inform an organization’s strategic and tactical business decisions.",
    extraText: "Bridgit Bench improves project management by seamlessly integrating project and individual employee data, enabling more precise timelines and workforce optimization. During the pre-construction phase, it facilitates the creation and assignment of role titles and streamlines the coordination of Key Personnel for Design-Build Projects. As projects transition into the active phase and employees are assigned to specific roles, Bridgit Bench ensures optimal allocation, preventing overwork, and strategically placing employees based on their qualifications, certifications, and project history to meet both their needs and the project's requirements.",
    contactName: "Jacob Shavel",
    contactEmail: "jshavel@tcelect.net",
    website: 'https://www.gobridgit.com',
    documents: [
      {title: "Bridgit White Paper", url: "https://judlauent.sharepoint.com/:b:/s/TCEInnovation/EQyO1dDTWFxDjvk9Gr5tN5YBQqF6b73gNlDd3jGcNjQ9Yg?e=Zp6Ply"},
    ]
  },
  {
    name: "EZOfficeInventory",
    imgSrc: EZ,
    description: "Asset management for maximizing overstock usage and minimizing item surplus.",
    extraText: "EZOffice Inventory provides comprehensive asset tracking capabilities for items that can be allocated to various project sites. It mitigates the risk of lost or misused assets while optimizing resource utilization. Warehouse users benefit from streamlined processes for efficiently managing the inflow and outflow of items. Notable features, including location tracking and customized item groupings, eliminate the need for manual searches, ensuring zero downtime and efficient access to available in-stock items.",
    contactName: "Chris Kruger",
    contactEmail: "ckruger@tcelect.net",
    website: 'https://ezo.io/ezofficeinventory/',
    documents: []
  },
  {
    name: "FieldWire",
    imgSrc: FieldWire,
    description: "Standardized workflow and collaboration for marking up drawings.",
    extraText: "Fieldwire streamlines collaboration and version control for multiple engineers, eliminating the need to constantly ensure that work is done on the latest document version. In the past, projects faced challenges with communication among engineers and maintaining consistency in project drawings. However, Fieldwire offers a standardized space for document history and collaborative drawing markups, effectively reducing the pain points associated with maintaining consistency, enhancing communication, and improving overall efficiency.",
    contactName: "Rory O'Neill",
    contactEmail: "roneill@tcelect.net",
    website: 'https://www.fieldwire.com',
    documents: []
  }
];

const TechPartners = () => {
  const [readMoreStates, setReadMoreStates] = useState(new Array(partnerData.length).fill(false));

  const toggleReadMore = (index) => {
    const newReadMoreStates = readMoreStates.map((state, i) => (i === index ? !state : state));
    setReadMoreStates(newReadMoreStates);
  };

  const handleImageClick = (e, partner) => {
    e.stopPropagation();
    window.open(partner.website, '_blank');
  };

  const handleLinkClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className="container">
      <div className="header">TECH PARTNERS</div>
      <br /><br />
      <div className="cards-container">
        {partnerData.map((partner, index) => (
          <div className="card" key={index} onClick={() => toggleReadMore(index)}>
            
            <div className="one-liner-container">
              <div className="card-image" onClick={(e) => handleImageClick(e, partner)}>
                <img
                  src={partner.imgSrc}
                  alt={partner.name}
                  style={{ cursor: 'pointer' }}
                />
              </div>
  
              <div className="card-body">
                <p className="card-text">{partner.description}</p>
              </div>    

              <IconButton onClick={() => toggleReadMore(index)} className="read-more-button" disableRipple>
                {readMoreStates[index] ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>          
            </div>
  
            {readMoreStates[index] && (
              <div className="expanded-container">
                <div className="link-box">
                  {partner.documents && partner.documents.map((doc, docIndex) => (
                    <div key={docIndex} onClick={handleLinkClick}>
                      <a href={doc.url} target="_blank" rel="noopener noreferrer" className="link-text">{doc.title}</a>
                    </div>
                  ))}
                </div>
                <div className="expanded-card-body">
                  <p className="extra-text">{partner.extraText}</p>
                  <p className="contact-text">
                    Point of Contact: {partner.contactName} <a href={`mailto:${partner.contactEmail}`}>{partner.contactEmail}</a>
                  </p>
                </div>
              </div>
            )}
  
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default TechPartners;

