import React, {
  createContext,
  useContext as _useContext,
  useState,
  useEffect,
} from "react";

import {
  useAddUser,
  useAddUsersToProjects,
  useCreateProject,
  useUploadDocuments,
  useEditProjectStatus,
  useCreateTeam,
  useAddUserToTeam,
  useAddTeamsToProject,
} from "../../hooks/mutations";

import { useGetUsersQuery } from "../../hooks/queries";

import { getUserDetails } from "../../utils/auth";
import { useAuth } from "../../hooks";

import { permissionService } from "../../services";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const { userEmail = null } = useAuth();
  const { data: users, loading: loadingUsers } = useGetUsersQuery();
  const [newUsers, setNewUsers] = useState([]);
  const [newProjects, setNewProjects] = useState([]);
  const [newProjectUsers, setNewProjectUsers] = useState([]);
  const [newDocuments, setNewDocuments] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const addUser = useAddUser();
  const addUserToProjects = useAddUsersToProjects();
  const createProject = useCreateProject();
  const uploadDocument = useUploadDocuments();
  const editProjectStatus = useEditProjectStatus();
  const createTeamObject = useCreateTeam();
  const addUserToTeamObject = useAddUserToTeam();
  const addTeamsToProjectObject = useAddTeamsToProject();

  useEffect(() => {
    permissionService.updateUser(userDetails);
  }, [userDetails]);

  useEffect(() => {
    if (!users || loadingUsers) return;
    setUserDetails(getUserDetails(users.data, userEmail));
  }, [users, userEmail, loadingUsers]);

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
        userDetails,
        addUser,
        addUserToProjects,
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
        createTeamObject,
        addUserToTeamObject,
        addTeamsToProjectObject,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useContext = () => _useContext(AdminContext);

export default AdminProvider;
