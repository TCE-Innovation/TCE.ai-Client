import React, { useMemo } from "react";

import ProjectTeamsTable from "./Table";

import { filterByPatternsFactory } from "../../../../../../utils/form";
import { useFieldValue } from "../../../../../contexts/FormContext";

import { queries, useAdmin, useGlobal } from "../../../../../../hooks";
import { permissionService } from "../../../../../../services";
import Restricted from "../../../Restricted";

const ProjectTeams = () => {
  const hasProjectTeamReadPermission = permissionService.getProjectTeamPermission(
    permissionService.permission.READ
  );
  const { query } = useGlobal();
  const { addTeamsToProjectObject } = useAdmin();
  const { params } = query;
  const { project_id: projectId = null } = params;
  const { data, loading } = queries.useGetTeamsByProjectQuery(
    { projectId },
    { disableRunOnMount: projectId === null }
  );
  const { value: search } = useFieldValue("teamSearch");

  const rows = useMemo(() => {
    if (!data) return [];
    const teams = data.data.teams;
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(search, "teamName");
      return filterByNameAndEmail(teams);
    }
    return teams;
  }, [data, search]);

  if (!hasProjectTeamReadPermission) return <Restricted />;

  return (
    <>
      <ProjectTeamsTable
        rows={rows}
        isLoading={loading}
        insertingRow={addTeamsToProjectObject.loading}
      />
    </>
  );
};

export default ProjectTeams;
