import EditProjectModal from "./EditProject";

import FormContext from "../../../../../contexts/FormContext";

const initialValues = {
  name: "",
};

const AddUserModal = (props) => {
  return (
    <FormContext initialValues={initialValues}>
      <EditProjectModal {...props} />
    </FormContext>
  );
};

export default AddUserModal;
