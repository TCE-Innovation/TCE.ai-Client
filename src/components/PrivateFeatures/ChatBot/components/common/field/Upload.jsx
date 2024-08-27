import React, { useRef } from "react";

import Field from "./Field";
import { UploadIcon } from "../../icons";

import ErrorBlock from "./ErrorBlock";

const Upload = ({ title, id, name }) => {
  const ref = useRef()
  return (
    <div>
      <ErrorBlock name={name} />
      <div className="position-relative">
        <label htmlFor={id} className="d-block">
          <div ref={ref} className="position-absolute w-100 h-100" style={{zIndex:"-1"}}>
            <Field
              name={name}
              type="file"
              id={id}
              hidden
              value={""}
              showError={false}
            />
          </div>
          <button onClick={() => ref.current?.click()} tabIndex={0} className="chat-button upload-button w-100">
            <UploadIcon />
            <span>{title}</span>
          </button>
        </label>
      </div>
    </div>
  );
};

export default Upload;
