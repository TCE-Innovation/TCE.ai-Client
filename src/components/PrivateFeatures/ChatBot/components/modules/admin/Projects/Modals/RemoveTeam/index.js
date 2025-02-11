import RemoveTeam from "./RemoveTeam";
import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";
import { useGlobal } from "../../../../../../hooks";

const RemoveTeamModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id: projectId = null } = params;
  const initialValues = useMemo(
    () => ({
      teamIds: [props.id],
      projectId,
    }),
    [projectId, props.id]
  );

  return (
    <FormContext initialValues={initialValues}>
      <RemoveTeam {...props} />
    </FormContext>
  );
};

export default RemoveTeamModal;
