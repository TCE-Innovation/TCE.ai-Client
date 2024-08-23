import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useEditProject = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});
  return useMutation(
    ({ projectId, projectName }) => {
      argsRef.current = { projectId, projectName };
      return projectService.editProject({ projectId, name: projectName });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const { project: updatedProject } = newData.data;
          updateQuery("getProjects", (projects) => {
            return {
              ...projects,
              data: projects.data.map((project) => {
                if (project.id === argsRef.current.projectId) {
                  return {
                    ...project,
                    name: updatedProject.name,
                  };
                }
                return project;
              }),
            };
          });
          createAlert({ message: newData.message, type: "success" });
        }
      },
    }
  );
};
