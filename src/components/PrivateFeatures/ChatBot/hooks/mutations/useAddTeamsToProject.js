import { useRef } from "react";
import { useGlobal } from "..";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useAddTeamsToProject = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ projectId, teamDetails }) => {
      const teamIds = teamDetails.map((team) => team.id);
      argsRef.current = {
        projectId,
        teamIds,
        teamDetails,
      };
      return teamService.addTeamsToUser({ projectId, teamIds });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery(
            ["getProjectTeams", { projectId: argsRef.current.projectId }],
            (projectTeams) => {
              return {
                ...projectTeams,
                data: {
                  ...projectTeams.data,
                  teams: [
                    ...argsRef.current.teamDetails,
                    ...projectTeams.data.teams,
                  ],
                },
              };
            }
          );
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
