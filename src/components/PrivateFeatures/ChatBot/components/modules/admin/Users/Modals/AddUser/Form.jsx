import React from "react";

import { Field } from "../../../../../common";

import RolesField from "../../Forms/_Role";

import { emailRegex } from "../../../../../../utils/form";

const Form = () => {
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
        />
      </div>
      <div>
        <RolesField />
      </div>
      <div />
    </form>
  );
};

export default Form;
