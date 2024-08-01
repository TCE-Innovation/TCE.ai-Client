import React from "react";

import { UploadField } from "../../../../common/field";
import { useFieldValue } from "../../../../contexts/FormContext";

const Upload = () => {
  const { value: document } = useFieldValue("document");

  return (
    <div>
      <div>
        <UploadField
          id={"document-upload"}
          title={"Upload Document"}
          name={"document"}
        />
        {document && (
          <>
            <button
              className="chat-button document-metadata"
              data-size={document.size}
            >
              <span>{document.name}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
