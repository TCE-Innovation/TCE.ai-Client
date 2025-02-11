import RemoveDocument from "./RemoveDocument";
import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";
import { useMemo } from "react";

const RemoveDocumentModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id } = params;

  const initialValues = useMemo(
    () => ({
      projectId: project_id,
    }),
    [project_id]
  );
  return (
    <FormContext initialValues={initialValues}>
      <RemoveDocument {...props} />
    </FormContext>
  );
};

export default RemoveDocumentModal;
