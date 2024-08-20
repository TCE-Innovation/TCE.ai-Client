import EditProjectModal from "./EditProject";

import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";

const initialValues = {
  name: "",
  projectId: null
};

const AddUserModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id } = params;
  return (
    <FormContext initialValues={{ ...initialValues, projectId: project_id }}>
      <EditProjectModal {...props} />
    </FormContext>
  );
};

export default AddUserModal;
