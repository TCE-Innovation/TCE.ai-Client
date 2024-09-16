import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SettingsIcon } from "../../../icons";
import { queries, useAuth } from "../../../../hooks";
import { isAdminUser } from "../../../../utils/auth";

const AdminButton = () => {
  const { userEmail = null } = useAuth();
  const navigate = useNavigate();
  const { data, loading } = queries.useGetUsersQuery();

  const showAdminButton = useMemo(() => {
    if (!data) return null;
    return isAdminUser(data.data, userEmail);
  }, [data, userEmail]);

  if (loading || !showAdminButton) return null;

  return (
    <button
      onClick={() => {
        navigate({
          search: new URLSearchParams({ admin: true }).toString(),
        });
      }}
      className="chat-button chatbot-admin-button d-flex gap-2 align-items-center p-3"
    >
      <span>
        <SettingsIcon />
      </span>
      <span>Chatbot Admin</span>
    </button>
  );
};

export default AdminButton;
