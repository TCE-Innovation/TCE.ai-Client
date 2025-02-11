import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteTeamsFromProject = () => {
  const argsRef = useRef({});
  const { createAlert } = useGlobal();
  return useMutation(
    ({ projectId, teamIds }) => {
      argsRef.current = { projectId, teamIds };
      return teamService.deleteTeamsFromProject({ projectId, teamIds });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          try {
            updateQuery(
              ["getProjectTeams", { projectId: argsRef.current.projectId }],
              (teams) => {
                return {
                  ...teams,
                  data: {
                    ...teams.data,
                    teams: teams.data.teams.filter((team) => {
                      return !argsRef.current.teamIds.some(
                        (teamId) => team.id === teamId
                      );
                    }),
                  },
                };
              }
            );
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
