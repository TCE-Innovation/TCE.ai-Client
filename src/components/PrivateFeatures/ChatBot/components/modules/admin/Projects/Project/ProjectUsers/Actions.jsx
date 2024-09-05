import React from "react";
import { Loader, TabContext } from "../../../../../common";
import { RemoveUserFromProjectModal } from "../../Modals";
import Actions from "../../../Actions";

import { mutations } from "../../../../../../hooks";

const UserTableActions = ({ ...userProps }) => {
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
            </Actions>
          );
        }}
      </TabContext.Provider>
    </>
  );
};

export default UserTableActions;
