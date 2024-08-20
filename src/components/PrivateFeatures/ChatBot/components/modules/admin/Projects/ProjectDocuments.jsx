import { useMemo } from "react";
import { useGlobal } from "../../../../hooks";
import { filterByPatternsFactory } from "../../../../utils/form";

import { useGetProjectDocuments } from "../../../../hooks/useQueries";

import DocumentsTable from "../Documents/Table";

import { useFieldValue } from "../../../contexts/FormContext";

const ProjectDocuments = () => {
  const { query } = useGlobal();
  const { params } = query;
  const { value: documentName } = useFieldValue("documentSearch");

  const { project_id = null, isLive = null } = params;

  const { data, loading } = useGetProjectDocuments(
    { projectId: project_id },
    { disableRunOnMount: project_id === null }
  );

  const rows = useMemo(() => {
    if (!data?.data) return [];
    const results = data.data.map((item) => {
      return {
        ...item,
        name: item.document_name,
        uploadDate: item.created_at,
        id: item.document_id,
      };
    });
    const filterByDocumentName = filterByPatternsFactory(documentName, "name");
    if (isLive === null) return filterByDocumentName(results);
    return filterByDocumentName(
      results.filter((item) => item.is_live.toString() === isLive)
    );
  }, [data?.data, isLive, documentName]);

  return (
    <>
      <DocumentsTable rows={rows} isLoading={loading} />
    </>
  );
};

export default ProjectDocuments;
