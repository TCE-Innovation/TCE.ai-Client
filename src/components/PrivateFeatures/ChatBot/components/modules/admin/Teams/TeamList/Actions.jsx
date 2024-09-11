import React from "react";
import { TabContext } from "../../../../common";
import Actions from "../../Actions";
import { RemoveTeamModal } from "../Modals";

import { mutations } from "../../../../../hooks";

const TeamsTableActions = ({ ...teamProps }) => {
  const { mutate: deleteTeam, loading } = mutations.useDeleteTeam();
  return (
    <>
      <TabContext.Provider>
        {(tabProps) => {
          return (
            <Actions>
              <Actions.Delete
                disabled={loading}
                renderModal={(modalProps) => {
                  return (
                    <RemoveTeamModal
                      deleteTeam={deleteTeam}
                      {...modalProps}
                      {...teamProps}
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

export default TeamsTableActions;
