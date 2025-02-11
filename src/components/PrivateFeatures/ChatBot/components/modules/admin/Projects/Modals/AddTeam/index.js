import AddTeam from "./AddTeam";
import FormContext from "../../../../../contexts/FormContext";
import { useMemo } from "react";
import { useGlobal } from "../../../../../../hooks";

const AddTeamModal = (props) => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id: projectId = null } = params;
  const initialValues = useMemo(
    () => ({
      teamDetails: [],
      teams: [],
      projectId,
    }),
    [projectId]
  );

  return (
    <FormContext initialValues={initialValues}>
      <AddTeam {...props} />
    </FormContext>
  );
};

export default AddTeamModal;
