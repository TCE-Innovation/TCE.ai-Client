import React from "react";

import { getFileSize, getFileExtension } from "../../../../../utils/file";
import { formatDate } from "../../../../../utils/date";

const _Description = (document) => {
  return (
    <>
      <div>
        Document Name:{" "}
        <span style={{ color: "var(--chatbot-text-primary)" }}>
          {document.name}
        </span>
      </div>
      <div>
        Document Type:{" "}
        <span style={{ color: "var(--chatbot-text-primary)" }}>
          {document.documentType || getFileExtension(document) ||  getFileExtension(document.name)}
        </span>
      </div>
      <div>
        Size:{" "}
        <span style={{ color: "var(--chatbot-text-primary)" }}>
          {getFileSize(document) || "unknown"}
        </span>
      </div>
      <div>
        Date and Time of Addition:{" "}
        <span style={{ color: "var(--chatbot-text-primary)" }}>
          {formatDate(document.uploadDate, "MM.dd.yyyy hh:mm")}
        </span>
      </div>
    </>
  );
};

export default _Description;
