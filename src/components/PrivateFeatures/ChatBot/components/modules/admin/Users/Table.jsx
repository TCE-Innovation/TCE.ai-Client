import React, { useMemo } from "react";

import TableContainer from "../TableContainer";
import SortButton from "../SortButton";
import { Avatar, Badge } from "../../../common";
import Actions from "../Actions";
import { RemoveUserModal } from "./Modals";
import { RemoveUserFromProjectModal } from "../Projects/Modals";

import { TabContext } from "../../../common";

import { PROFILES, ROLE_TO_COLORS } from "../../../../constants/admin";

const Table = ({ rows, ...props }) => {
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
              {name ? (
                <span>{name}</span>
              ) : (
                <span style={{ color: "var(--chatbot-grey)" }}>
                  not available
                </span>
              )}
            </div>
          );
        },
      },
      {
        title: "Email",
        key: "email",
        align: "end",
        width: "0",
        sort: true,
        renderSort: ({ handleSort, currentOrder }) => {
          return (
            <SortButton handleSort={handleSort} currentOrder={currentOrder} />
          );
        },
      },
      {
        title: "Role",
        align: "end",
        renderCell: ({ role }) => {
          const color = ROLE_TO_COLORS[role];
          return (
            <>
              <Badge label={role} accent={color} />
            </>
          );
        },
      },
      {
        title: "Actions",
        align: "end",
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
      <TableContainer columns={columns} rows={rows} {...props} />
    </>
  );
};

export default Table;
