import React from "react";
import { TabContext } from "../../../../../common";
import { RemoveTeamUserModal } from "../../Modals";
import Actions from "../../../Actions";

const TeamUsersTableActions = ({ ...userProps }) => {
  return (
    <>
      <TabContext.Provider>
        {(props) => {
          return (
            <Actions>
              <Actions.Delete
                renderModal={(modalProps) => {
                  return <RemoveTeamUserModal {...modalProps} {...userProps} />;
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
