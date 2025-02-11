import React, { useMemo } from "react";

import { Modal } from "../../../../../common";
import { SelectField } from "../../../../../common/field";
import {
  useGetTeamUsersQuery,
  useGetUsersQuery,
} from "../../../../../../hooks/queries";
import { useAdmin, useGlobal } from "../../../../../../hooks";
import { useContext } from "../../../../../contexts/FormContext";

const AddUserToTeam = ({ show, onClose }) => {
  const { data, loading } = useGetUsersQuery();
  const { addUserToTeamObject } = useAdmin();
  const { mutate: addUser, loading: isSubmitting } = addUserToTeamObject;

  const { query } = useGlobal();
  const { params } = query;
  const { team_id: teamId = null } = params;
  const {
    data: teamUsersData,
    loading: loadingTeamUsers,
  } = useGetTeamUsersQuery({ teamId }, { disableRunOnMount: teamId === null });

  const { submitHandler, isValid } = useContext();

  const users = useMemo(() => {
    if (!data | loading | loadingTeamUsers | !teamUsersData) return [];
    const users = data.data;
    const teamUsers = teamUsersData.data?.users || [];
    return users.filter(
      (user) => !teamUsers.some((teamUser) => teamUser.id === user.id)
    );
  }, [data, loading, loadingTeamUsers, teamUsersData]);

  if (!show) return null;

  const onSubmit = (values) => {
    if (isSubmitting) return;
    const userDetails = users.find((user) => user.id === values.userId);
    addUser({ teamId: values.teamId, userId: values.userId, userDetails });
    onClose();
  };

  return (
    <Modal
      onCancel={onClose}
      title="Add User To Team"
      buttonLabels={{
        submit: "Add User",
      }}
      isDisabled={!isValid || loadingTeamUsers || loading}
      isSubmitting={isSubmitting}
      onSubmit={submitHandler(onSubmit)}
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
        <div>
          <SelectField
            items={users}
            extractor={(item) => ({
              label: [item.name, item.email].filter(Boolean).join("-"),
              value: item.id,
            })}
            name={"userId"}
            search
            placeholder={"Select User"}
            loading={loading}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddUserToTeam;
