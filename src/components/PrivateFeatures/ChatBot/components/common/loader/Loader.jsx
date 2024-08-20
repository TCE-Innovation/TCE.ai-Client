import React from "react";

import { LoadingIcon } from "../../icons";
import Wrapper from "./style";

const Loader = ({ size = 5, align = "center", color }) => {
  return (
    <Wrapper align={align} color={color}>
      <LoadingIcon height={`${Math.max(2, Math.min(size, 8))}em`} />
    </Wrapper>
  );
};

export default Loader;
