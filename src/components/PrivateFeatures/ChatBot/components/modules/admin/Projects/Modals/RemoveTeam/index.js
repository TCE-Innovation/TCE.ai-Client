import RemoveTeam from "./RemoveTeam";
import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";

const RemoveTeamModal = (props) => {
  const initialValues = useMemo(
    () => ({
      name: props.teamName,
    }),
    [props.teamName]
  );

  return (
    <FormContext initialValues={initialValues}>
      <RemoveTeam {...props} />
    </FormContext>
  );
};

export default RemoveTeamModal;
