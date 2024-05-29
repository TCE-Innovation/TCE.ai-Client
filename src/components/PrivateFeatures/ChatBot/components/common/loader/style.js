import styled from "styled-components";

export default styled(({ active, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  left: 0;
  padding: 5em 0;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: ${(props) => props.align};
  height: 100%;
  width: 100%;
`;
