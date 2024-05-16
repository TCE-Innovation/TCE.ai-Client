import React, {
  createContext,
  useContext as _useContext,
  useState,
} from "react";

import { genRandomId } from "../../utils/uuid";

const dummy = [
  {
    id: genRandomId(),
    title: "New Chat",
    body: "e omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iu",
  },
  {
    id: genRandomId(),
    title: "New Chat 2",
    body: "Lorem ipsum dolor sit a",
  },
  {
    id: genRandomId(),
    title: "New Chat 3",
    body: "Lorem ipsum dolor sit a",
  },
  {
    id: genRandomId(),
    title: "New Chat 4",
    body: "Lorem ipsum dolor sit a",
  },
];

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([...dummy]);
  const [currentConversation, setCurrentConversation] = useState(dummy[0].id);

  const createConversation = () => {
    const id = genRandomId();
    setConversations((prev) => [
      { title: "New Chat", body: "Empty", id },
      ...prev,
    ]);
    setCurrentConversation(id);
  };

  const deleteConversation = (id) => (e) => {
    e.stopPropagation();
    const target = conversations.find((c) => c.id !== id)?.id || null;
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setCurrentConversation(target);
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        createConversation,
        deleteConversation,
        setCurrentConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useContext = () => _useContext(ConversationContext);

export default ConversationProvider;
