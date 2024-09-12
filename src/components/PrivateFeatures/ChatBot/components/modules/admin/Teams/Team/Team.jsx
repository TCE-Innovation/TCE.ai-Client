import React from "react";

import SearchComponent from "../../Search";
import AddNew from "../../AddNew";

// import FormContext from "../../../../contexts/FormContext";

import TeamUsers from "./TeamUsers";

const Team = () => {
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
            {/* <SearchComponent placeholder={"Search a user"} name="userSearch" /> */}
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
          <TeamUsers />
        </div>
      </div>
    </>
  );
};

export default Team;
