import Teams from "./Teams";

import FormContext from "../../../contexts/FormContext";

const UsersContext = () => {
  return (
    <FormContext initialValues={{ search: "" }}>
      <Teams />
    </FormContext>
  );
};

export default UsersContext;
