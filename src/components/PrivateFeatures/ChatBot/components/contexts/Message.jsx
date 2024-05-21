import React, {
  createContext,
  useContext as _useContext,
  useState,
  useEffect,
} from "react";

const dummy = [
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "e omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iu",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
  {
    text: "Lorem ipsum dolor sit a",
  },
];

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [messages, setMessages] = useState([]);

  const createMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  // simulate fetch
  useEffect(() => {
    setTimeout(() => {
      setMessages(
        dummy.map((item, i) => ({ body: item.text, isAI: i % 2 !== 0, id: i }))
      );
      setLoading(false);
    }, 2000);
  }, []);

  // simulate send
  const sendMessage = (message) => {
    createMessage(message);
    setSendingMessage(true);
    setTimeout(() => {
      setSendingMessage(false);
    }, 3000);
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
