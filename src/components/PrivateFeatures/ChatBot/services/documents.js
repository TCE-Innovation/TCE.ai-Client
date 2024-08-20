import { client } from "../http";

const route = "/user/document";

export const getDocuments = async ({ projectId }) => {
  const { data, success, message } = await client.get(route, {
    project_id: projectId,
  });
  return {
    data,
    success,
    message,
  };
};

export const uploadDocument = ({ projectId, formData }) => {
  client.create(route, {
    data: JSON.stringify(formData),
    query: { project_id: projectId },
  });
};

export const deleteDocument = async ({ projectId, documentId }) => {
  const { data, success, message } = await client.remove(route, {
    query: { project_id: projectId, document_id: documentId },
  });
  if (data?.success) {
    return {
      success: true,
      message: data.success,
    };
  }
  return {
    success,
    message,
  };
};
