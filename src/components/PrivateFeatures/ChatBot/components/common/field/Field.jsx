import React from "react";

import { useContext, useFieldValue } from "../../contexts/FormContext";
import ErrorBlock from "./ErrorBlock";

import Wrapper from "./style";

const Field = ({
  name,
  placeholder,
  onChange = () => {},
  leftAddon = null,
  rightAddon = null,
  label = "",
  showError = true,
  ...props
}) => {
  const { register } = useContext();
  const { value, error } = useFieldValue(name);

  return (
    <Wrapper error={error ? error : ""}>
      {label && <div>{label}</div>}
      {showError && <ErrorBlock name={name} />}
      <div className="field-wrapper">
        {leftAddon}
        <input
          placeholder={placeholder}
          value={value}
          {...register(name, { onChange, ...props })}
        />
        <span className="right-addon">{rightAddon}</span>
      </div>
    </Wrapper>
  );
};

export default Field;
