import React, { useMemo } from "react";

import AddDocument from "./AddDocument";
import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";

const AddDocumentModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id } = params;

  const initialValues = useMemo(
    () => ({
      document: null,
      documentName: "",
      projectId: project_id,
      step: null
    }),
    [project_id]
  );

  return (
    <FormContext initialValues={initialValues}>
      <AddDocument {...props} />
    </FormContext>
  );
};

export default AddDocumentModal;
