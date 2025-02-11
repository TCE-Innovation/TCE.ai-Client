import React from "react";
import Wrapper from "./style";

import { TickIcon } from "../../icons";

const CheckBox = ({ checked, id, size = 2, ...props }) => {
  return (
    <Wrapper size={size}>
      <label htmlFor={id}>
        <div className="checkbox-wrapper">
          <input
            {...props}
            type="checkbox"
            id={id}
            checked={checked}
            readOnly
            hidden
          />
          <span className="checkIcon">
            <TickIcon />
          </span>
        </div>
      </label>
    </Wrapper>
  );
};

export default CheckBox;
