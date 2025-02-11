import React from "react";
import { createPortal } from "react-dom";

import BaseWrapper from "../layouts/base/style";
import AdminWrapper from "../layouts/admin/style";
import ChatWrapper from "../layouts/main/style";

import { Overlay } from "../common";

import { useGlobal } from "../../hooks";

const Portal = ({ children }) => {
  const { query } = useGlobal();
  const { params } = query;

  const isAdmin = "admin" in params;

  const Wrapper = isAdmin ? AdminWrapper : ChatWrapper;

  const blockPropagation = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <div
      onClick={blockPropagation}
      style={{
        position: "fixed",
        zIndex: 99999999,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <BaseWrapper>
        <Wrapper>
          <Overlay>{children}</Overlay>
        </Wrapper>
      </BaseWrapper>
    </div>,
    document.querySelector("#chatbot-modal-portal")
  );
};

export default Portal;
