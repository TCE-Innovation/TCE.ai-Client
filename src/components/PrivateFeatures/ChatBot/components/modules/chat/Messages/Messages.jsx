import React, { useEffect, useRef } from "react";
import Message from "../Message/Message";
import { useChat } from "../../../contexts/Conversation";
import { Loader } from "../../../common";
import { BotLoadingIcon } from "../../../icons";

const Messages = () => {
  const { messages, loading } = useChat();
  const avatarRefs = useRef([]);

  useEffect(() => {
    if (avatarRefs.current.length > 0) {
      const lastAvatar = avatarRefs.current[avatarRefs.current.length - 1];
      if (lastAvatar) {
        lastAvatar.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  if (loading.messages) {
    return <Loader size={5} />;
  }
  avatarRefs.current = [];
  return (
    <div>
      {messages.map((message, i) => {
        const setAvatarRef = (el) => {
          if (el) avatarRefs.current.push(el);
        };
        if (message.typing) {
          return (
            <Message
              key={message.id}
              isAI={true}
              body={<BotLoadingIcon width={"3em"} height={"3em"} />}
              showfeedbackbuttons={false}
              initialShowCitation={true}
              avatarRef={setAvatarRef}
            />
          );
        }
        return (
          <Message
            key={message.id}
            {...message}
            showTypeWriterEffect={false}
            showfeedbackbuttons={true}
            initialShowCitation={true}
            avatarRef={setAvatarRef}
          />
        );
      })}
    </div>
  );
};

export default Messages;
