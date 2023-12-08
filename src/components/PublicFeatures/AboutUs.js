import React from "react";
import "./style.css";

const AboutUs = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <br /><br /><br /><br /><br /><br />
        <div className="about-us-body">
          <div className="big-text">
            <p>
              Our mission is simple: <br />to find a better way
            </p>
          </div>
        </div>
          <div className="small-text">
            <p>
            The TCE Innovation Group is a multidisciplinary team of engineers, data scientists, and designers passionate 
              about the power of technology to transform the construction industry. Serving New York City's premier infrastructure 
              contractor, we are committed to leveraging technology to help our teams deliver successful projects in the world's most 
              challenging and complex construction environment. We are experienced in the design, development, and implementation of 
              software and hardware solutions, focusing our efforts across the business from project management and field execution 
              to business development, procurement, and operations.  
            </p>
          </div>
      </div>
    </div>
  );
};

export default AboutUs;

