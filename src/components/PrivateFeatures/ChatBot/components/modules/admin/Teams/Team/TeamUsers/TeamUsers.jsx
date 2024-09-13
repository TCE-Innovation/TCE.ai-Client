import React, { useMemo } from "react";

import TeamTable from "./Table";

import { filterByPatternsFactory } from "../../../../../../utils/form";
import { useFieldValue } from "../../../../../contexts/FormContext";

import { useGetTeamUsersQuery } from "../../../../../../hooks/queries";
import { useGlobal } from "../../../../../../hooks";

import SearchComponent from "../../../Search";
import AddNew from "../../../AddNew";

const Team = () => {
  const { value: search } = useFieldValue("teamUserSearch");
  const { query } = useGlobal();
  const { params } = query;
  const { team_id: teamId = null } = params;
  const { data, loading } = useGetTeamUsersQuery(
    { teamId },
    { disableRunOnMount: teamId === null }
  );

  const rows = useMemo(() => {
    if (!data) return [];
    const users = data.data?.users || [];
    if (search) {
      const filterByNameAndEmail = filterByPatternsFactory(
        search,
        "name",
        "email"
      );
      return filterByNameAndEmail(users);
    }
    return users;
  }, [data, search]);

  return (
    <>
      <div
        className="position-absolute"
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
          pointerEvents: "none",
        }}
      >
        <div className="d-flex align-items-center justify-content-end gap-4 cb-header-height-controller">
          <div style={{ width: "350px", pointerEvents: "all" }}>
            <SearchComponent
              placeholder={"Search a user"}
              name="teamUserSearch"
            />
          </div>
          <div style={{ pointerEvents: "all" }}>
            <AddNew.UserToTeam />
          </div>
        </div>
        <div style={{ pointerEvents: "all" }}>
          {/* <TeamUsers /> */}
          <TeamTable
            rows={rows}
            isLoading={loading}
            style={{
              height: "600px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Team;
