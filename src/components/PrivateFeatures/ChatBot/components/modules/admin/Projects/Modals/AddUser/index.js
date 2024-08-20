import AddUser from "./AddUser";
import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";

const initialValues = {
  project_id: null,
  user_ids: [],
};

const AddUserModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id } = params;
  return (
    <FormContext initialValues={{ ...initialValues, project_id }}>
      <AddUser {...props} />
    </FormContext>
  );
};

export default AddUserModal;
