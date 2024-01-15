import React from "react";
import "./privateStyle.css";

const Welcome = () => {
  return (
    <div className="container">
        <br />
        <p className="private-body">
            Welcome to the TCIG Toolbox, home to an array of tools, info, and resources from the TCE Innovation Group.
        </p>
        <p className="private-body">
            This site is organized into three sections: Information, Tools, and Office.
            <br/>
            Information is where you can access documentation, resources, and PoC info for all the tools in our software stack; 
            <br/>
            Tools is where you will find custom-built software like Project Info Chatbots and Cable Run Optimizer; 
            <br/>
            Office is where you will find other resources like Equipment Checkout and Subcontractor Form Automation. 
            <br/>      
            This site, and the tools available here, are constantly evolving. 
            We are eager for feedback and ideas from folks across the organization, so please utilize the Idea Submission 
            form below if you would like to start a conversation with us. 
        </p>
      <br />
    </div>
  );
};

export default Welcome;

