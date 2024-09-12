import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteUserFromTeam = () => {
  const argsRef = useRef({});
  const { createAlert } = useGlobal();
  return useMutation(
    ({ userId, teamId }) => {
      argsRef.current = { userId };
      return teamService.deleteUserFromTeam({ userId, teamId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery("getTeams", (teams) => {
            return {
              ...teams,
              data: teams.data.map((team) => {
                if (team.id !== argsRef.current.teamId) {
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
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
