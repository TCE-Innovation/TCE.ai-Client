import RemoveUserModal from "./RemoveUser";

import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";
import { useMemo } from "react";

const RemoveUser = (props) => {
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
      <RemoveUserModal {...props} />
    </FormContext>
  );
};

export default RemoveUser;
