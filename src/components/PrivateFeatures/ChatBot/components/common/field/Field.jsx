import React from "react";

import { useContext } from "../../contexts/FormContext";

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
  return (
    <Wrapper>
      {label && <div>{label}</div>}
      <div className="field-wrapper">
        {leftAddon}
        <input placeholder={placeholder} {...register(name, { onChange,...props })} />
        {rightAddon}
      </div>
    </Wrapper>
  );
};

export default Field;
