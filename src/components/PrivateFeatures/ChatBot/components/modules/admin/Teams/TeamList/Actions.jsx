import React from "react";
import { TabContext } from "../../../../common";
import Actions from "../../Actions";
import { RemoveTeamModal } from "../Modals";

const TeamsTableActions = ({ ...teamProps }) => {
  return (
    <>
      <TabContext.Provider>
        {(tabProps) => {
          return (
            <Actions>
              <Actions.Delete
                renderModal={(modalProps) => {
                  return <RemoveTeamModal {...modalProps} {...teamProps} />;
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
