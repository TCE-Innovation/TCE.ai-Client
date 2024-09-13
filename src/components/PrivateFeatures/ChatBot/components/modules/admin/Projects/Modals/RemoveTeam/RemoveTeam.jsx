import React from "react";

import { Modal } from "../../../../../common";

import { useContext } from "../../../../../contexts/FormContext";

const RemoveTeam = ({ show, onClose, deleteTeams, ...props }) => {
  const { mutate: handleRemoveTeam, loading: isSubmitting } = deleteTeams;
  const { submitHandler } = useContext();
  if (!show) return null;

  const onSubmit = (values) => {
    if (isSubmitting) return;
    console.log({ values });
    handleRemoveTeam({
      projectId: values.projectId,
      teamIds: values.teamIds,
    });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Remove Team from Project"
      buttonLabels={{
        submit: "Remove",
      }}
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
        <div>Are you sure you want to remove this team?</div>
        <div>
          <span>Team Name: </span>
          <span>{props.teamName}</span>
        </div>
      </div>
    </Modal>
  );
};

export default RemoveTeam;
