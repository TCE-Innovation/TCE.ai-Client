import Teams from "./Teams";

import FormContext from "../../../contexts/FormContext";

const UsersContext = () => {
  return (
    <FormContext initialValues={{ teamsSearch: "", teamUserSearch: "" }}>
      <Teams />
    </FormContext>
  );
};

export default UsersContext;
