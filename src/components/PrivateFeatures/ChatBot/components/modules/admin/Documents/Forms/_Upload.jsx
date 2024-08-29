import React, { useEffect } from "react";

import { UploadField } from "../../../../common/field";
import { useFieldValue } from "../../../../contexts/FormContext";

import { getFileSize, getFileName } from "../../../../../utils/file";

const Upload = ({ name, ...uploadProps }) => {
  const { value: items } = useFieldValue(name);
  const {
    changeValue: changeDocumentNames,
    value: documentNames,
  } = useFieldValue("documentNames");

  useEffect(() => {
    changeDocumentNames(
      items.map((doc, index) => documentNames[index] || doc?.name || "")
    );
    // eslint-disable-next-line
  }, [items]);

  return (
    <div>
      <div>
        <UploadField name={name} {...uploadProps} />
        {items.length > 0 &&
          items.map((document, index) => {
            const docName = getFileName(document);
            const fileName = getFileName(documentNames[index]);
            return (
              <div key={index}>
                <button
                  className="chat-button document-metadata"
                  data-size={getFileSize(document)}
                >
                  <span>{docName}</span>
                  {fileName !== docName ? (
                    <span style={{ color: "var(--chatbot-grey)" }}>
                      {`(${fileName})`}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Upload;
