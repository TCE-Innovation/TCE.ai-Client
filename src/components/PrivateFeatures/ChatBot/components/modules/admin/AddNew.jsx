import React, { useState } from "react";

import { AddIcon } from "../../icons";

import {
  AddProjectModal,
  AddUserToProjectModal,
  AddDocumentToProjectModal,
  AddTeamToProjectModal,
} from "./Projects/Modals";
import { AddUserModal } from "./Users/Modals";
import { AddDocumentModal } from "./Documents/Modals";
import { CreateTeamModal, AddUserToTeamModal } from "./Teams/Modals";

import { useGlobal } from "../../../hooks";
import { permissionService } from "../../../services";
import { PERMISSIONS } from "../../../constants/permissions";

const AddNew = () => {
  const { query } = useGlobal();
  const { profile, project_id, team_id } = query.params;

  return (
    <div>
      {!profile || profile === "projects" ? (
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
      {showCreateTeamModal && (
        <CreateTeamModal
          show={showCreateTeamModal}
          onClose={() => setShowCreateTeamModal(false)}
        />
      )}
    </>
  );
};
const AddUserToTeam = () => {
  const [showAddUserToTeamModal, setShowAddUserToTeamModal] = useState(false);
  const hasPermission = permissionService.getTeamUserPermission(
    PERMISSIONS.CREATE
  );

  if (!hasPermission) return null;

  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddUserToTeamModal(true)}
      >
        <AddIcon />
        <span>Add User To Team</span>
      </button>
      {showAddUserToTeamModal && (
        <AddUserToTeamModal
          show={showAddUserToTeamModal}
          onClose={() => setShowAddUserToTeamModal(false)}
        />
      )}
    </>
  );
};

const AddTeamToProject = () => {
  const [showAddTeamToProjectModal, setShowAddTeamToProjectModal] = useState(
    false
  );
  const hasPermission = permissionService.getProjectTeamPermission(
    PERMISSIONS.CREATE
  );
  if (!hasPermission) return null;
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddTeamToProjectModal(true)}
      >
        <AddIcon />
        <span>Add Team</span>
      </button>
      {showAddTeamToProjectModal && (
        <AddTeamToProjectModal
          show={showAddTeamToProjectModal}
          onClose={() => setShowAddTeamToProjectModal(false)}
        />
      )}
    </>
  );
};

const AddNewProject = () => {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const hasPermission = permissionService.getProjectPermission(
    PERMISSIONS.CREATE
  );
  if (!hasPermission) return null;
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddProjectModal(true)}
      >
        <AddIcon />
        <span>Add New Project</span>
      </button>
      {showAddProjectModal && (
        <AddProjectModal
          show={showAddProjectModal}
          onClose={() => setShowAddProjectModal(false)}
        />
      )}
    </>
  );
};
const AddNewUser = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const hasPermission = permissionService.getUserPermission(PERMISSIONS.CREATE);
  if (!hasPermission) return null;
  return (
    <>
      <button
        className="chat-button add-project-button d-flex align-items-center gap-2"
        onClick={() => setShowAddUserModal(true)}
      >
        <AddIcon />
        <span>Add New User</span>
      </button>
      {showAddUserModal && (
        <AddUserModal
          show={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
        />
      )}
    </>
  );
};

const AddUserToProject = () => {
  const [showAddUserToProjectModal, setShowAddUserToProjectModal] = useState(
    false
  );
  const hasPermission = permissionService.getProjectUserPermission(
    PERMISSIONS.CREATE
  );
  if (!hasPermission) return null;
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
          show={showAddUserToProjectModal}
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
  const hasPermission = permissionService.getProjectDocumentPermission(
    PERMISSIONS.UPLOAD
  );
  if (!hasPermission) return null;
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
          show={showAddDocumentToProjectModal}
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
      {showAddDocumentModal && (
        <AddDocumentModal
          show={showAddDocumentModal}
          onClose={() => setShowAddDocumentModal(false)}
        />
      )}
    </>
  );
};

AddNew.Project = AddNewProject;
AddNew.User = AddNewUser;
AddNew.Document = AddNewDocument;
AddNew.UserToProject = AddUserToProject;
AddNew.DocumentToProject = AddDocumentToProject;
AddNew.Team = CreateNewTeam;
AddNew.TeamToProject = AddTeamToProject;
AddNew.UserToTeam = AddUserToTeam;

export default AddNew;
