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
          const { document } = newData.data;
          updateQuery(
            ["getProjectDocuments", { projectId: argsRef.current.projectId }],
            (documents) => {
              return {
                ...documents,
                data: [document, ...documents.data],
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
