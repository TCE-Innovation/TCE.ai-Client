import React, { useMemo } from "react";

import { Modal } from "../../../../../common";
import { SelectField } from "../../../../../common/field";
import { useGetUsersQuery } from "../../../../../../hooks/queries";
import { sleep } from "../../../../../../utils/misc";
import { useGlobal } from "../../../../../../hooks";

const AddUserToTeam = ({ show, onClose }) => {
  const { data, loading } = useGetUsersQuery();
  const { createAlert } = useGlobal();

  const users = useMemo(() => {
    if (!data) return [];
    return data.data;
  }, [data]);

  if (!show) return null;

  const handleSubmit = () => {
    sleep(1000).then(() =>
      createAlert({
        message: "user added to team successfully!",
        type: "success",
      })
    );
  };

  return (
    <Modal
      onCancel={onClose}
      title="Add User To Team"
      buttonLabels={{
        submit: "Add User",
      }}
      onSubmit={handleSubmit}
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
            name={"user"}
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
