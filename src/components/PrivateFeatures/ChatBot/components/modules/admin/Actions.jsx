import React, { useState } from "react";
import { DeleteIcon, EditIcon, DownloadIcon } from "../../icons";

const Actions = ({ children }) => {
  return (
    <div className="admin-actions d-flex align-items-center gap-2">
      {children}
    </div>
  );
};

const DeleteAction = ({ renderModal, disabled = false }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <span
        className={`action-button tooltip-container ${
          disabled ? "disabled" : ""
        }`}
      >
        <span
          onClick={(e) => {
            if (disabled) return;
            e.stopPropagation();
            setShowDeleteModal(true);
          }}
        >
          <DeleteIcon />
        </span>
        {!disabled && (
          <div className="tooltip align-bottom tooltip-dark">Remove</div>
        )}
      </span>
      {renderModal({
        show: showDeleteModal,
        onClose: () => setShowDeleteModal(false),
      })}
    </>
  );
};

const EditAction = ({ renderModal, disabled = false }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <span
        className={`action-button tooltip-container ${
          disabled ? "disabled" : ""
        }`}
      >
        <span
          onClick={(e) => {
            if (disabled) return;
            e.stopPropagation();
            setShowEditModal(true);
          }}
        >
          <EditIcon />
        </span>
        {!disabled && (
          <div className="tooltip align-bottom tooltip-dark">Edit</div>
        )}
      </span>
      {renderModal({
        show: showEditModal,
        onClose: () => setShowEditModal(false),
      })}
    </>
  );
};

const DownLoadAction = ({ handleDownload, disabled = false }) => {
  return (
    <>
      <span
        className={`action-button tooltip-container ${
          disabled ? "disabled" : ""
        }`}
      >
        <span
          onClick={(e) => {
            if(disabled) return;
            e.stopPropagation();
            handleDownload();
          }}
        >
          <DownloadIcon />
        </span>
        {!disabled && (
          <div className="tooltip align-bottom tooltip-dark">Download</div>
        )}
      </span>
    </>
  );
};

Actions.Delete = DeleteAction;
Actions.Edit = EditAction;
Actions.DownLoad = DownLoadAction;

export default Actions;
