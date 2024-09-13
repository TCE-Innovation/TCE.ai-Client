import React from "react";

import { TabContext } from "../../../../common";

import TeamUsers from "./TeamUsers";
// import TeamStats from "./TeamStatistics";
import { PROFILES } from "../../../../../constants/admin";

const tabs = [
  {
    title: "Users list",
    pane: TeamUsers,
    value: PROFILES.TEAM_USERS,
  },
  // {
  //   title: "Team Statistics",
  //   pane: TeamStats,
  //   value: PROFILES.TEAM_STATS,
  // },
];

const Team = () => {
  return (
    <div className="position-relative">
      <TabContext tabs={tabs}>
        <div className="d-flex align-items-center">
          <TabContext.Tabs
            renderTab={({ tab }) => {
              return (
                <div className="d-flex align-items-center">
                  <span>{tab.title}</span>
                </div>
              );
            }}
          />
        </div>
        <div>
          <TabContext.Panes>
            {tabs.map((tab, i) => {
              const Component = tab.pane;
              return <Component key={i} />;
            })}
          </TabContext.Panes>
        </div>
      </TabContext>
    </div>
  );
};

export default Team;
