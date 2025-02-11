import React from "react";

import { Modal } from "../../../../../common";
import { useContext } from "../../../../../contexts/FormContext";

const RemoveTeamUser = ({ show, onClose, removeUser, ...userProps }) => {
  const {
    mutate: handleRemoveUserFromTeam,
    loading: isSubmitting,
  } = removeUser;

  const { submitHandler, isValid } = useContext();

  if (!show) return null;

  const onSubmit = (values) => {
    if (isSubmitting) return;
    handleRemoveUserFromTeam({ userId: values.userId, teamId: values.teamId });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove Team User"
      buttonLabels={{
        submit: "Remove",
      }}
      isDisabled={!isValid}
      isSubmitting={isSubmitting}
      onSubmit={submitHandler(onSubmit)}
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
  );
};

export default RemoveTeamUser;
