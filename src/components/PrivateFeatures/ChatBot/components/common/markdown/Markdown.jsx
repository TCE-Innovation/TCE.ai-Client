import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownComponent = ({ children }) => {
  const [body] = React.Children.toArray(children);
  return <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>;
};

export default MarkdownComponent;
