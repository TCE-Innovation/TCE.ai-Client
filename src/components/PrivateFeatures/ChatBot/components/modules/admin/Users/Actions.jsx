import React from "react";
import { TabContext } from "../../../common";
import { PROFILES } from "../../../../constants/admin";
import { RemoveUserFromProjectModal } from "../Projects/Modals";
import { RemoveUserModal } from "./Modals";
import Actions from "../Actions";

import { mutations } from "../../../../hooks";

const UserTableActions = ({ ...userProps }) => {
  const removeUserFromProject = mutations.useRemoveUser();
  const deleteUser = mutations.useDeleteUser();
  return (
    <>
      <TabContext.Provider>
        {(props) => {
          const { activeTab, tabs } = props;
          const isProjectUsers =
            tabs[activeTab].value === PROFILES.PROJECT_USERS;
          return (
            <Actions>
              <Actions.Delete
                renderModal={(modalProps) => {
                  if (isProjectUsers)
                    return (
                      <RemoveUserFromProjectModal
                        {...modalProps}
                        {...userProps}
                        removeUserFromProject={removeUserFromProject}
                      />
                    );
                  return (
                    <RemoveUserModal
                      {...modalProps}
                      {...userProps}
                      deleteUser={deleteUser}
                    />
                  );
                }}
              />
            </Actions>
          );
        }}
      </TabContext.Provider>
    </>
  );
};

export default UserTableActions;
