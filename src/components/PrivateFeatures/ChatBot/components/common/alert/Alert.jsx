import React, { useEffect, useRef, useState } from "react";

import { ErrorIcon, CheckIcon, InfoIcon } from "../../icons";

import Wrapper from "./style";
import { useGlobal, useDebounce } from "../../../hooks";

const mapIconToType = {
  danger: ErrorIcon,
  success: CheckIcon,
  info: InfoIcon,
};

const Alert = ({ message, type, context = null, duration = 3, onRemove }) => {
  const [currentMessage, setCurrentMessage] = useState(message);
  const { registerSubscriber } = useGlobal();
  const ref = useRef();
  const Icon = mapIconToType[type] || mapIconToType["info"];

  const cleanupRef = useRef(() => {});

  const [removeAlert, cancelAlert] = useDebounce(() => {
    onRemove();
  }, duration);

  useEffect(() => {
    if (!ref.current) return;
    if (context) {
      cleanupRef.current = registerSubscriber(context, (newMessage) => {
        setCurrentMessage(newMessage);
      });
    }
    removeAlert();
    ref.current.classList.add("show");
    return () => {
      cleanupRef.current();
      cancelAlert();
    };
    // eslint-disable-next-line
  }, [context]);

  return (
    <Wrapper>
      <div ref={ref} className={`chatbot-alert alert-${type}`}>
        <Icon />
        <span>{currentMessage}</span>
      </div>
    </Wrapper>
  );
};

export default Alert;
