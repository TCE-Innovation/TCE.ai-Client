import React, { useMemo } from "react";

import { Modal } from "../../../../../common";
import { SelectField } from "../../../../../common/field";
import { useGetUsersQuery } from "../../../../../../hooks/queries";
import { mutations } from "../../../../../../hooks";
import { useContext } from "../../../../../contexts/FormContext";

const AddUserToTeam = ({ show, onClose }) => {
  const { data, loading } = useGetUsersQuery();
  const {
    mutate: addUser,
    loading: isSubmitting,
  } = mutations.useAddUserToTeam();

  const { submitHandler, isValid } = useContext();

  const users = useMemo(() => {
    if (!data) return [];
    return data.data;
  }, [data]);

  if (!show) return null;

  const onSubmit = (values) => {
    if (isSubmitting) return;
    addUser({ teamId: values.teamId, userId: values.userId });
  };

  return (
    <Modal
      onCancel={onClose}
      title="Add User To Team"
      buttonLabels={{
        submit: "Add User",
      }}
      isDisabled={!isValid}
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
            label="User name"
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
