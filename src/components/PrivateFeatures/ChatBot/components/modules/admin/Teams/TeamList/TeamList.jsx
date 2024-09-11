import React, { useMemo } from "react";

import SearchComponent from "../../Search";

import TeamsTable from "./Table";

import { filterByPatternsFactory } from "../../../../../utils/form";
// import { generateTeams } from "../../../../../utils/data";
import { useFieldValue } from "../../../../contexts/FormContext";

import { queries } from "../../../../../hooks";

// placeholders
// const results = generateTeams();

const TeamList = () => {
  const { value: search } = useFieldValue("search");
  const { data, loading } = queries.useGetTeamsQuery();

  const rows = useMemo(() => {
    if (!data) return [];
    const teams = data.data.map((team) => ({
      ...team,
      users: team.users.map((user) => ({ ...user, url: "" })),
    }));
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(search, "teamName");
      return filterByNameAndEmail(teams);
    }
    return teams;
  }, [data, search]);

  return (
    <>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent placeholder={"Search a team"} />
      </div>
      <TeamsTable rows={rows} isLoading={loading} />
    </>
  );
};

export default TeamList;
