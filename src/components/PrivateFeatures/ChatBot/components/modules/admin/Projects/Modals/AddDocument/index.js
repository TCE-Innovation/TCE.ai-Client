import React from "react";

import AddDocument from "./AddDocument";
import FormContext from "../../../../../contexts/FormContext";

const initialValues = {
  document: null,
  documentName: "",
};

const AddDocumentModal = (props) => {
  return (
    <FormContext initialValues={initialValues}>
      <AddDocument {...props} />
    </FormContext>
  );
};

export default AddDocumentModal;
