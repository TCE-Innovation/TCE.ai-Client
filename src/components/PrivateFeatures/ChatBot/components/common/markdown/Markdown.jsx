import React from "react";
import Markdown from "react-markdown";

const MarkdownComponent = ({ children }) => {
  return <Markdown>{children}</Markdown>;
};

export default MarkdownComponent;
