import EditProjectModal from "./EditProject";

import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";

const EditProject = (props) => {
  const initialValues = useMemo(
    () => ({
      name: props.name,
    }),
    [props.name]
  );
  return (
    <FormContext initialValues={initialValues}>
      <EditProjectModal {...props} />
    </FormContext>
  );
};

export default EditProject;
