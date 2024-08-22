import { useGlobal } from "../../hooks";
import { projectService } from "../../services";
import useMutation from "../useMutation";

export const useCreateProject = () => {
  const { createAlert } = useGlobal();

  return useMutation(({ name }) => projectService.createProject({ name }), {
    onSuccess: (newData, { updateQuery }) => {
      if (newData.success) {
        const { project } = newData.data;
        updateQuery("getProjects", (projects) => {
          return {
            ...projects,
            data: [project, ...projects.data],
          };
        });
        return createAlert({ message: newData.message, type: "success" });
      }
      createAlert({ message: newData.message, type: "danger" });
    },
  });
};
