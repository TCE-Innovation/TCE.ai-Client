import React from "react";
import styles from "./aboutUs.module.css";
import aboutUsPic from "../../../img/Public/RoryTracks.png";

const AboutUs = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <br /><br /><br /><br /><br /><br />
        <div className={styles.body}>
          <div className={styles.bigText}>
            <p>
              Our mission is simple: to find a better way
            </p>
          </div>

        </div>
          <div className={styles.smallText}>
            <p>
              The Innovation Group at TCE is built to help our colleagues do what they do best: 
              deliver safe, profitable, on-time projects in the most complex transit and 
              infrastructure system in the United States. Serving TCE's entire business, from 
              project management and field execution to business development, procurement, and 
              operations, we are committed to delivering effective solutions as well as fostering 
              a culture of curiosity and continuous improvement. Composed of software and systems 
              engineers, data scientists, and designers, our team is experienced in the development 
              of software and hardware solutions, as well as the implementation of off-the-shelf 
              technology products and the integration and management of a complex technology stack. 
            </p>
            <img src={aboutUsPic} className={styles.picture} alt="about us"/>
          </div>
      </div>
    </div>
  );
};

export default AboutUs;

