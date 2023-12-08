import React from "react";
import "../style.css";

//COMPONENTS
import TechCarousel from "./TechCarousel";
import PressCards from "./PressCards";

const Press = () => {
  return (
    <div className="full-window-component">
      <div className="black-container">
        <PressCards />
        <TechCarousel />
      </div>
    </div>
  );
};

export default Press;
