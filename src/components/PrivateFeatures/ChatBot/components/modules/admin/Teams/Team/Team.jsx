import React from "react";

import { TabContext } from "../../../../common";

import TeamUsers from "./TeamUsers";
import TeamStats from "./TeamStatistics";
import { PROFILES } from "../../../../../constants/admin";

import AdminGuard from "../../../../auth/Admin";
import { permissionService } from "../../../../../services";

const Team = () => {
  const hasTeamUserReadPermission = permissionService.getTeamUserPermission(
    permissionService.permission.READ
  );
  const hasTeamStatsReadPermission = permissionService.getTeamStatisticsPermission(
    permissionService.permission.READ
  );

  const tabs = [
    hasTeamUserReadPermission && {
      title: "Users list",
      pane: TeamUsers,
      value: PROFILES.TEAM_USERS,
    },
    hasTeamStatsReadPermission && {
      title: "Team Statistics",
      pane: TeamStats,
      value: PROFILES.TEAM_STATS,
    },
  ].filter(Boolean);

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
              return (
                <AdminGuard key={i}>
                  <Component />
                </AdminGuard>
              );
            })}
          </TabContext.Panes>
        </div>
      </TabContext>
    </div>
  );
};

export default Team;
