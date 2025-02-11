import Users from "./Users";

import FormContext from "../../../contexts/FormContext";

const UsersContext = () => {
  return (
    <FormContext initialValues={{ search: "" }}>
      <Users />
    </FormContext>
  );
};

export default UsersContext;
