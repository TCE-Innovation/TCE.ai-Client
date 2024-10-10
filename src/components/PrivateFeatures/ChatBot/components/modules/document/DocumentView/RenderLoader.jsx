import React from "react";
import { Loader } from "../../../common";

const RenderLoader = ({ progress }) => {
  return (
    <div style={{ fontSize: "3em" }}>
      <Loader size={8} />
      <div style={{ marginTop: "3em" }}>{progress.toFixed(2)}%</div>
    </div>
  );
};

export default RenderLoader;
