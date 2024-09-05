import React, { useState } from "react";

import { AddIcon } from "../../icons";

import {
  AddProjectModal,
  AddUserToProjectModal,
  AddDocumentToProjectModal,
} from "./Projects/Modals";
import { AddUserModal } from "./Users/Modals";
import { AddDocumentModal } from "./Documents/Modals";
import { CreateTeamModal, AddUserToTeamModal } from "./Teams/Modals";

import { useGlobal } from "../../../hooks";

const AddNew = () => {
  const { query } = useGlobal();
  const { profile, project_id, team_id } = query.params;

  return (
    <div>
      {profile === "projects" ? (
        !project_id ? (
          <AddNewProject />
        ) : null
      ) : profile === "users" ? (
        <AddNewUser />
      ) : profile === "documents" ? (
        <AddNewDocument />
      ) : profile === "teams" ? (
        !team_id ? (
          <CreateNewTeam />
        ) : null
      ) : (
        <AddNewProject />
      )}
    </div>
  );
};

const CreateNewTeam = () => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowCreateTeamModal(true)}
      >
        <AddIcon />
        <span>Create New Team</span>
      </button>
      <CreateTeamModal
        show={showCreateTeamModal}
        onClose={() => setShowCreateTeamModal(false)}
      />
    </>
  );
};
const AddUserToTeam = () => {
  const [showAddUserToTeamModal, setShowAddUserToTeamModal] = useState(false);
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddUserToTeamModal(true)}
      >
        <AddIcon />
        <span>Add User To Team</span>
      </button>
      <AddUserToTeamModal
        show={showAddUserToTeamModal}
        onClose={() => setShowAddUserToTeamModal(false)}
      />
    </>
  );
};

const AddNewProject = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddProjectModal(true)}
      >
        <AddIcon />
        <span>Add New Project</span>
      </button>
      <AddProjectModal
        show={showAddProjectModal}
        onClose={() => setShowAddProjectModal(false)}
      />
    </>
  );
};
const AddNewUser = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddUserModal(true)}
      >
        <AddIcon />
        <span>Add New User</span>
      </button>
      <AddUserModal
        show={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </>
  );
};

const AddUserToProject = () => {
  const [showAddUserToProjectModal, setShowAddUserToProjectModal] = useState(
    false
  );
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddUserToProjectModal(true)}
      >
        <AddIcon />
        <span>Add New User</span>
      </button>
      {showAddUserToProjectModal && (
        <AddUserToProjectModal
          show={true}
          onClose={() => setShowAddUserToProjectModal(false)}
        />
      )}
    </>
  );
};
const AddDocumentToProject = () => {
  const [
    showAddDocumentToProjectModal,
    setShowAddDocumentToProjectModal,
  ] = useState(false);
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddDocumentToProjectModal(true)}
      >
        <AddIcon />
        <span>Add New Document</span>
      </button>
      {showAddDocumentToProjectModal && (
        <AddDocumentToProjectModal
          show={true}
          onClose={() => setShowAddDocumentToProjectModal(false)}
        />
      )}
    </>
  );
};

const AddNewDocument = () => {
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddDocumentModal(true)}
      >
        <AddIcon />
        <span>Add New Document</span>
      </button>
      <AddDocumentModal
        show={showAddDocumentModal}
        onClose={() => setShowAddDocumentModal(false)}
      />
    </>
  );
};

AddNew.Project = AddNewProject;
AddNew.User = AddNewUser;
AddNew.Document = AddNewDocument;
AddNew.UserToProject = AddUserToProject;
AddNew.DocumentToProject = AddDocumentToProject;
AddNew.Team = CreateNewTeam;
AddNew.UserToTeam = AddUserToTeam;

export default AddNew;
