import React from "react";
import { Loader, TabContext } from "../../../../../common";
import Actions from "../../../Actions";
import { RemoveTeamFromProjectModal } from "../../Modals";
import { mutations } from "../../../../../../hooks";

const ProjectTeamsTableActions = ({ ...teamProps }) => {
  const deleteTeams = mutations.useDeleteTeamsFromProject();
  if (deleteTeams.loading) {
    return (
      <div className="position-relative" style={{ width: "2.5em" }}>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <TabContext.Provider>
        {(tabProps) => {
          return (
            <Actions>
              <Actions.Delete
                disabled={deleteTeams.loading}
                renderModal={(modalProps) => {
                  return (
                    <RemoveTeamFromProjectModal
                      deleteTeams={deleteTeams}
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

export default ProjectTeamsTableActions;
