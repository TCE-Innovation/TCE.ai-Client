import React from "react";

import Field from "./Field";
import { UploadIcon } from "../../icons";

const Upload = ({ title, id, name }) => {
  return (
    <label htmlFor={id} className="d-block position-relative pointer">
      <div className="position-absolute w-100 h-100" style={{ opacity: 0 }}>
        <Field name={name} type="file" hidden id={id} value={""} />
      </div>
      <button tabIndex={0} className="chat-button upload-button w-100">
        <UploadIcon />
        <span>{title}</span>
      </button>
    </label>
  );
};

export default Upload;
