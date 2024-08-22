import { useRef } from "react";
import { useGlobal } from "..";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useAddUsersToProject = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ projectId, userIds }) => {
      argsRef.current = {
        projectId,
        userIds,
      };
      return projectService.addUsersToProject({ projectId, userIds });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const { users } = newData.data;
          updateQuery(
            ["getProjectUsers", { projectId: argsRef.current.projectId }],
            (projectUsers) => {
              return {
                ...projectUsers,
                data: [...users, ...projectUsers.data].flat(),
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
