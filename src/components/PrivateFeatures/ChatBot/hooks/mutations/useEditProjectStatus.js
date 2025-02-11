import { useRef } from "react";
import { useGlobal } from "../../hooks";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useEditProjectStatus = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});
  return useMutation(
    ({ projectId, projectIsLiveStatus }) => {
      argsRef.current = { projectId, projectIsLiveStatus };
      return projectService.editProjectStatus({
        projectId,
        isLive: projectIsLiveStatus,
      });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery("getProjects", (projects) => {
            return {
              ...projects,
              data: projects.data.map((project) => {
                if (project.id === argsRef.current.projectId) {
                  return {
                    ...project,
                    isLive: !project.isLive,
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
