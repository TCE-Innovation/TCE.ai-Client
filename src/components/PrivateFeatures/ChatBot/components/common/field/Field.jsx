import React from "react";

import { useContext, useFieldValue } from "../../contexts/FormContext";

import Wrapper from "./style";

const Field = ({
  name,
  placeholder,
  onChange = () => {},
  leftAddon = null,
  rightAddon = null,
  label = "",
  ...props
}) => {
  const { register } = useContext();
  const { value, error } = useFieldValue(name);
  return (
    <Wrapper>
      {label && <div>{label}</div>}
      {error && <div style={{ color: "var(--chatbot-red)" }}>{error}</div>}
      <div className="field-wrapper">
        {leftAddon}
        <input
          placeholder={placeholder}
          value={value}
          {...register(name, { onChange, ...props })}
        />
        {rightAddon}
      </div>
    </Wrapper>
  );
};

export default Field;
