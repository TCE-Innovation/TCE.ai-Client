import React, { useEffect, useRef } from "react";

import { ErrorIcon } from "../../icons";

import Wrapper from "./style";

const mapIconToType = {
  danger: ErrorIcon,
  info: () => null,
};

const Alert = ({ message, type }) => {
  const ref = useRef();
  const Icon = mapIconToType[type] || mapIconToType["info"];

  useEffect(() => {
    if (!ref.current) return;
    ref.current.classList.add("show");
  }, [ref.current]);

  return (
    <Wrapper>
      <div ref={ref} className={`chatbot-alert alert-${type}`}>
        <Icon />
        <span>{message}</span>
      </div>
    </Wrapper>
  );
};

export default Alert;
