import RemoveTeamUser from "./RemoveTeamUser";
import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";
import { useGlobal } from "../../../../../../hooks";

const RemoveTeamUserModal = (props) => {
  const { query } = useGlobal();

  const { params } = query;
  const { team_id: teamId = null } = params;

  const initialValues = useMemo(
    () => ({
      teamId,
      userId: props.id,
    }),
    [teamId, props.id]
  );

  return (
    <FormContext initialValues={initialValues}>
      <RemoveTeamUser {...props} />
    </FormContext>
  );
};

export default RemoveTeamUserModal;
