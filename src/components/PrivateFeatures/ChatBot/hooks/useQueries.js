import useQuery from "./useQuery";
import useMutation from "./useMutation";
import { projectService, userService, documentService } from "../services";

import { useGlobal } from "../hooks";

// project queries
export const useGetProjectsQuery = (options = {}) =>
  useQuery("getProjects", projectService.getProjects, options);

export const useGetProjectUsersQuery = ({ projectId }, options = {}) =>
  useQuery(
    ["getProjectUsers", projectId].join("."),
    () => projectService.getProjectUsers({ projectId }),
    options
  );

export const useCreateProject = () => {
  const { createAlert } = useGlobal();

  return useMutation(
    ({ name }) =>
      projectService.createProject({ name }),
    {
      onSuccess: (newData, { inValidate }) => {
        if (newData.success) {
          inValidate("getProjects");
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};

export const useRemoveUserFromProject = () => {
  const { createAlert } = useGlobal();

  return useMutation(
    ({ projectId, userId }) =>
      projectService.removeUserFromProject({ projectId, userId }),
    {
      onSuccess: (newData, { inValidate }) => {
        if (newData.success) {
          inValidate("getProjects");
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};

export const useEditProject = () => {
  const { createAlert } = useGlobal();
  return useMutation(
    ({ projectId, projectName }) => {
      projectService.editProject({ projectId, name: projectName });
    },
    {
      onSuccess: (newData) => {
        if (newData.success) {
          createAlert({ message: newData.message, type: "success" });
        }
      },
    }
  );
};

export const useDeleteProject = () => {
  const { createAlert } = useGlobal();

  return useMutation(
    ({ projectId }) => {
      projectService.deleteProject({ projectId });
    },
    {
      onSuccess: (newData, { inValidate }) => {
        if (newData.success) {
          inValidate("getProjects");
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};

export const useAddUserToProject = () => {
  const { createAlert } = useGlobal();

  return useMutation(
    ({ projectId, userId }) => {
      projectService.addUserToProject({ projectId, userId });
    },
    {
      onSuccess: (newData) => {
        if (newData.success) {
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};

export const useAddUsersToProject = () => {
  const { createAlert } = useGlobal();

  return useMutation(
    ({ projectId, userIds }) => {
      projectService.addUsersToProject({ projectId, userIds });
    },
    {
      onSuccess: (newData) => {
        if (newData.success) {
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};

//user queries
export const useGetUsersQuery = (options = {}) =>
  useQuery("getUsers", userService.getUsers, options);

export const useDeleteUserQuery = () => {
  const { createAlert } = useGlobal();
  return useMutation(({ userId }) => userService.deleteUser({ userId }), {
    onSuccess: (newData) => {
      if (newData.success) {
        return createAlert({ message: newData.message, type: "success" });
      }
      createAlert({ message: newData.message, type: "danger" });
    },
  });
};

export const useAddUser = () => {
  const { createAlert } = useGlobal();
  return useMutation(({ userData }) => userService.addUser({ userData }), {
    onSuccess: (newData) => {
      if (newData.success) {
        return createAlert({ message: newData.message, type: "success" });
      }
      createAlert({ message: newData.message, type: "danger" });
    },
  });
};

// document queries
export const useGetProjectDocuments = ({ projectId }, options = {}) =>
  useQuery(
    ["getProjectDocuments", projectId].join("."),
    () => documentService.getDocuments({ projectId }),
    options
  );

export const useUploadDocuments = () => {
  const { createAlert } = useGlobal();
  return useMutation(
    ({ projectId, formData }) =>
      documentService.getDocuments({ projectId, formData }),
    {
      onSuccess: (newData) => {
        if (newData.success) {
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};

export const useDeleteDocumentFromProject = () => {
  const { createAlert } = useGlobal();
  return useMutation(
    ({ documentId, projectId }) =>
      documentService.deleteDocument({ documentId, projectId }),
    {
      onSuccess: (newData) => {
        if (newData.success) {
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
