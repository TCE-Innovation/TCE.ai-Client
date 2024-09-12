import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useAddUserToTeam = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ teamId, userId }) => {
      argsRef.current = {
        teamId,
        userId,
      };
      return teamService.addUserToTeam({ teamId, userId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const { user } = newData.data;
          updateQuery("getTeams", (teams) => {
            return {
              ...teams,
              data: teams.data.map((team) => {
                if (team.id === argsRef.current.teamId) {
                  return {
                    ...team,
                    users: [user, ...team.users],
                  };
                }
                return team;
              }),
            };
          });
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
