import React, {
  createContext,
  useContext as _useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { getAccessToken, getUserProfilePic } from "../../utils/auth";

import { genRandomId } from "../../utils/uuid";
import useStorage from "../../hooks/useStorage";

const GlobalContext = createContext();

export const useContext = () => _useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [userProfileUrl, setUserProfileUrl] = useState("");

  const [conversationsCollapsed, setIsConversationsCollapsed] = useStorage(
    "CHATBOT-SIDEBAR-STATE",
    false
  );

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      const url = await getUserProfilePic(token);
      setUserProfileUrl(url);
    })();
  }, []);

  const createAlert = useCallback(({ message, type }) => {
    if (!message) return;
    setAlerts((prev) => [...prev, { message, type, id: genRandomId() }]);
  }, []);

  const handleRemoveAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        createAlert,
        alerts,
        userProfileUrl,
        handleRemoveAlert,
        conversationsCollapsed,
        setIsConversationsCollapsed,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
