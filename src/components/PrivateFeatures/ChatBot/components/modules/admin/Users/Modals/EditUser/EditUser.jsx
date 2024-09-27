import React, { useEffect, useState } from "react";

import { Modal } from "../../../../../common";

import RolesField from "../../Forms/_Role";
import ProjectField from "../../Forms/_Project";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";
import { ROLES } from "../../../../../../constants/admin";
import { useGlobal } from "../../../../../../hooks";

const EditUser = ({ show, onClose, editUser, ...userProps }) => {
  const { mutate: handleEditUser, loading: isSubmitting } = editUser;
  const { submitHandler, isValid, setError, resetForm } = useContext();
  const { value: role } = useFieldValue("role");

  const [showProjectsField, setShowProjectsField] = useState(false);

  const { publishToSubscribers, createAlert } = useGlobal();

  useEffect(() => {
    if (role === ROLES.PM) {
      setShowProjectsField(true);
    } else {
      setShowProjectsField(false);
    }
  }, [role]);

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    if (!values.role) {
      return setError("role", "Please select a user role!");
    }
    handleEditUser({ role: values.role, userId: userProps.id });
    if (!values.editUserProjectIds.length) {
      resetForm();
      onClose();
    } else {
      createAlert({
        message: "adding projects...",
        type: "info",
      });
      publishToSubscribers(`add-user-to-projects-editUserProjectIds`, {
        userId: userProps.id,
        projectIds: values.editUserProjectIds,
      });
      resetForm();
      onClose();
    }
  };

  if (!show) return null;

  return (
    <Modal
      onCancel={onClose}
      title="Edit User Role"
      buttonLabels={{
        submit: "Save",
      }}
      isSubmitting={isSubmitting}
      isDisabled={!isValid}
      onSubmit={submitHandler(handleSubmit)}
      styles={{
        submit: {
          color: "white",
          backgroundColor: "var(--chatbot-primary) important!",
        },
        cancel: {
          color: "black",
          backgroundColor: "transparent",
        },
      }}
    >
      <div className="projects-modal-wrapper">
        <RolesField name={"role"} initialValue={userProps.role} />
        {showProjectsField && (
          <div>
            <ProjectField
              name={"editUserProjectIds"}
              shouldFetchProjects={role !== null}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditUser;
