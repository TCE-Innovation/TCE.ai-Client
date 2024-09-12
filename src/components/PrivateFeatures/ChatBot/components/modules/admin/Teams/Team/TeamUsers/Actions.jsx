import React from "react";
import { TabContext } from "../../../../../common";
import { RemoveTeamUserModal } from "../../Modals";
import Actions from "../../../Actions";

import { mutations } from "../../../../../../hooks";

const TeamUsersTableActions = ({ ...userProps }) => {
  const removeUser = mutations.useDeleteUserFromTeam();
  return (
    <>
      <TabContext.Provider>
        {(props) => {
          return (
            <Actions>
              <Actions.Delete
                renderModal={(modalProps) => {
                  return (
                    <RemoveTeamUserModal
                      removeUser={removeUser}
                      {...modalProps}
                      {...userProps}
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

export default TeamUsersTableActions;
