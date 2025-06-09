import React from "react";

import {
  CloseIcon,
  LeftIcon,
  RightIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "../../../icons";

const DocumentHeader = ({
  title,
  currentPage = 0,
  totalPage,
  jumpToPreviousPage,
  currentPageNumber,
  jumpToNextPage,
  onClose,
  handleZoom,
  scaler,
}) => {
  const isZoomed = scaler !== 1;
  return (
    <div
      className={`document-header ${isZoomed ? "zoomed-document-view" : ""}`}
    >
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
      <div className="document-zoom-controls">
        <span className="tooltip-container" onClick={() => handleZoom(0.5)}>
          <ZoomOutIcon />
          <span className="tooltip align-top">zoom out</span>
        </span>

        <span className="tooltip-container" onClick={() => handleZoom(-0.5)}>
          <ZoomInIcon />
          <span className="tooltip align-top">zoom in</span>
        </span>
      </div>
      <div className="document-navigation">
        <button
          className="chat-button tooltip-container"
          onClick={() => jumpToPreviousPage(currentPageNumber - 1)}
        >
          <LeftIcon />
          <div className="tooltip align-top">previous</div>
        </button>
        <button
          className="chat-button tooltip-container"
          onClick={() => jumpToNextPage(currentPageNumber + 1)}
        >
          <RightIcon />
          <div className="tooltip align-top">next</div>
        </button>
      </div>
      <div>
        <button
          className="chat-button document-close-btn tooltip-container"
          onClickCapture={onClose}
        >
          <CloseIcon />
          <div className="tooltip">Close</div>
        </button>
      </div>
    </div>
  );
};

export default DocumentHeader;
