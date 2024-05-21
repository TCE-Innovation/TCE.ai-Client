import React from "react";

import { LoadingIcon } from "../../icons";
import styled from "styled-components";

const index = ({ size = 5, align = "center" }) => {
  return (
    <Wrapper align={align}>
      <LoadingIcon height={`${Math.max(2, Math.min(size, 5))}em`} />
    </Wrapper>
  );
};

const Wrapper = styled.div((props) => {
  return `
    position: absolute;
    top: 0;
    left: 0;
    padding: 5em 0;
    pointer-events: none;
    user-select: none;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: ${props.align};
    height: 100%;
    width: 100%;
  `;
});

export default index;
