import React from "react";
import { TabContext } from "../../../../../common";
import Actions from "../../../Actions";
import { RemoveTeamFromProjectModal } from "../../Modals";

const ProjectTeamsTableActions = ({ ...teamProps }) => {
  return (
    <>
      <TabContext.Provider>
        {(tabProps) => {
          return (
            <Actions>
              <Actions.Delete
                renderModal={(modalProps) => {
                  return (
                    <RemoveTeamFromProjectModal
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
