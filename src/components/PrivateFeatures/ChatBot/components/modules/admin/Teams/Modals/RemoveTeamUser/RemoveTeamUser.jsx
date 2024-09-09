import React from "react";

import { Overlay, Modal } from "../../../../../common";
import { sleep } from "../../../../../../utils/misc";
import { useGlobal } from "../../../../../../hooks";

const RemoveTeamUser = ({ show, onClose, ...userProps }) => {
  const { createAlert } = useGlobal();
  if (!show) return null;

  const handleRemoveTeam = () => {
    onClose();

    sleep(1000).then(() =>
      createAlert({
        message: `User ${userProps.name}(${
          userProps.email
        }) is removed from the team!`,
        type: "success",
      })
    );
  };

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Remove Team Uer"
        buttonLabels={{
          submit: "Remove",
        }}
        onSubmit={handleRemoveTeam}
        styles={{
          submit: {
            color: "var(--chatbot-red)",
            backgroundColor: "transparent",
          },
          cancel: {
            color: "black",
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="projects-modal-wrapper">
          <div>Are you sure you want to remove this user?</div>
          {!!userProps.name && (
            <div>
              <span>User name:</span>
              <span>{userProps.name}</span>
            </div>
          )}
          <div>
            <span>Email:</span>
            <span>{userProps.email}</span>
          </div>
        </div>
      </Modal>
    </Overlay>
  );
};

export default RemoveTeamUser;
