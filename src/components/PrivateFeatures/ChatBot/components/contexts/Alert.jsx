import React, {
  createContext,
  useContext as _useContext,
  useState,
} from "react";

import { genRandomId } from "../../utils/uuid";

const AlertContext = createContext();

export const useContext = () => _useContext(AlertContext);

const AlertContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const createAlert = ({ message, type }) => {
    if (!message) return;
    setAlerts((prev) => [...prev, { message, type, id: genRandomId() }]);
  };

  const handleRemoveAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ createAlert, alerts, handleRemoveAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
