import { useGetDocumentsQuery } from "../../../../../hooks/queries";

const useDocument = (projectId) => {
  const {
    data,
    loading: loadingDocuments,
    error,
    refetch,
  } = useGetDocumentsQuery(
    {
      projectId: projectId,
    },
    { disableRunOnMount: projectId === null }
  );

  const isDuplicateDocument = (docName) => {
    const { data: documents } = data;
    return documents.some((document) => document.name === docName);
  };

  return {
    isDuplicateDocument,
    loadingDocuments,
    documents: data?.data || [],
    error,
    getDocuments: refetch,
  };
};

export default useDocument;
