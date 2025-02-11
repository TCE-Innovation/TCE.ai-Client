import AddUserToTeam from "./AddUserToTeam";
import FormContext from "../../../../../contexts/FormContext";
import { useGlobal } from "../../../../../../hooks";
import { useMemo } from "react";

const AddUserToTeamModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { team_id: teamId = null } = params;

  const initialValues = useMemo(() => {
    return {
      userId: null,
      teamId,
    };
  }, [teamId]);

  return (
    <FormContext initialValues={initialValues}>
      <AddUserToTeam {...props} />
    </FormContext>
  );
};

export default AddUserToTeamModal;
