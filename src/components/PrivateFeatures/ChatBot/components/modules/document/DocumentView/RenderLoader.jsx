import React from "react";
import { Loader } from "../../../common";

const RenderLoader = ({ progress }) => {
  return (
    <div>
      <Loader size={8} />
      <div style={{ marginTop: "2em" }}>{progress.toFixed(2)}%</div>
    </div>
  );
};

export default RenderLoader;
