import React, { useEffect } from "react";

import { UploadField } from "../../../../common/field";
import { useFieldValue } from "../../../../contexts/FormContext";

const Upload = () => {
  const { value: document } = useFieldValue("document");
  const { changeValue: changeDocumentName } = useFieldValue("documentName");

  useEffect(() => {
    changeDocumentName(document?.name || "");
  }, [document?.name]);

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
