import React from "react";
import { ArrowLeftIcon } from "../../icons";

const Restricted = ({ children }) => {
  return (
    <div>
      <button
        onClick={() => window.history.back()}
        className="d-flex align-items-center gap-2 chat-button"
      >
        <span>
          <ArrowLeftIcon />
        </span>
        <span>go back</span>
      </button>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "bolder",
        }}
      >
        You don't have enough permissions to view this content
      </h1>
      {children}
    </div>
  );
};

export default Restricted;
