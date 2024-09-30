import React, { useMemo } from "react";

import SearchComponent from "../../Search";

import TeamsTable from "./Table";

import { filterByPatternsFactory } from "../../../../../utils/form";
import { useFieldValue } from "../../../../contexts/FormContext";

import { queries } from "../../../../../hooks";

import AdminGuard from "../../../../auth/Admin";

const TeamList = () => {
  const { value: search } = useFieldValue("teamsSearch");
  const { data, loading } = queries.useGetTeamsQuery();

  const rows = useMemo(() => {
    if (!data) return [];
    const teams = data.data.map((team) => ({
      ...team,
      users: team.users.map((user) => ({ ...user, id: user, url: user.image_url })),
    }));
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(search, "teamName");
      return filterByNameAndEmail(teams);
    }
    return teams;
  }, [data, search]);

  return (
    <AdminGuard>
      <div style={{ width: "350px" }} className="mb-3">
        <SearchComponent name="teamsSearch" placeholder={"Search a team"} />
      </div>
      <TeamsTable rows={rows} isLoading={loading} />
    </AdminGuard>
  );
};

export default TeamList;
