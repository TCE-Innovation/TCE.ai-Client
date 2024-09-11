import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { teamService } from "../../services";
import useMutation from "../useMutation";

export const useCreateTeam = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ name, userIds }) => {
      argsRef.current.name = name;
      return teamService.createTeam({ name, userIds });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const { teamId } = newData.data;
          updateQuery("getTeams", (teams) => {
            const newTeam = {
              id: teamId,
              name: argsRef.current.name,
            };
            return {
              ...teams,
              data: [newTeam, ...teams.data],
            };
          });
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
