import React, {
  createContext,
  useContext as _useContext,
  // useState,
} from "react";

// import { projectService, userService, documentService } from "../../services";

// import useGlobal from "../../hooks/useGlobal";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  // const { createAlert } = useGlobal();
  // const [loadingProjects, setLoadingProjects] = useState(false);
  // const [loadingUsers, setLoadingUsers] = useState(false);
  // const [projects, setProjects] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [documents, setDocuments] = useState([]);

  // const getProjects = async () => {
  //   setLoadingProjects(true);
  //   const { data: _projects } = await projectService.getProjects();
  //   console.log({ _projects });
  //   setProjects(_projects);
  //   setLoadingProjects(false);
  // };

  // const getUsers = async () => {
  //   setLoadingUsers(true);
  //   const { data: _users } = await userService.getUsers();
  //   console.log({ _users });
  //   setUsers(_users);
  //   setLoadingUsers(false);
  // };

  // const getProjectDocuments = async ({ projectId }) => {
  //   const { data: _documents } = await documentService.getDocuments({
  //     projectId,
  //   });
  //   setDocuments(_documents);
  // };

  // const editProject = async ({ projectId, projectName }) => {
  //   await projectService.editProject({ projectId, name: projectName });
  // };

  // const addUserToProject = ({ projectId, userId }) => {
  //   projectService.addUserToProject({ projectId, userId });
  // };

  // const getDocumentByProjectId = async ({ projectId }) => {
  //   await documentService.getDocuments({ projectId });
  // };

  // const deleteDocumentFromProject = async ({ documentId, projectId }) => {
  //   const { message } = await documentService.deleteDocument({
  //     projectId,
  //     documentId,
  //   });
  //   createAlert({ message, type: "success" });
  // };

  // useEffect(() => {
  //   getProjects();
  //   getUsers();
  // }, []);

  return (
    <AdminContext.Provider
      value={
        {
          // getUsers,
          // getProjects,
          // projects,
          // loadingProjects,
          // loadingUsers,
          // users,
          // documents,
          // editProject,
          // addUserToProject,
          // deleteDocumentFromProject,
          // getDocumentByProjectId,
          // getProjectDocuments,
        }
      }
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useContext = () => _useContext(AdminContext);

export default AdminProvider;
