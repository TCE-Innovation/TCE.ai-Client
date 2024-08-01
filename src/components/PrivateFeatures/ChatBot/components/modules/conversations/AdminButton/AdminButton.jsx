import React from "react";
import { useNavigate } from "react-router-dom";
import { SettingsIcon } from "../../../icons";

const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate({
          search: new URLSearchParams({ admin: true }).toString(),
        });
      }}
      className="chatbot-admin-button d-flex gap-2 align-items-center bg-white rounded p-3"
    >
      <span>
        <SettingsIcon />
      </span>
      <span>Chatbot Admin</span>
    </div>
  );
};

export default AdminButton;
