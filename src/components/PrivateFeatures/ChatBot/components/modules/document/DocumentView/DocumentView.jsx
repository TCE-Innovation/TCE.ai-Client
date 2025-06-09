import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import DocumentHeader from "./DocumentHeader";
import RenderLoader from "./RenderLoader";

import { useDocument } from "../../../../hooks";

import Wrapper from "./style";

const DocumentView = ({
  onClose,
  pdfURL,
  title,
  highlightedText,
  pageNumber,
}) => {
  const {
    plugins,
    pageControl,
    workerUrl,
    handleDocumentLoad,
    numericNumberOfPages,
    zoom,
    scaler,
  } = useDocument(highlightedText, pageNumber);
  return (
    <Wrapper scaler={scaler}>
      <DocumentHeader
        title={title}
        currentPage={pageControl.CurrentPageLabel}
        jumpToNextPage={pageControl.jumpToNextPage}
        jumpToPreviousPage={pageControl.jumpToPreviousPage}
        totalPage={pageControl.NumberOfPages}
        numberOfPages={numericNumberOfPages}
        currentPageNumber={pageControl.currentPageNumber}
        onClose={onClose}
        handleZoom={zoom}
        scaler={scaler}
      />
      <div className="document-container">
        <div className="document-body">
          <Worker workerUrl={workerUrl}>
            <Viewer
              renderLoader={(percentage) => (
                <RenderLoader progress={percentage} />
              )}
              fileUrl={pdfURL}
              enableSmoothScroll={false}
              initialPage={pageNumber - 1}
              defaultScale={2}
              plugins={plugins}
              onDocumentLoad={handleDocumentLoad}
            />
          </Worker>
        </div>
      </div>
    </Wrapper>
  );
};

export default DocumentView;
