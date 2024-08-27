import React, {
  createContext,
  useContext as _useContext,
  useState,
} from "react";

import {
  useAddUser,
  useAddUsersToProject,
  useCreateProject,
  useUploadDocuments,
  useEditProjectStatus,
} from "../../hooks/mutations";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const [newUsers, setNewUsers] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [newProjectUsers, setNewProjectUsers] = useState([]);
  const [newDocuments, setNewDocuments] = useState([]);

  const addUser = useAddUser();
  const addUserToProject = useAddUsersToProject();
  const createProject = useCreateProject();
  const uploadDocument = useUploadDocuments();
  const editProjectStatus = useEditProjectStatus();

  const updateNewUsers = (newUser) => {
    setNewUsers((prev) => [newUser, ...prev]);
  };
  const updateNewProjects = (newProject) => {
    setNewProjects((prev) => [newProject, ...prev]);
  };
  const updateNewProjectUsers = (newProjectUsers) => {
    setNewProjectUsers((prev) => [newProjectUsers, ...prev].flat());
  };

  const updateNewDocuments = (newDocument) => {
    setNewDocuments((prev) => [newDocument, ...prev]);
  };

  return (
    <AdminContext.Provider
      value={{
        addUser,
        addUserToProject,
        createProject,
        uploadDocument,
        updateNewDocuments,
        updateNewProjectUsers,
        updateNewProjects,
        updateNewUsers,
        newUsers,
        newProjects,
        newProjectUsers,
        newDocuments,
        editProjectStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useContext = () => _useContext(AdminContext);

export default AdminProvider;
