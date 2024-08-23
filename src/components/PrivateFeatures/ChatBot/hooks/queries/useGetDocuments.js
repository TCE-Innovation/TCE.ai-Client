import { documentService } from "../../services";
import useQuery from "../useQuery";

export const useGetDocumentsQuery = ({ projectId }, options = {}) =>
  useQuery(
    ["getProjectDocuments", { projectId }],
    () => documentService.getDocuments({ projectId }),
    options
  );
