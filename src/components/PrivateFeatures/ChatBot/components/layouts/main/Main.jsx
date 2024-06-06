import React, { Children } from "react";

import Wrapper from "./style";
import { useGlobal } from "../../../hooks";

const MainLayout = ({ children }) => {
  const [Conversations, Chat] = Children.toArray(children);
  const { conversationsCollapsed: isCollapsed } = useGlobal();
  return (
    <Wrapper>
      <div className="conversation-wrapper">{Conversations}</div>
      <div className={`chat-wrapper ${isCollapsed ? "collapsed" : ""}`}>
        {Chat}
      </div>
    </Wrapper>
  );
};

export default MainLayout;
