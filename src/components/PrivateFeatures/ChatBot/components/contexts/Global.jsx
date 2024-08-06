import React, {
  createContext,
  useContext as _useContext,
  useState,
  useCallback,
} from "react";

import { genRandomId } from "../../utils/uuid";
import useStorage from "../../hooks/useStorage";
import useAuth from "../../hooks/useAuth";
import { useQueryParam } from "../../hooks";

const GlobalContext = createContext();

export const useContext = () => _useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const { userPic } = useAuth();
  const query = useQueryParam();

  const [conversationsCollapsed, setIsConversationsCollapsed] = useStorage(
    "CHATBOT-SIDEBAR-STATE",
    false
  );

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
        query,
        userProfileUrl: userPic,
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
