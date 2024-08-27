import React from "react";
import { CloseIcon } from "../../icons";

const _SelectedItems = ({ list, renderer, value, handleRemove }) => {
  return (
    <div
      style={{
        flexWrap: "wrap",
        border: value.length ? "1px solid" : "",
        borderRadius: ".25em",
        maxHeight: "100px",
        overflow: "hidden",
        overflowY: "auto",
      }}
      className="d-flex align-items-center top-0 w-100"
    >
      {list
        .filter((item) => value?.some((valueItem) => valueItem === item.value))
        .map((item) => {
          return (
            <button
              type="button"
              key={item.value}
              className="chat-button d-flex align-items-center gap-2 p-2 my-2 rounded mx-2"
              style={{
                width: "max-content",
                fontSize: ".75em",
                border: "1px solid",
                cursor: "pointer",
                pointerEvents: "all",
                whiteSpace: "nowrap",
              }}
            >
              <span>{renderer?.(item) || item.label}</span>
              <span onClick={() => handleRemove(item.value)}>
                <CloseIcon width={".75em"} />
              </span>
            </button>
          );
        })}
    </div>
  );
};

export default _SelectedItems;
