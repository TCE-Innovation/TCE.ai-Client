import React, { useState } from "react";
import { DeleteIcon, EditIcon, DownloadIcon } from "../../icons";

const Actions = ({ children }) => {
  return (
    <div className="admin-actions d-flex align-items-center gap-2">
      {children}
    </div>
  );
};

const DeleteAction = ({ renderModal }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <span className="action-button tooltip-container">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
        >
          <DeleteIcon />
        </span>
        <div className="tooltip align-bottom tooltip-dark">Remove</div>
      </span>
      {renderModal({
        show: showDeleteModal,
        onClose: () => setShowDeleteModal(false),
      })}
    </>
  );
};

const EditAction = ({ renderModal }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <span className="action-button tooltip-container">
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowEditModal(true);
          }}
        >
          <EditIcon />
        </span>
        <div className="tooltip align-bottom tooltip-dark">Edit</div>
      </span>
      {renderModal({
        show: showEditModal,
        onClose: () => setShowEditModal(false),
      })}
    </>
  );
};

const DownLoadAction = ({ handleDownload }) => {
  return (
    <>
      <span className="action-button tooltip-container">
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
        >
          <DownloadIcon />
        </span>
        <div className="tooltip align-bottom tooltip-dark">Download</div>
      </span>
    </>
  );
};

Actions.Delete = DeleteAction;
Actions.Edit = EditAction;
Actions.DownLoad = DownLoadAction;

export default Actions;
