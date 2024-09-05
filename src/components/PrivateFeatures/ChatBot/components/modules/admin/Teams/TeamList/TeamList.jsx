import React, { useMemo } from "react";

import SearchComponent from "../../Search";

import TeamsTable from "./Table";

import { filterByPatternsFactory } from "../../../../../utils/form";
import { generateTeams } from "../../../../../utils/data";
import { useFieldValue } from "../../../../contexts/FormContext";

// placeholders
const results = generateTeams();

const TeamList = () => {
  const { value: search } = useFieldValue("search");

  const rows = useMemo(() => {
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(search, "teamName");
      return filterByNameAndEmail(results);
    }
    return results;
  }, [search]);

  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent placeholder={"Search a team"} />
      </div>
      <TeamsTable rows={rows} isLoading={false} />
    </>
  );
};

export default TeamList;
