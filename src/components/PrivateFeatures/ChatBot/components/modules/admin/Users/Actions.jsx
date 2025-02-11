import React from "react";
import { Loader, TabContext } from "../../../common";
import { RemoveUserModal, EditUserModal } from "./Modals";
import Actions from "../Actions";

import { mutations } from "../../../../hooks";

import { permissionService } from "../../../../services";

const UserTableActions = ({ ...userProps }) => {
  const hasDeletePermission = permissionService.getUserPermission(
    permissionService.permission.DELETE
  );
  const hasEditPermission = permissionService.getUserPermission(
    permissionService.permission.UPDATE
  );
  const deleteUser = mutations.useDeleteUser();
  const editUser = mutations.useEditUser();

  if (deleteUser.loading || editUser.loading)
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
              {hasEditPermission && (
                <Actions.Edit
                  disabled={editUser.loading}
                  renderModal={(modalProps) => {
                    if (modalProps.show) {
                      return (
                        <EditUserModal
                          editUser={editUser}
                          {...modalProps}
                          {...userProps}
                        />
                      );
                    } else return null;
                  }}
                />
              )}
              {hasDeletePermission && (
                <Actions.Delete
                  disabled={deleteUser.loading}
                  renderModal={(modalProps) => {
                    if (modalProps.show) {
                      return (
                        <RemoveUserModal
                          {...modalProps}
                          {...userProps}
                          deleteUser={deleteUser}
                        />
                      );
                    }
                    return null;
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
