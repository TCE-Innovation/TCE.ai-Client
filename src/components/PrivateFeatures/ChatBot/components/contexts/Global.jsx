import React, {
  createContext,
  useContext as _useContext,
  useState,
  useCallback,
} from "react";

import { genRandomId } from "../../utils/uuid";
import useStorage from "../../hooks/useStorage";

const GlobalContext = createContext();

export const useContext = () => _useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

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
