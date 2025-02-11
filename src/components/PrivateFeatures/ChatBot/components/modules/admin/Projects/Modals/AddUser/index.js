import AddUser from "./AddUser";
import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";
import { useMemo } from "react";

const AddUserModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id } = params;

  const initialValues = useMemo(
    () => ({
      userIds: [],
      projectId: project_id,
    }),
    [project_id]
  );

  return (
    <FormContext initialValues={initialValues}>
      <AddUser {...props} />
    </FormContext>
  );
};

export default AddUserModal;
