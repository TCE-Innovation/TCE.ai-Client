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

  const createAlert = useCallback(({ message, type, ...rest }) => {
    if (!message) return () => {};
    const id = genRandomId();
    setAlerts((prev) => [...prev, { message, type, id, ...rest }]);
    return () => handleRemoveAlert(id);
  }, []);

  const handleRemoveAlert = (id) => {
    console.log("removed alert");
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

  const getSubscriberData = useCallback((name) => {
    pubsubRef.current[name] = pubsubRef.current[name] || new PubSub(name);
    const pubsub = pubsubRef.current[name];
    pubsub.getCurrentData();
  }, []);

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
        getSubscriberData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
