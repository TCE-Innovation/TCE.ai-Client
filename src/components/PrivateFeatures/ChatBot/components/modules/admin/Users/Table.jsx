import React, { useMemo } from "react";

import TableContainer from "../TableContainer";
import SortButton from "../SortButton";
import { Avatar, Badge } from "../../../common";
import Actions from "../Actions";
import { RemoveUserModal } from "./Modals";
import { RemoveUserFromProjectModal } from "../Projects/Modals";

import { TabContext } from "../../../common";

import { PROFILES, ROLE_TO_COLORS } from "../../../../constants/admin";
import { getRoleById } from "../../../../utils/data";

const Table = ({ rows }) => {
  const columns = useMemo(
    () => [
      {
        title: "User name",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
        renderCell: ({ name, url }) => {
          const title = name[0]?.toUpperCase();
          return (
            <div className="d-flex gap-1 align-items-center">
              <Avatar title={title}>
                <img src={url} alt={name} />
              </Avatar>
              <span>{name}</span>
            </div>
          );
        },
      },
      {
        title: "Email",
        key: "email",
      },
      {
        title: "Role",
        renderCell: ({ role }) => {
          const label = getRoleById(role);
          const color = ROLE_TO_COLORS[label];
          return (
            <>
              <Badge label={label} accent={color} />
            </>
          );
        },
      },
      {
        title: "Team",
        renderCell: ({ teamName }) => {
          return <Badge accent={"yellow"} label={teamName} />;
        },
      },
      {
        title: "Actions",
        width: "0",
        renderCell: ({ name, email }) => {
          return (
            <TabContext.Provider>
              {(props) => {
                const { activeTab, tabs } = props;
                const isProjectUsers =
                  tabs[activeTab].value === PROFILES.PROJECT_USERS;
                return (
                  <Actions>
                    <Actions.Delete
                      renderModal={(props) => {
                        if (isProjectUsers)
                          return (
                            <RemoveUserFromProjectModal
                              {...props}
                              username={name}
                              email={email}
                            />
                          );
                        return (
                          <RemoveUserModal
                            {...props}
                            username={name}
                            email={email}
                          />
                        );
                      }}
                    />
                  </Actions>
                );
              }}
            </TabContext.Provider>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <TableContainer columns={columns} rows={rows} />
    </>
  );
};

export default Table;
