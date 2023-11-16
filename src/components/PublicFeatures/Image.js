import React from "react";
import "./style.css";

import tunnelImage from "../../img/tunnelImage.jpg";

const Image = () => {
  return (
    <div className="image-container">
        <img src={tunnelImage} alt="Tunnel View" />
        <div className="overlay-text">
            Driving innovation  <br/> for New York City's premier <br/> infrastructure contractor 
        </div>
    </div>
  );
};

export default Image;
