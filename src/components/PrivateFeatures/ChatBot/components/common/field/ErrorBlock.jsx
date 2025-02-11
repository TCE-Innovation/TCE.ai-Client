import React, { useEffect, useRef } from "react";
import { capitalize } from "../../../utils/form";
import { useFieldValue } from "../../contexts/FormContext";

const ErrorBlock = ({ name }) => {
  const { error } = useFieldValue(name);
  const errorRef = useRef(null);

  useEffect(() => {
    if (!errorRef.current) return;
    if (error) {
      errorRef.current.style.opacity = 1;
    } else {
      errorRef.current.style.opacity = 0;
    }
  }, [error]);

  return (
    <div className="field-error-container" ref={errorRef}>
      {error ? capitalize(error) : <>&zwnj;</>}
    </div>
  );
};

export default ErrorBlock;
