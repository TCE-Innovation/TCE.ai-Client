import React, { useState, useEffect, useMemo } from "react";
import MarkDown from "../markdown";
import { renderToString } from "react-dom/server";

const defaultCursor = <>&#9679;</>;

const Typewriter = ({
  text,
  speed = 50,
  onEnd = () => {},
  cursor = defaultCursor,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  const showCursor = useMemo(() => {
    return index !== text.length;
  }, [index, text]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
        if (index + 1 === text.length) {
          onEnd();
        }
      }, speed);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [index, text, speed]);

  return (
    <div className="position-relative">
      <MarkDown>{`${displayedText} ${
        showCursor ? renderToString(cursor) : ""
      }`}</MarkDown>
    </div>
  );
};

export default Typewriter;
