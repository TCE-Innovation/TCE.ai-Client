import React from "react";

import { CloseIcon, LeftIcon, RightIcon } from "../../../icons";

const DocumentHeader = ({
  title,
  currentPage = 0,
  totalPage,
  jumpToPreviousPage,
  jumpToNextPage,
  onClose,
}) => {
  return (
    <div className="document-header">
      <div className="tooltip-container">
        <div className="document-title">{title}</div>
        <div style={{ width: "300px" }} className="tooltip align-top">
          {title}
        </div>
      </div>
      <div className="document-page-info">
        <span>Page</span>
        <span className="document-page-numeric">{currentPage || 0}</span>
        <span>/</span>
        <span className="document-page-numeric">{totalPage}</span>
      </div>
      <div className="document-navigation">
        <button
          className="chat-button tooltip-container"
          onClick={jumpToPreviousPage}
        >
          <LeftIcon />
          <div className="tooltip align-top">previous</div>
        </button>
        <button
          className="chat-button tooltip-container"
          onClick={jumpToNextPage}
        >
          <RightIcon />
          <div className="tooltip align-top">next</div>
        </button>
      </div>
      <div>
        <button
          className="chat-button document-close-btn tooltip-container"
          onClick={onClose}
        >
          <CloseIcon />
          <div className="tooltip">Close</div>
        </button>
      </div>
    </div>
  );
};

export default DocumentHeader;
