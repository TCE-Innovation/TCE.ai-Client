import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteUserFromTeam = () => {
  const argsRef = useRef({});
  const { createAlert } = useGlobal();
  return useMutation(
    ({ userId, teamId }) => {
      argsRef.current = { userId, teamId };
      return teamService.deleteUserFromTeam({ userId, teamId });
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
                    users: teams.data.users.filter(
                      (user) => user.id !== argsRef.current.userId
                    ),
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
                      users: team.users.filter(
                        (user) => user.id !== argsRef.current.userId
                      ),
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
