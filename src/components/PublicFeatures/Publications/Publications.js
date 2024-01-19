import React from "react";
import styles from "./whitepaper.module.css";
import WPAccordion from "./Accordion";

const WhitePapers = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <div className={styles.whitepaperHeader}>Publications</div>
        <div className={styles.whitepaperOneLiner}>Explore selected publications.</div>
        <div style={{alignContent: "center", justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <WPAccordion />
        </div>
        </div>
    </div>
  );
};

export default WhitePapers;

