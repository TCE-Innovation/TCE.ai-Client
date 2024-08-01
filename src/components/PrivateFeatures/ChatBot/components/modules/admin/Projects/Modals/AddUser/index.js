import AddUser from "./AddUser";
import FormContext from "../../../../../contexts/FormContext";

const initialValues = {
  email: "",
  name: "",
  role: null,
};

const AddUserModal = (props) => {
  return (
    <FormContext initialValues={initialValues}>
      <AddUser {...props} />
    </FormContext>
  );
};

export default AddUserModal;
