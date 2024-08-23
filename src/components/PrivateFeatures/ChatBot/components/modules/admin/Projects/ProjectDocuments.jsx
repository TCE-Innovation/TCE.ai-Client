import { useMemo } from "react";
import { useGlobal } from "../../../../hooks";
import { filterByPatternsFactory } from "../../../../utils/form";

import { queries, useAdmin } from "../../../../hooks";

import DocumentsTable from "../Documents/Table";

import { useFieldValue } from "../../../contexts/FormContext";

const ProjectDocuments = () => {
  const { uploadDocument } = useAdmin();
  const { query } = useGlobal();
  const { params } = query;
  const { value: documentName } = useFieldValue("documentSearch");

  const { project_id = null, isLive = null } = params;

  const { data, loading } = queries.useGetDocumentsQuery(
    { projectId: project_id },
    { disableRunOnMount: project_id === null }
  );

  const rows = useMemo(() => {
    if (!data?.data) return [];
    const results = data.data;
    const filterByDocumentName = filterByPatternsFactory(documentName, "name");
    if (isLive === null) return filterByDocumentName(results);
    return filterByDocumentName(results);
  }, [data?.data, isLive, documentName]);

  return (
    <>
      <DocumentsTable
        rows={rows}
        isLoading={loading}
        insertingRow={uploadDocument.loading}
      />
    </>
  );
};

export default ProjectDocuments;
