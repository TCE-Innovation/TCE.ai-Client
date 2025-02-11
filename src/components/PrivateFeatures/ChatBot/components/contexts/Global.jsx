import React, {
  createContext,
  useContext as _useContext,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
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

  const { params } = query;

  useLayoutEffect(() => {
    const container = document.querySelector("#private-wrapper");
    if (!container) return;
    const initialColor = container.style.backgroundColor;
    if (params.admin) {
      container.style.backgroundColor = "#eff1f3";
    } else if (params["is_live"] === false) {
      container.style.backgroundColor = "#d6e0f4";
    } else {
      container.style.backgroundColor = "rgb(248, 241, 215)";
    }
    // eslint-disable-next-line
    return () => {
      container.style.backgroundColor = initialColor;
    };
  }, [params]);

  const createAlert = useCallback(({ message, type, ...rest }) => {
    if (!message) return () => {};
    const id = genRandomId();
    setAlerts((prev) => [...prev, { message, type, id, ...rest }]);
    return () => handleRemoveAlert(id);
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
