import React from "react";

import AddDocument from "./AddDocument";

import FormContext from "../../../../../contexts/FormContext";

const formValues = {
  projectId: "",
  document: null,
};

const AddDocumentModal = (props) => {
  return (
    <FormContext initialValues={formValues}>
      <AddDocument {...props} />
    </FormContext>
  );
};

export default AddDocumentModal;
