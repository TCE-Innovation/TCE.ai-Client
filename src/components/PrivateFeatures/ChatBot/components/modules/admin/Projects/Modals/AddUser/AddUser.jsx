import React, { useMemo } from "react";
import { Modal } from "../../../../../common";
import { SearchField } from "../../../../../common/field";

import { useAdmin, queries } from "../../../../../../hooks";

import {
  useContext,
  useFieldValue,
} from "../../../../../../components/contexts/FormContext";

const { useGetUnlistedUsersQuery, useGetProjectsQuery } = queries;

const AddUser = ({ show, onClose }) => {
  const { addUserToProjects } = useAdmin();
  const { mutate, loading: isSubmitting } = addUserToProjects;
  const { value: projectId } = useFieldValue("projectId");
  const { error, setError: setUserIdError } = useFieldValue("userIds");
  const { data, loading: loadingUsers } = useGetUnlistedUsersQuery(
    { projectId },
    { disableRunOnMount: projectId === null }
  );
  const { data: projects } = useGetProjectsQuery({
    disableRunOnMount: projectId === null,
  });
  const { submitHandler } = useContext();

  const users = useMemo(() => {
    if (!data) return [];
    const { data: usersList } = data;
    return usersList.map((user) => {
      return {
        ...user,
        label: user.name ? `${user.name} (${user.email})` : user.email,
      };
    });
  }, [data]);

  const handleSubmit = (values) => {
    if (isSubmitting) return;
    if (!values.userIds?.length) {
      return setUserIdError("At least one user should be selected!");
    }
    mutate({ projectIds: [values.projectId], userIds: values.userIds });
    onClose();
  };

  const project = useMemo(() => {
    if (!projects) return null;
    return projects.data.find(
      (project) => project.id.toString() === projectId.toString()
    );
  }, [projects, projectId]);

  if (!show) return null;

  return (
    <Modal
      onCancel={onClose}
      title={`Add User to Project ${project?.name ? `"${project.name}"` : ""}`}
      buttonLabels={{
        submit: "Add User",
      }}
      isDisabled={error !== null}
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
        <form>
          <div>
            <SearchField
              name={"userIds"}
              extractor={(item) => ({ label: item.label, value: item.id })}
              placeholder={"Select users"}
              searchItems={users}
              loading={loadingUsers}
              onChange={() => setUserIdError(null)}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddUser;
