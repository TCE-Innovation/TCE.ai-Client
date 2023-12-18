import React from "react";
import styles from "./pressCards.module.css";

//COMPONENTS
import TechCarousel from "./TechCarousel";
import PressCards from "./PressCards";

const Press = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <div className={styles.pressHeader}>Press and Publications</div>
        <div className={styles.pressOneLiner}>Explore selected publications on the team's work as well as media appearances with technology partners</div>
        <PressCards />
        <TechCarousel />
      </div>
    </div>
  );
};

export default Press;

