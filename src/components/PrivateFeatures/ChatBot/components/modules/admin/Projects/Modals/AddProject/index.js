import React from "react";

import AddProject from "./AddProject";
import FormContext from "../../../../../contexts/FormContext";

const initialValues = {
  name: "",
};

const AddProjectModal = (props) => {
  return (
    <FormContext initialValues={initialValues}>
      <AddProject {...props} />
    </FormContext>
  );
};

export default AddProjectModal;
