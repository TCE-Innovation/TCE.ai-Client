import EditUser from "./EditUser";
import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";

const EditUserModal = (props) => {
  const initialValues = useMemo(
    () => ({
      role: props.role,
    }),
    [props.role]
  );

  return (
    <FormContext initialValues={initialValues}>
      <EditUser {...props} />
    </FormContext>
  );
};

export default EditUserModal;
