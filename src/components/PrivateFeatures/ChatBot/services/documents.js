import { client } from "../http";
import { formatResponseData } from "../http/handlers";

import { sortArray } from "../utils/date";

const route = "/user/document";

export const getDocuments = async ({ projectId }) => {
  const { data, success, message } = await client.get(route, {
    project_id: projectId,
  });
  const _data = sortArray(data, "created_at").map((item) => ({
    ...item,
    name: item.document_name,
    uploadDate: item.created_at,
    id: item.document_id,
    uploadedBy: item.updated_by || null,
  }));
  return {
    data: _data,
    success,
    message,
  };
};

/**
 *
 * @example Response
 * document: {
    "id": 130,
    "project": 6,
    "file_name": "test-doc.pdf",
    "name": "test-doc.pdf.pdf",
    "url": "https://saaichatdev.blob.core.windows.net/pages/test-doc.pdf.pdf?se=2124-08-21T12%3A48%3A49Z&sp=rd&sv=2024-08-04&sr=b&sig=rxOcbVuG%2B19sbtigSalYkuT4Wq7VmGh/%2BmfVmn7U7OM%3D",
    "is_processed": false,
    "processed_at": null,
    "created_at": "2024-08-21T12:48:49.513365Z"
  }
 *
 */
export const uploadDocument = async ({ projectId, formData }) => {
  const { data, ...result } = await client.create(
    route,
    {
      data: formData,
      query: { project_id: projectId },
    },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  const { documents, ...rest } = data;
  const _data = documents.map(({ document }) => ({
    ...document,
    uploadDate: document.created_at,
  }));
  return formatResponseData({
    ...result,
    data: { documents: _data, ...rest },
  });
};

export const deleteDocument = async ({ projectId, documentId }) => {
  const result = await client.remove(route, {
    query: { project_id: projectId, document_id: documentId },
  });
  return formatResponseData(result);
};
