import { useRef } from "react";
import { useGlobal } from "..";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteProject = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});

  return useMutation(
    ({ projectId }) => {
      argsRef.current = { projectId };
      return projectService.deleteProject({ projectId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery("getProjects", (projects) => {
            return {
              ...projects,
              data: projects.data.filter(
                (project) => project.id !== argsRef.current.projectId
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
