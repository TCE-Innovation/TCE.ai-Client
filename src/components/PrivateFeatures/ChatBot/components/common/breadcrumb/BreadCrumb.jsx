import React, { useState } from "react";

import { RightIcon } from "../../icons";

const BreadCrumb = ({ items }) => {
//   const [active, setActive] = useState(0);
  const [list, setList] = useState(items);

  const handleClick = (index) => {
    if (index === list.length - 1) return;
    setList(items.slice(0, index + 1));
  };

  return (
    <div className="chatbot-breadcrumb-container d-flex gap-2 align-items-center">
      {list.map((item, i, arr) => {
        return (
          <div className="d-flex align-items-center gap-2">
            <button className="chat-button" onClick={() => handleClick(i)}>
              {i !== 0 && <span>{<RightIcon />}</span>}
              <span
                color={`${i ===
                  arr.length - 1} ? "var(--chatbot-primary)" : ""`}
              >
                {item.label}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
