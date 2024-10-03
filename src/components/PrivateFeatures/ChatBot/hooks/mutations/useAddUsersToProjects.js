import { useRef } from "react";
import { useGlobal } from "..";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useAddUsersToProjects = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ projectIds, userIds }) => {
      argsRef.current = {
        projectIds,
        userIds,
      };
      return projectService.addUsersToProjects({ projectIds, userIds });
    },
    {
      onSuccess: (newData, { updateQuery, inValidate }) => {
        if (newData.success) {
          try {
            const { users } = newData.data;
            argsRef.current.projectIds?.forEach((projectId) => {
              updateQuery(
                ["getProjectUsers", { projectId }],
                (projectUsers) => {
                  return {
                    ...projectUsers,
                    data: [...users, ...projectUsers.data].flat(),
                  };
                }
              );
            });
            inValidate("getProjects");
            return createAlert({ message: newData.message, type: "success" });
          } catch (err) {
            console.error(err);
          }
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
