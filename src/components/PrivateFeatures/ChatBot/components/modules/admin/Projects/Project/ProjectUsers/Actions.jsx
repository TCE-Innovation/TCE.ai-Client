import React from "react";
import { Loader, TabContext } from "../../../../../common";
import { RemoveUserFromProjectModal } from "../../Modals";
import Actions from "../../../Actions";

import { mutations } from "../../../../../../hooks";
import { permissionService } from "../../../../../../services";
import { PERMISSIONS } from "../../../../../../constants/permissions";

const UserTableActions = ({ ...userProps }) => {
  const hasDeletePermission = permissionService.getProjectUserPermission(
    PERMISSIONS.DELETE
  );
  const removeUserFromProject = mutations.useRemoveUser();
  if (removeUserFromProject.loading)
    return (
      <div className="position-relative" style={{ width: "2.5em" }}>
        <Loader />
      </div>
    );
  return (
    <>
      <TabContext.Provider>
        {(props) => {
          return (
            <Actions>
              {hasDeletePermission && (
                <Actions.Delete
                  disabled={removeUserFromProject.loading}
                  renderModal={(modalProps) => {
                    return (
                      <RemoveUserFromProjectModal
                        {...modalProps}
                        {...userProps}
                        removeUserFromProject={removeUserFromProject}
                      />
                    );
                  }}
                />
              )}
            </Actions>
          );
        }}
      </TabContext.Provider>
    </>
  );
};

export default UserTableActions;
