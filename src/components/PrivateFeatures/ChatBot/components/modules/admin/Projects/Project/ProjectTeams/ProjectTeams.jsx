import React, { useMemo } from "react";

import ProjectTeamsTable from "./Table";

import { filterByPatternsFactory } from "../../../../../../utils/form";
import { useFieldValue } from "../../../../../contexts/FormContext";

import { queries, useGlobal } from "../../../../../../hooks";

const ProjectTeams = () => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id: projectId = null } = params;
  const { data, loading } = queries.useGetTeamsByProjectQuery(
    { projectId },
    { disableRunOnMount: projectId === null }
  );
  const { value: search } = useFieldValue("teamSearch");

  const rows = useMemo(() => {
    if (!data) return [];
    const teams = data.data.teams.map((team) => ({ ...team, users: [] }));
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(search, "teamName");
      return filterByNameAndEmail(teams);
    }
    return teams;
  }, [data, search]);

  return (
    <>
      <ProjectTeamsTable rows={rows} isLoading={loading} />
    </>
  );
};

export default ProjectTeams;
