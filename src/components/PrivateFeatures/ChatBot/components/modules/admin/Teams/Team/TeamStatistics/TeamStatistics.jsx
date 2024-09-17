import React from "react";
import { permissionService } from "../../../../../../services";

import Restricted from "../../../Restricted";

const TeamStatistics = () => {
  const hasTeamStatsReadPermission = permissionService.getTeamStatisticsPermission(
    permissionService.permission.READ
  );
  if (!hasTeamStatsReadPermission) return <Restricted />;
  return <div>todo: team statistics</div>;
};

export default TeamStatistics;
