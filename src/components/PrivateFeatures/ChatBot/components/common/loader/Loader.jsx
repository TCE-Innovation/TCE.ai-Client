import React from "react";

import { LoadingIcon } from "../../icons";
import Wrapper from "./style";

const Loader = ({ size = 5, align = "center" }) => {
  return (
    <Wrapper align={align}>
      <LoadingIcon height={`${Math.max(2, Math.min(size, 8))}em`} />
    </Wrapper>
  );
};

export default Loader;
