import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const MarkdownComponent = ({ children }) => {
  const [body] = React.Children.toArray(children);
  return (
    <Markdown
      skipHtml={false}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {body}
    </Markdown>
  );
};

export default MarkdownComponent;
