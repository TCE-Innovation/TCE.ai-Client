import React from "react";

import FormContext from "../../../../../contexts/FormContext";

import AddUserModal from "./AddUser";

const formValues = {
  email: "",
  name: "",
  projects: [],
};

const AddUser = (props) => {
  return (
    <FormContext initialValues={formValues}>
      <AddUserModal {...props} />
    </FormContext>
  );
};

export default AddUser;
