import React from "react";
import { EditIcon } from "../../icons";
import { useConversation } from "../../../hooks";

const FloatingActions = () => {
  const { createConversation } = useConversation();

  const actions = [
    {
      title: "Create new chat",
      icon: EditIcon,
      handler: createConversation,
    },
  ];

  return (
    <>
      {actions.map((action) => {
        return (
          <div
            key={action.title}
            className="action-button tooltip-container"
            onClick={action.handler}
          >
            <action.icon />
            <div className="tooltip">{action.title}</div>
          </div>
        );
      })}
    </>
  );
};

export default FloatingActions;
