import React from "react";
import "./style.css";

const AboutUs = () => {
  return (
    <div className="box">
      <div className="main-frame">
        <div className="who-we-serve">
          <p className="TCE-is-new-york-city">
            <span className="text-wrapper">
              TCE is New York City&#39;s premier electrical contractor in the infrastructure construction market. TCE
              specializes in successfully delivering complex electrical systems for public and private organizations,
              with deep roots in transit systems and a proven history of success across all electrical disciplines.
              <br />
              <br />
            </span>
            <span className="span">
              Our primary objective is to save TCE valuable time and resources, optimize cost-efficiency, and unlock the
              full potential of our employees. The proof lies in our track record, where we&#39;ve streamlined processes
              for Field Engineers, Project Managers, and Executive Leadership, simultaneously driving down operational
              costs and elevating productivity to new heights.
              <br />
              <br />
              In an industry where the adoption of modern technology has historically been slow, TCIG proudly leads the
              charge in pioneering innovation and spearheading digitization. The construction sector, one of the largest
              in the world economy, has long struggled with productivity and efficiency issues. With approximately $10
              trillion spent on construction-related goods and services annually, there is a staggering $1.6 trillion
              opportunity to close the gap and reinvent the industry.
            </span>
          </p>
          <div className="overlap-group">
            <div className="div">WHO WE SERVE</div>
          </div>
        </div>
        <div className="who-we-are">
          <div className="overlap">
            <p className="the-TCE-innovation">
              The TCE Innovation Group (TCIG) is a dynamic and multidisciplinary team with a diverse range of expertise.
              Our team members bring specialized knowledge to the table, encompassing hardware solutions from the
              ground-up, software development proficiency in scripting, web development, and cloud deployment, as well
              as in-depth data science analytics that delve into internal databases and document
              control.&nbsp;&nbsp;Additionally, we excel in implementation planning to ensure a full-scale solution for
              project deployment.
            </p>
            <div className="text-wrapper-2">WHO WE ARE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;