import React, {
  createContext,
  useContext as _useContext,
  useState,
  useEffect,
  useRef,
} from "react";

import { messageService } from "../../services";

import { genRandomId } from "../../utils/uuid";

import useConversation from "../../hooks/useConversation";
import useGlobal from "../../hooks/useGlobal";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const { currentConversation } = useConversation();
  const { createAlert } = useGlobal();

  const messageArchieves = useRef({});

  const createMessage = ({ isAI, body, id, citations }) => {
    if(!currentConversation) return;
    const newMessage = { isAI, body, id };
    if (isAI && citations) newMessage["citations"] = citations;
    setMessages((prev) => {
      const updateMessages = [...prev, newMessage];
      saveMessagesToArchieve(currentConversation.id, updateMessages);
      return updateMessages;
    });
  };

  const saveMessagesToArchieve = (key, messages) => {
    messageArchieves.current = {
      ...messageArchieves.current,
      [key]: messages,
    };
  };

  const loadMessagesFromArchieve = (conversationId) => {
    const archievedMessages = messageArchieves.current[conversationId];
    if (archievedMessages) {
      setMessages(archievedMessages);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const getMessages = async (conversation) => {
      if (!conversation) return;
      const {id} = conversation;
      const loadSuccess = loadMessagesFromArchieve(id);
      if (loadSuccess) return;
      setLoading(true);
      const {
        data: _messages,
        success,
        message,
      } = await messageService.getMessages(id);
      setLoading(false);
      if (!success) createAlert({ message, type: "danger" });
      if (!_messages) return;
      saveMessagesToArchieve(id, _messages);
      setMessages(_messages);
    };
    getMessages(currentConversation);
  }, [currentConversation, createAlert]);

  const sendMessage = async (message) => {
    if (!currentConversation) return;
    setSendingMessage(true);
    createMessage({ isAI: false, body: message, id: genRandomId() });
    const {
      success,
      data,
      message: _message,
    } = await messageService.createMessage({
      conversationId: currentConversation.id,
      message,
    });
    if (success) {
      const { message, citations, id } = data;
      createMessage({ isAI: true, body: message, id, citations });
    } else {
      createAlert({ message: _message, type: "danger" });
    }
    setSendingMessage(false);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage,
        loadingMessages: loading,
        sendingMessage,
        createMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useContext = () => _useContext(MessageContext);

export default MessageProvider;
