import React, { useState, useEffect } from "react";
import MarkDown from "../markdown";

const Typewriter = ({
  text,
  speed = 50,
  onEnd = () => {},
  trigger = () => {},
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

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
  }, [index, text, speed]);

  return (
    <div className="position-relative">
      <MarkDown>{displayedText}</MarkDown>
    </div>
  );
};

export default Typewriter;
