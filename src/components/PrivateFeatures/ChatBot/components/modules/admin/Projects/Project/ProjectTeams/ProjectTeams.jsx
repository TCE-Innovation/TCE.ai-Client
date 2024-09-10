import React, { useMemo } from "react";

import ProjectTeamsTable from "./Table";

import { filterByPatternsFactory } from "../../../../../../utils/form";
import { generateTeams } from "../../../../../../utils/data";
import { useFieldValue } from "../../../../../contexts/FormContext";

// placeholders
const results = generateTeams();

const ProjectTeams = () => {
  const { value: search } = useFieldValue("teamSearch");

  const rows = useMemo(() => {
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(search, "teamName");
      return filterByNameAndEmail(results);
    }
    return results;
  }, [search]);

  return (
    <>
      <ProjectTeamsTable rows={rows} isLoading={false} />
    </>
  );
};

export default ProjectTeams;
