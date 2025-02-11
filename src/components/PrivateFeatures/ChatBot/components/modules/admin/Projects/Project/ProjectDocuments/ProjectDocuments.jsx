import { useMemo } from "react";
import { filterByPatternsFactory } from "../../../../../../utils/form";

import { queries, useAdmin, useGlobal } from "../../../../../../hooks";

import DocumentsTable from "./Table";

import { useFieldValue } from "../../../../../contexts/FormContext";
import { permissionService } from "../../../../../../services";
import Restricted from "../../../Restricted";

const ProjectDocuments = () => {
  const hasProjectDocumentReadPermission = permissionService.getProjectDocumentPermission(
    permissionService.permission.READ
  );
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

  if (!hasProjectDocumentReadPermission) return <Restricted />;

  return (
    <>
      <DocumentsTable
        rows={rows}
        isLoading={loading}
        insertingRow={uploadDocument.loading}
        style={{ height: "600px" }}
      />
    </>
  );
};

export default ProjectDocuments;
