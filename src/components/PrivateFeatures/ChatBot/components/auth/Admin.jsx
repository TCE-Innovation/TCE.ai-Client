import React, { useEffect, useState } from "react";
import { queries, useAuth } from "../../hooks";
import { Loader } from "../../components/common";
import { isAdminUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

const REDIRECT_URL = "/private/chatbot";

const Admin = ({ children }) => {
  const [isValidUser, setIsValidUser] = useState(false);
  const { userEmail = null } = useAuth();
  const navigate = useNavigate();
  const { data, loading } = queries.useGetUsersQuery();

  useEffect(() => {
    if (!data || !userEmail) return;
    const isAuthorizedUser = isAdminUser(data.data, userEmail);
    setIsValidUser(isAuthorizedUser);
    if (!isAuthorizedUser) navigate(REDIRECT_URL, { replace: true });
    // eslint-disable-next-line
  }, [data, userEmail, loading]);

  if (loading || !isValidUser)
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <Loader size={8} color={"var(--chatbot-primary)"} />
      </div>
    );
  return <>{children}</>;
};

export default Admin;
