import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { conversationService, messageService, projectService } from "../../services";
import { genRandomId } from "../../utils/uuid";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

const ChatProvider = ({ children }) => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState({ projects: false, conversations: false, messages: false });
  const [error, setError] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [isEditingConversation, setIsEditingConversation] = useState(false);
  const [viewingUser, setViewingUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  // Track if a conversation was just created to prevent fetching messages after first message
  const justCreatedConversationRef = useRef(false);

  // Fetch projects on mount
  useEffect(() => {
    setLoading(l => ({ ...l, projects: true }));
    projectService.getProjects()
      .then(data => {
        setProjects(data.data || []);
        setCurrentProject(data.data[0].id);
      })
      .catch(e => setError(e))
      .finally(() => setLoading(l => ({ ...l, projects: false })));
  }, []);

  // Combine URL parameter handling into one function
  const updateURLParameters = useCallback(() => {
    const params = new URLSearchParams(location.search);
    const isAdmin = params.get('admin') === 'true';
    const isPreview = params.get('mode') === 'preview';
    const userId = params.get('user_id');

    // Clear existing conversations and set loading state
    setConversations([]);
    setCurrentConversation(null);
    setLoading(l => ({ ...l, conversations: true }));

    setIsAdmin(isAdmin);
    setIsPreviewMode(isPreview);
    
    if (isAdmin && isPreview && userId) {
      setViewingUser(userId);
    } else {
      setViewingUser(null);
    }

  }, [location]);

  // Fetch conversations when project changes
  const fetchConversations = useCallback(() => {
    if (!currentProject && !viewingUser) return;
    setLoading(l => ({ ...l, conversations: true }));

    // Case 1: Normal user viewing their own conversations
    if (!viewingUser) {
      conversationService.getConversations(currentProject)
        .then(data => {
          const convs = data.data || [];
          setConversations(convs);
          if (!convs.length) {
            setCurrentConversation(null);
          } else if (!currentConversation || !convs.some(c => c.id === currentConversation.id)) {
            setCurrentConversation(convs[0]);
          }
        })
        .catch(e => setError(e))
        .finally(() => setLoading(l => ({ ...l, conversations: false })));
      return;
    }

    // Case 2: Admin viewing another user's conversations across all projects
    projectService.getProjects(viewingUser)
      .then(async projectsData => {
        const projects = projectsData.data || [];
        let allConversations = [];

        try {
          // Fetch conversations for each project
          const conversationPromises = projects.map(project => 
            conversationService.getConversations(project.id, viewingUser)
              .then(convData => convData.data || [])
              .catch(e => {
                console.error(`Error fetching conversations for project ${project.id}:`, e);
                return [];
              })
          );

          const conversationsArrays = await Promise.all(conversationPromises);
          allConversations = conversationsArrays.flat();

          setConversations(allConversations);
          if (!allConversations.length) {
            setCurrentConversation(null);
          } else if (!currentConversation || !allConversations.some(c => c.id === currentConversation.id)) {
            setCurrentConversation(allConversations[0]);
          }
        } catch (e) {
          setError(e);
        }
      })
      .catch(e => setError(e))
      .finally(() => setLoading(l => ({ ...l, conversations: false })));
  }, [currentProject, currentConversation, viewingUser]);

  useEffect(() => {
    fetchConversations();
    // eslint-disable-next-line
  }, [currentProject, isPreviewMode]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (!currentConversation) {
      setMessages([]);
      return;
    }
    // Only fetch if not a pending conversation (i.e., user switched conversations)
    if (currentConversation.id === "pending") return;
    // Prevent fetching after first message in a new conversation
    if (justCreatedConversationRef.current) {
      justCreatedConversationRef.current = false;
      return;
    }
    setLoading(l => ({ ...l, messages: true }));
    messageService.getMessages({ conversationId: currentConversation.id })
      .then(data => setMessages(data.data?.messages || []))
      .catch(e => setError(e))
      .finally(() => setLoading(l => ({ ...l, messages: false })));
    // eslint-disable-next-line
  }, [currentConversation]);

  // Actions
  const selectProject = useCallback((projectId) => {
    setCurrentProject(projectId);
    setCurrentConversation(null);
    setMessages([]);
  }, []);

  const selectConversation = useCallback((conversation) => {
    setCurrentConversation(conversation);
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentConversation(null);
    setMessages([]);
  }, []);

  const sendMessage = useCallback(async (body) => {
    let conversation = currentConversation;
    setSendingMessage(true);
    const userMessageId = genRandomId();
    // If no conversation, set a temporary one for optimistic UI
    if (!conversation) {
      conversation = { id: "pending", title: "New Chat", projectId: currentProject };
      setCurrentConversation(conversation);
    }
    // Optimistically add the user's message and bot animation
    setMessages((prev) => [
      ...prev,
      { isAI: false, body, id: userMessageId },
      { isAI: true, body: null, id: "bot-typing", typing: true },
    ]);
    try {
      // If conversation is pending, create it
      let realConversation = conversation;
      if (conversation.id === "pending") {
        const convRes = await conversationService.createConversation(currentProject);
        if (!convRes.success) throw new Error(convRes.message || "Failed to create conversation");
        realConversation = { id: convRes.data, title: "New Chat", projectId: currentProject };
        setCurrentConversation(realConversation);
        justCreatedConversationRef.current = true; // Prevent fetch after first message
      }
      // Send message
      const msgRes = await messageService.createMessage({ conversationId: realConversation.id, message: body });
      if (!msgRes.success) throw new Error(msgRes.message || "Failed to send message");
      // Replace the bot-typing placeholder with the real AI response
      setMessages((prev) =>
        prev
          .filter((m) => m.id !== "bot-typing")
          .map((m) =>
            m.id === userMessageId
              ? m
              : m
          )
          .concat({
            isAI: true,
            body: msgRes.data.body || msgRes.data.ai_response,
            citations: msgRes.data.citations,
            id: msgRes.data.id || genRandomId(),
          })
      );
      // After first message in new conversation, refresh conversation list (add only new conv)
      if (conversation.id === "pending") {
        conversationService.getConversations(currentProject).then(data => {
          const convs = data.data || [];
          setConversations(convs);
        });
      }
    } catch (e) {
      setError(e.message || "Failed to send message");
      // Remove the bot-typing placeholder
      setMessages((prev) => prev.filter((m) => m.id !== "bot-typing"));
    } finally {
      setSendingMessage(false);
    }
  }, [currentConversation, currentProject]);

  // Delete conversation function for DeleteConversation component
  const deleteConversation = useCallback((id) => {
    return async (e) => {
      setIsDeletingConversation(true);
      try {
        await conversationService.deleteConversation(id, currentProject);
        setConversations(prev => prev.filter(c => c.id !== id));
        if (currentConversation && currentConversation.id === id) {
          setCurrentConversation(null);
          setMessages([]);
        }
      } catch (err) {
        setError(err.message || "Failed to delete conversation");
      } finally {
        setIsDeletingConversation(false);
      }
    };
  }, [currentProject, currentConversation]);

  // Edit conversation function for EditConversation component
  const editConversation = useCallback(async ({ name, id }) => {
    setIsEditingConversation(true);
    try {
      const res = await conversationService.editConversation({ conversationId: id, name, projectId: currentProject });
      if (res.success) {
        setConversations(prev => prev.map(c => c.id === id ? { ...c, title: name } : c));
        if (currentConversation && currentConversation.id === id) {
          setCurrentConversation({ ...currentConversation, title: name });
        }
      } else {
        setError(res.message || "Failed to edit conversation");
      }
    } catch (err) {
      setError(err.message || "Failed to edit conversation");
    } finally {
      setIsEditingConversation(false);
    }
  }, [currentProject, currentConversation]);

  // Watch for URL changes
  useEffect(() => {
    updateURLParameters();
  }, [location, updateURLParameters]);

  return (
    <ChatContext.Provider
      value={{
        projects,
        currentProject,
        selectProject,
        conversations,
        currentConversation,
        selectConversation,
        messages,
        sendMessage,
        startNewChat,
        loading,
        error,
        sendingMessage,
        deleteConversation,
        isDeletingConversation,
        editConversation,
        isEditingConversation,
        viewingUser,
        isAdmin,
        isPreviewMode,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
