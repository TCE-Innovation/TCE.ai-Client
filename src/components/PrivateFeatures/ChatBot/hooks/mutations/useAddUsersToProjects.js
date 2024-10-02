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
          inValidate("getProjects");
          argsRef.current.projectIds?.map((projectId) =>
            inValidate(["getProjectUsers", { projectId }])
          );
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
