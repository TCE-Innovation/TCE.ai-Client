import React from "react";
import { Loader, TabContext } from "../../../common";
import { PROFILES } from "../../../../constants/admin";
import { RemoveUserFromProjectModal } from "../Projects/Modals";
import { RemoveUserModal } from "./Modals";
import Actions from "../Actions";

import { mutations } from "../../../../hooks";

const UserTableActions = ({ ...userProps }) => {
  const removeUserFromProject = mutations.useRemoveUser();
  const deleteUser = mutations.useDeleteUser();
  if (removeUserFromProject.loading || deleteUser.loading)
    return (
      <div className="position-relative" style={{ width: "2.5em" }}>
        <Loader />
      </div>
    );
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
                disabled={
                  isProjectUsers
                    ? removeUserFromProject.loading
                    : deleteUser.loading
                }
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
