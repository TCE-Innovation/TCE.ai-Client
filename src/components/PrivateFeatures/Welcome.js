import React from "react";
import "./privateStyle.css";

const Welcome = () => {
  return (
    <div className="container">
        <div className="private-header">WELCOME</div>
        <div className="private-subheader">TCE Innovation Group Headquarters</div>
        <br />
        <p className="private-body">
          The TCE Innovation Group (TCIG) is a multidisciplinary team of engineers, data scientists, and designers passionate 
          about the power of technology to transform the construction industry. Serving New York City's premier infrastructure 
          contractor, we are committed to leveraging technology to help our teams deliver successful projects in the world's most 
          challenging and complex construction environment. We are experienced in the design, development, and implementation of 
          software and hardware solutions, focusing our efforts across the business from project management and field execution 
          to business development, procurement, and operations.  
        </p>
      <br />
    </div>
  );
};

export default Welcome;

