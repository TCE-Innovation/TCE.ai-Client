import React from "react";

import FormContext from "../../../../../contexts/FormContext";

import CreateTeam from "./CreateTeam";

const formValues = {
  name: "",
  userIds: [],
};

const CreateTeamModal = (props) => {
  return (
    <FormContext initialValues={formValues}>
      <CreateTeam {...props} />
    </FormContext>
  );
};

export default CreateTeamModal;
