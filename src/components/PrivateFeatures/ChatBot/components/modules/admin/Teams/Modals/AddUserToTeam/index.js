import AddUserToTeam from "./AddUserToTeam";
import FormContext from "../../../../../contexts/FormContext";

const initialValues = {
  user: null,
};

const AddUserToTeamModal = (props) => {
  return (
    <FormContext initialValues={initialValues}>
      <AddUserToTeam {...props} />
    </FormContext>
  );
};

export default AddUserToTeamModal;
