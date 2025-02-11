import { useRef } from "react";
import { useGlobal } from "..";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useRemoveUser = () => {
  const argsRef = useRef({});
  const { createAlert } = useGlobal();

  return useMutation(
    ({ projectId, userId }) => {
      argsRef.current = {
        projectId,
        userId,
      };
      return projectService.removeUserFromProject({ projectId, userId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery(
            ["getProjectUsers", { projectId: argsRef.current.projectId }],
            (users) => {
              return {
                ...users,
                data: users.data.filter(
                  (user) => user.id !== argsRef.current.userId
                ),
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
