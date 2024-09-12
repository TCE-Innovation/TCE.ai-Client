import React from "react";
import { Loader, TabContext } from "../../../common";
import { RemoveUserModal, EditUserModal } from "./Modals";
import Actions from "../Actions";

import { mutations } from "../../../../hooks";

const UserTableActions = ({ ...userProps }) => {
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
              <Actions.Edit
                disabled={editUser.loading}
                renderModal={(modalProps) => {
                  return (
                    <EditUserModal
                      editUser={editUser}
                      {...modalProps}
                      {...userProps}
                    />
                  );
                }}
              />
              <Actions.Delete
                disabled={deleteUser.loading}
                renderModal={(modalProps) => {
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
