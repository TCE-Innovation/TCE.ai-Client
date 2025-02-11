import React, { useEffect, useState } from "react";

import { Field } from "../../../../../common";

import RolesField from "../../Forms/_Role";
import ProjectField from "../../Forms/_Project";

import { emailRegex } from "../../../../../../utils/form";

import { useFieldValue } from "../../../../../contexts/FormContext";

import { ROLES } from "../../../../../../constants/admin";

const Form = () => {
  const [showProjectsField, setShowProjectsField] = useState(false);
  const { value: role } = useFieldValue("role");

  useEffect(() => {
    if (role === ROLES.PM) {
      setShowProjectsField(true);
    } else {
      setShowProjectsField(false);
    }
  }, [role]);

  return (
    <form>
      <div>
        <Field
          name={"email"}
          regex={{ message: "Invalid email pattern!", pattern: emailRegex() }}
          placeholder={"Type here"}
          label="Email"
        />
      </div>
      <div>
        <Field
          name={"name"}
          placeholder={"Type here"}
          label="Name"
          autoComplete="off"
          min={3}
        />
      </div>
      <div>
        <RolesField name={"role"} />
      </div>
      {showProjectsField && (
        <div>
          <ProjectField
            name={"projectIds"}
            shouldFetchProjects={role !== null}
          />
        </div>
      )}
      <div />
    </form>
  );
};

export default Form;
