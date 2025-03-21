import React from "react";
import styles from "./aboutUs.module.css";

const AboutUs = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <div className={styles.body}>
          <div className={styles.bigText}>
            <p>
              The mission is simple: <br/> to find a better way
            </p>
          </div>

        </div>
          <div className={styles.smallText}>
            <p>
              {/* The Innovation Group at TCE is built to help our colleagues do what they do best: 
              deliver safe, profitable, on-time projects in the most complex transit and 
              infrastructure system in the United States. Serving TCE's entire business, from 
              project management and field execution to business development, procurement, and 
              operations, we are committed to delivering effective solutions as well as fostering 
              a culture of curiosity and continuous improvement. Composed of software and systems 
              engineers, data scientists, and designers, our team is experienced in the development 
              of software and hardware solutions, as well as the implementation of off-the-shelf 
              technology products and the integration and management of a complex technology stack.  */}

              TCE's commitment to fostering a culture of innovation empowers employees across 
              the organization to deliver safe, profitable, and on-time projects within the 
              nation’s most complex transit and infrastructure system. From project management and 
              field execution to business development, procurement, and operations,
              TCE embraces a culture of curiosity and problem-solving to harness cutting-edge technology 
              and seamlessly integrate innovative solutions to enhance efficiency and drive progress.
            </p>
          </div>
      </div>
    </div>
  );
};

export default AboutUs;

