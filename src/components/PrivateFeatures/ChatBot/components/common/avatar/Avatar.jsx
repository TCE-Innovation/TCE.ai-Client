import React from "react";

import Wrapper from "./style";

const Avatar = ({ title, children }) => {
  return (
    <Wrapper>
      <div className="author-avatar" data-text={title}>
        {children}
      </div>
    </Wrapper>
  );
};

export default Avatar;
