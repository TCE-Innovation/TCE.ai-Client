import { ROLES } from "../constants/admin";
import { genRandomId } from "./uuid";

export const extractUserData = (item) => {
  return {
    ...item,
    name: item.name || item.user_name || "",
    email: item.email || item.user_email,
    role: item.role || item.user_role,
    id: item.id || item.user_id,
    url: "",
  };
};

export const extractConversationData = (conversation) => {
  return {
    ...conversation,
    title: conversation.name,
    id: conversation.conversation_id,
  };
};

export const extractDocumentData = (item) => ({
  ...item,
  name: item.document_name,
  uploadDate: item.created_at,
  id: item.document_id,
});

export const getRoleById = (id) => {
  const roleIds = [ROLES.ADMIN, ROLES.PM, ROLES.USER];
  return roleIds[id % roleIds.length];
};

export const formatCitations = (citations) => {
  return (
    citations?.map((c) => ({
      highlightedText: c.highlighted_text,
      pageNumber: c.page_number,
      title: c.title,
      url: c.url,
      id: genRandomId(),
    })) ?? []
  );
};

export const formatMessage = (message) => {
  const isUser = message.user || null;
  if (!isUser) {
    const { bot, message_id } = message;
    const { ai_response, citations, error = null } = bot;
    return {
      isAI: true,
      body: error ?? ai_response,
      id: message_id,
      citations: formatCitations(citations || []),
    };
  } else {
    const { user, message_id } = message;
    return {
      isAI: false,
      body: user,
      id: message_id,
    };
  }
};

export const formatTeam = (team) => {
  return {
    ...team,
    id: team.team_id,
    teamName: team.team_name,
  };
};

export const generateTeams = (size = 10) => {
  return Array.from({ length: size }, () => {
    const id = genRandomId();
    return {
      id,
      teamName: `Team Name ${id}`,
      members: [],
    };
  });
};
