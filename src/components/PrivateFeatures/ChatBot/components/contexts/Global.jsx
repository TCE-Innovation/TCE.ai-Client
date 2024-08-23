import React, {
  createContext,
  useContext as _useContext,
  useState,
  useCallback,
  useRef,
} from "react";

import { genRandomId } from "../../utils/uuid";
import useStorage from "../../hooks/useStorage";
import useAuth from "../../hooks/useAuth";
import { useQueryParam } from "../../hooks";

import PubSub from "../../services/pubsub";

const GlobalContext = createContext();

export const useContext = () => _useContext(GlobalContext);

const GlobalContextProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const { userPic } = useAuth();
  const query = useQueryParam();
  const pubsubRef = useRef({});

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

  const registerSubscriber = (name, callback) => {
    pubsubRef.current[name] = pubsubRef.current[name] || new PubSub(name);
    const pubsub = pubsubRef.current[name];
    return pubsub.subscribe(callback);
  };

  const publishToSubscribers = (name, data) => {
    pubsubRef.current[name] = pubsubRef.current[name] || new PubSub(name);
    const pubsub = pubsubRef.current[name];
    pubsub.publish(data);
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
        registerSubscriber,
        publishToSubscribers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
