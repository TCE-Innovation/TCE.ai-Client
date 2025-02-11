import React from "react";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "../../icons";

const IconMapper = {
  default: <ArrowUpIcon />,
  ascending: <ArrowDownIcon />,
  descending: <MinusIcon />,
};

const sortTooltipText = {
  default: "Sort A → Z",
  ascending: "Sort Z → A",
  descending: "Clear sorting",
};

const SortButton = ({ handleSort, currentOrder }) => {
  const icon = IconMapper[currentOrder];
  return (
    <>
      <button
        onClick={handleSort}
        className="chat-button sort-button d-flex align-items-center gap-2 justify-content-center tooltip-container"
      >
        {icon}
        <div className="tooltip tooltip-dark align-bottom">
          {sortTooltipText[currentOrder]}
        </div>
      </button>
    </>
  );
};

export default SortButton;
