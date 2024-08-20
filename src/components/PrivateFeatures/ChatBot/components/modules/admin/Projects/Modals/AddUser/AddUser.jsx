import React, { useMemo } from "react";
import { Overlay, Modal } from "../../../../../common";
import { MultiSelectField } from "../../../../../common/field";
import {
  useGetUsersQuery,
  useAddUsersToProject,
} from "../../../../../../hooks/useQueries";

import { useContext } from "../../../../../../components/contexts/FormContext";

const AddUser = ({ show, onClose }) => {
  const { mutate, loading: isSubmitting } = useAddUsersToProject();
  const { data, loading: loadingUsers } = useGetUsersQuery();
  const { submitHandler } = useContext();

  const users = useMemo(() => {
    if (!data) return [];
    const { data: usersList } = data;
    return usersList.map((user) => {
      const name = [user.first_name, user.last_name].filter(Boolean).join(" ");
      return {
        ...user,
        label: name ? `${name} (${user.email})` : user.email,
      };
    });
  }, [data]);

  const handleSubmit = (values) => {
    if(isSubmitting) return;
    console.log({ values });
    // mutate({ projectId: project_id, userIds: [] });
  };

  if (!show) return null;

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add User to Project"
        buttonLabels={{
          submit: "Add User",
        }}
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
              <MultiSelectField
                items={users}
                extractor={(item) => ({ label: item.label, value: item.id })}
                name={"user_ids"}
                placeholder={"Select user"}
                search={true}
                loading={loadingUsers}
              />
            </div>
          </form>
        </div>
      </Modal>
    </Overlay>
  );
};

export default AddUser;
