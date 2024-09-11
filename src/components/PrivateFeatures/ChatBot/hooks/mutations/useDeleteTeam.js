import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteTeam = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ teamId }) => {
      argsRef.current = { teamId };
      return teamService.deleteTeam({ teamId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery("getTeams", (teams) => {
            return {
              ...teams,
              data: teams.data.filter(
                (team) => team.id !== argsRef.current.teamId
              ),
            };
          });
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
