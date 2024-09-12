import React from "react";
import { Loader, TabContext } from "../../../../common";
import Actions from "../../Actions";
import { RemoveTeamModal } from "../Modals";

import { mutations } from "../../../../../hooks";

const TeamsTableActions = ({ ...teamProps }) => {
  const deleteTeam = mutations.useDeleteTeam();
  if (deleteTeam.loading)
    return (
      <div className="position-relative" style={{ width: "2.5em" }}>
        <Loader />
      </div>
    );
  return (
    <>
      <TabContext.Provider>
        {(tabProps) => {
          return (
            <Actions>
              <Actions.Delete
                disabled={deleteTeam.loading}
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
