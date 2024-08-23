import { useRef } from "react";
import { useGlobal } from "..";
import { documentService } from "../../services";
import useMutation from "../useMutation";

export const useDeleteDocument = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});
  return useMutation(
    ({ documentId, projectId }) => {
      argsRef.current = { documentId, projectId };
      return documentService.deleteDocument({ documentId, projectId });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          updateQuery(
            ["getProjectDocuments", { projectId: argsRef.current.projectId }],
            (documents) => {
              return {
                ...documents,
                data: documents.data.filter(
                  (document) => document.id !== argsRef.current.documentId
                ),
              };
            }
          );
          return createAlert({ message: newData.message, type: "success" });
        }
        createAlert({ message: newData.message, type: "danger" });
      },
    }
  );
};
