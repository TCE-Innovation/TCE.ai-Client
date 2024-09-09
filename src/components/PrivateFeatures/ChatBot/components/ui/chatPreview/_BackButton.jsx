import React from "react";
import { ArrowLeftIcon } from "../../icons";

const _BackButton = () => {
  return (
    <button
      className="chat-button d-flex align-items-center gap-1"
      style={{ color: "var(--chatbot-grey)" }}
      onClick={() => window.history.back()}
    >
      <span>
        <ArrowLeftIcon />
      </span>
      <span
        style={{ color: "var(--chatbot-text-primary)", fontWeight: "bold" }}
      >
        Back to Users
      </span>
    </button>
  );
};

export default _BackButton;
