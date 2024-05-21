import React, { Children } from "react";

import Wrapper from "./style";

const MainLayout = ({ children }) => {
  const [Conversations, Chat] = Children.toArray(children);
  return (
    <Wrapper>
      <div className="conversation-wrapper">{Conversations}</div>
      <div className="chat-wrapper">{Chat}</div>
    </Wrapper>
  );
};

export default MainLayout;
