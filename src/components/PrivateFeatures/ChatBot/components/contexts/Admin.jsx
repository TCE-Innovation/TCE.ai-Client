import React, {
  createContext,
  useContext as _useContext,
  useState,
} from "react";

// import useGlobal from "../../hooks/useGlobal";

const AdminContext = createContext();

const _projects = [
  {
    name: "F Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "B Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Y Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
      {
        name: "user2",
        url: "",
      },
      {
        name: "user3",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "A Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "H Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "C Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "J Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
  {
    name: "Project name",
    assignedUsers: [
      {
        name: "user1",
        url: "",
      },
    ],
    documentCount: 20,
  },
];

const _users = Array.from({ length: 20 }, (_, i) => {
  const role = i % roles.length;
  return {
    name: `${i + 1} user name`,
    email: "user123@gmail.com",
    role,
    teamName: "Team name",
  };
});

const _documents = Array.from({ length: 20 }, (_, i) => {
  const date = new Date().setMonth(new Date().getMonth() - 2);
  return {
    name: `${i + 1} Document name`,
    uploadDate: new Date(new Date(date).setDate(i + 1)).toISOString(),
    size: "2 MB",
    documentType: "PDF",
  };
});

export const roles = ["Admin", "Project Manager", "User"];

const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(_projects);
  const [users, setUsers] = useState(_users);
  const [documents, setDocuments] = useState(_documents);

  return (
    <AdminContext.Provider
      value={{
        projects,
        users,
        documents,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useContext = () => _useContext(AdminContext);

export default AdminProvider;
