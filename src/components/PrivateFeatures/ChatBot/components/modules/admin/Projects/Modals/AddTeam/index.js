import AddTeam from "./AddTeam";
import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";

const AddTeamModal = (props) => {
  const initialValues = useMemo(
    () => ({
      teams: [],
    }),
    []
  );

  return (
    <FormContext initialValues={initialValues}>
      <AddTeam {...props} />
    </FormContext>
  );
};

export default AddTeamModal;
