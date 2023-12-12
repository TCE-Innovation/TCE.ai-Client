import React from "react";
import styles from "./pressCards.module.css";

//COMPONENTS
import TechCarousel from "./TechCarousel";
import PressCards from "./PressCards";

const Press = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <p className={styles.pressHeader}>Explore our work</p>
        <PressCards />
        <TechCarousel />
      </div>
    </div>
  );
};

export default Press;

