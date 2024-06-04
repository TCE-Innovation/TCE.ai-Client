import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import DocumentHeader from "./DocumentHeader";
import RenderLoader from "./RenderLoader";

import { useDocument } from "../../../../hooks";

import "@react-pdf-viewer/core/lib/styles/index.css";

import Wrapper from "./style";

const DocumentView = ({ onClose, pdfURL, title }) => {
  const { plugins, pageControl, workerUrl, handleDocumentLoad } = useDocument([
    "approved",
  ]);

  return (
    <Wrapper>
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
              defaultScale={0.7790375}
              initialPage={1}
              onDocumentLoad={handleDocumentLoad}
            />
          </Worker>
        </div>
      </div>
    </Wrapper>
  );
};

export default DocumentView;
