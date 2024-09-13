import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useAddUserToTeam = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ teamId, userId, userDetails }) => {
      argsRef.current = {
        teamId,
        userId,
        userDetails,
      };
      return teamService.addUserToTeam({ teamId, userId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          try {
            updateQuery(
              ["getTeamUsers", { teamId: argsRef.current.teamId }],
              (teams) => {
                return {
                  ...teams,
                  data: {
                    ...teams.data,
                    users: [
                      {
                        ...argsRef.current.userDetails,
                      },
                      ...teams.data.users,
                    ],
                  },
                };
              }
            );
            updateQuery("getTeams", (teams) => {
              return {
                ...teams,
                data: teams.data.map((team) => {
                  if (team.id === argsRef.current.teamId) {
                    return {
                      ...team,
                      users: [
                        { ...argsRef.current.userDetails, url: "" },
                        ...team.users,
                      ],
                    };
                  }
                  return team;
                }),
              };
            });
            return createAlert({ message: newData.message, type: "success" });
          } catch (error) {
            return console.error(error);
          }
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
