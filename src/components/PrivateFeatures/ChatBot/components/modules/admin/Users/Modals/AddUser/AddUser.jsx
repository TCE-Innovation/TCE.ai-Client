import React, { useEffect } from "react";

import { Modal } from "../../../../../common";

import { useAdmin, queries, useGlobal } from "../../../../../../hooks";

import { useContext, useFieldValue } from "../../../../../contexts/FormContext";

import Form from "./Form";

const AddUser = ({ show, onClose }) => {
  const { addUser } = useAdmin();
  const { data: users, loading: loadingUsers } = queries.useGetUsersQuery();
  const { mutate, loading: isSubmitting, data: addedUser } = addUser;
  const { submitHandler, resetForm, isValid, setError } = useContext();
  const { value: projectIds } = useFieldValue("projectIds");
  const { publishToSubscribers, createAlert } = useGlobal();

  const handleSubmit = (values) => {
    if (isSubmitting || loadingUsers || !users.data) return;
    const name = values.name.trim();
    const isDuplicateUser = users.data.some(
      (user) => user.email.toLowerCase() === values.email.trim().toLowerCase()
    );
    if (isDuplicateUser) {
      return setError(
        "email",
        "User with this email already exists! Please use a different email."
      );
    }
    if (!values.role) {
      return setError("role", "Please select a user role!");
    }
    const userData = {
      role: values.role,
      email: values.email.trim(),
      name,
    };
    mutate({ userData });
    if (!values.projectIds.length) {
      resetForm();
      onClose();
    }
  };

  useEffect(() => {
    if (!addedUser || !projectIds.length) return;
    const user = addedUser.data.user;
    createAlert({
      message: "Adding projects...",
      type: "info",
    });
    publishToSubscribers(`add-user-to-projects-projectIds`, {
      userId: user.id,
      projectIds,
    });
    resetForm();
    onClose();
    // eslint-disable-next-line
  }, [addedUser, projectIds]);

  if (!show) return null;

  return (
    <Modal
      onCancel={onClose}
      title="Add New User"
      buttonLabels={{
        submit: "Add User",
      }}
      isDisabled={!isValid}
      isSubmitting={isSubmitting}
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
        <Form />
      </div>
    </Modal>
  );
};

export default AddUser;
