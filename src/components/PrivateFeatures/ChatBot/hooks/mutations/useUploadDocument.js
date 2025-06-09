import { useRef } from "react";
import { useGlobal } from "..";
import { documentService } from "../../services";
import useMutation from "../useMutation";

export const useUploadDocuments = () => {
  const { createAlert } = useGlobal();
  const argsRef = useRef({});
  return useMutation(
    ({ projectId, formData }) => {
      argsRef.current = { projectId };
      return documentService.uploadDocument({ projectId, formData });
    },
    {
      onSuccess: (newData, { updateQuery }) => {
        if (newData.success) {
          const { documents } = newData.data;

          const mappedDocuments = documents.map((doc) => ({
            ...doc,
            uploadedBy: doc.updated_by || null,
          }));

          updateQuery(
            ["getProjectDocuments", { projectId: argsRef.current.projectId }],
            (prevDocuments) => {
              return {
                ...prevDocuments,
                data: [...mappedDocuments, ...prevDocuments.data],
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
