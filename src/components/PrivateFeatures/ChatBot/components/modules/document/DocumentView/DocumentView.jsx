import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import DocumentHeader from "./DocumentHeader";
import RenderLoader from "./RenderLoader";

import { useDocument, useOutsideClick } from "../../../../hooks";

import Wrapper from "./style";

const DocumentView = ({ onClose, pdfURL, title, highlightedText }) => {
  const { plugins, pageControl, workerUrl, handleDocumentLoad } = useDocument([
    highlightedText,
  ]);

  const { targetRef } = useOutsideClick({ onClickOutside: onClose });

  return (
    <Wrapper ref={targetRef}>
      <div className="document-container">
        <DocumentHeader
          title={title}
          currentPage={pageControl.CurrentPageLabel}
          jumpToNextPage={pageControl.jumpToNextPage}
          jumpToPreviousPage={pageControl.jumpToPreviousPage}
          totalPage={pageControl.NumberOfPages}
          onClose={onClose}
        />
        <div className="document-body">
          <Worker workerUrl={workerUrl}>
            <Viewer
              renderLoader={(percentage) => (
                <RenderLoader progress={percentage} />
              )}
              fileUrl={pdfURL}
              plugins={plugins}
              defaultScale={1}
              onDocumentLoad={handleDocumentLoad}
            />
          </Worker>
        </div>
      </div>
    </Wrapper>
  );
};

export default DocumentView;
