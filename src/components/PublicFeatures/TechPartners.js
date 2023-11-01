import React, {useState} from "react";
import "./style.css";

import ProCore from "../../img/PartnerImages/ProCore.jpg";
import Airtable from "../../img/PartnerImages/Airtable.png";
import FieldWire from "../../img/PartnerImages/FieldWire.jpg";
import Bridgit from "../../img/PartnerImages/Bridgit.jpg";
import OpenSpace from "../../img/PartnerImages/OpenSpace.jpg";
import EZ from "../../img/PartnerImages/EZ.jpg";

import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const TechPartners = () => {
  const [readMoreAirtable, setReadMoreAirtable] = useState(false);
  const [readMoreProcore, setReadMoreProcore] = useState(false);
  const [readMoreBridgit, setReadMoreBridgit] = useState(false);
  const [readMoreFieldwire, setReadMoreFieldwire] = useState(false);
  const [readMoreOpenSpace, setReadMoreOpenSpace] = useState(false);
  const [readMoreEZ, setReadMoreEZ] = useState(false);

  const handleReadMoreAirtableClick = () => {
    setReadMoreAirtable(!readMoreAirtable); 
  };
  const handleReadMoreProcoreClick = () => {
    setReadMoreProcore(!readMoreProcore); 
  }
  const handleReadMoreBridgitClick = () => {
    setReadMoreBridgit(!readMoreBridgit); 
  }
  const handleReadMoreFieldwireClick = () => {
    setReadMoreFieldwire(!readMoreFieldwire); 
  }
  const handleReadMoreOpenSpaceClick = () => {
    setReadMoreOpenSpace(!readMoreOpenSpace); 
  }
  const handleReadMoreEZClick = () => {
    setReadMoreEZ(!readMoreEZ);
  }


  return (
    <div className="container">
        <div className="header">TECH PARTNERS</div>

        <br />
        <br />

        <div className="cards-container">

          <div className="card">
          <img src={Airtable} alt="Airtable"></img>
            <div className="card-body">
              <p className="card-text">A host for multiple internal applications for use across a wide range of workflows within TCE as a whole.</p>
              {readMoreAirtable && (
                <p className="extra-text">
                  Airtable assists various user groups and their specific needs, including TCIG, Estimating, Safety, Engineers, and Project Managers. TCIG and Estimating leverage Airtable's static database functionality to track internal assets and plan future bids, complementing their workflow with Bridgit Bench. The efficiency gains are further enhanced through Airtable's process logic and email automation, seamlessly integrated into multiple applications. The safety team benefits from automation in capturing track/safety certifications in a database and notifies safety managers of expiration dates, reducing downtime required for updating certifications which often have lead times of over three months. Engineers rely on the in-house RFP Ripper, utilizing the Airtable API, to extract vital information from extensive RFP documents, saving valuable time and minimizing key-information from being glossed over. Moreover, Airtable automation facilitates Engineers and Project Managers in tracking GO Requests with the MTA, simplifying a once labor-intensive process of updating and maintaining information as it evolves.
                </p>
              )}
              <IconButton onClick={handleReadMoreAirtableClick} className="read-more-button">
                {readMoreAirtable ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>          
            </div>
          </div>

          <div className="card">
          <img src={ProCore} alt="ProCore"></img>
            <div className="card-body">
              <p className="card-text">Work more efficiently, communicate better, and build faster from a single source of truth.</p>
              {readMoreProcore && (
                <p className="extra-text">
                   Procore streamlines project management by centralizing document storage and eliminating the hassles of fragmented version control. This all-in-one platform enhances the workflows of all project personnel, whether they're in the field or in the office. Preconstruction tasks like estimate management, bid coordination, budget calculations, and team personnel tracking become effortless. During active projects, Procore excels at automating RFIs and Submittals, simplifying mark-ups and drawing labeling, maintaining comprehensive daily logs in real-time, providing fillable Quality and Safety reports, and offering numerous other invaluable features.
                </p>
              )}
              <IconButton onClick={handleReadMoreProcoreClick} className="read-more-button">
                {readMoreProcore ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>            
            </div>
          </div>

          <div className="card">
          <img src={FieldWire} alt="FieldWire"></img>
            <div className="card-body">
              <p className="card-text">Standardized workflow and collaboration for marking up drawings.</p>
              {readMoreFieldwire && (
                <p className="extra-text">
                   Fieldwire streamlines collaboration and version control for multiple engineers, eliminating the need to constantly ensure that work is done on the latest document version. In the past, projects faced challenges with communication among engineers and maintaining consistency in project drawings. However, Fieldwire offers a standardized space for document history and collaborative drawing markups, effectively reducing the pain points associated with maintaining consistency, enhancing communication, and improving overall efficiency.
                </p>
              )}
              <IconButton onClick={handleReadMoreFieldwireClick} className="read-more-button">
                {readMoreFieldwire ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>        
            </div>
          </div>
  
          <div className="card">
          <img src={Bridgit} alt="Bridgit"></img>
            <div className="card-body">
              <p className="card-text">Transforms workforce data into actionable insights that inform an organization’s strategic and tactical business decisions.</p>
              {readMoreBridgit && (
                <p className="extra-text">
                   Bridgit Bench improves project management by seamlessly integrating project and individual employee data, enabling more precise timelines and workforce optimization. During the pre-construction phase, it facilitates the creation and assignment of role titles and streamlines the coordination of Key Personnel for Design-Build Projects. As projects transition into the active phase and employees are assigned to specific roles, Bridgit Bench ensures optimal allocation, preventing overwork, and strategically placing employees based on their qualifications, certifications, and project history to meet both their needs and the project's requirements.
                </p>
              )}
              <IconButton onClick={handleReadMoreBridgitClick} className="read-more-button">
                {readMoreBridgit ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>            
            </div>
          </div>

          <div className="card">
          <img src={OpenSpace} alt="OpenSpace"></img>
            <div className="card-body">
              <p className="card-text">Visual documentation of construction sites from walk-throughs.</p>
              {readMoreOpenSpace && (
                <p className="extra-text">
                   OpenSpace offers engineers and project managers a practical solution for progress tracking, featuring a 360-degree camera attached to a hard hat that automatically records construction sites in 3-D. Executive Leadership can now remotely view the walk through of a project, in a similar manner to Google Maps, without the need to be there in-person. It allows for the addition of detailed photos and field notes during site walkthroughs, providing a comprehensive view for remote oversight, timeline tracking, and cost-effective insurance management.
                </p>
              )}
              <IconButton onClick={handleReadMoreOpenSpaceClick} className="read-more-button">
                {readMoreOpenSpace ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>         
            </div>
          </div>

          <div className="card">
          <img src={EZ} alt="EZOffice"></img>
            <div className="card-body">
              <p className="card-text">Asset management for maximizing overstock usage and minimizing item surplus.</p>
              {readMoreEZ && (
                <p className="extra-text">
                   EZOffice Inventory provides comprehensive asset tracking capabilities for items that can be allocated to various project sites. It mitigates the risk of lost or misused assets while optimizing resource utilization. Warehouse users benefit from streamlined processes for efficiently managing the inflow and outflow of items. Notable features, including location tracking and customized item groupings, eliminate the need for manual searches, ensuring zero downtime and efficient access to available in-stock items.
                </p>
              )}
              <IconButton onClick={handleReadMoreEZClick} className="read-more-button">
                {readMoreEZ ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </IconButton>        
            </div>
          </div>





        </div>
    </div>
  );
};

export default TechPartners;

