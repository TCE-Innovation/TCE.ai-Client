import React from "react";
import { Field } from "../../../../common";
import { emailRegex } from "../../../../../utils/form";

const _Email = () => {
  return (
    <div>
      <Field
        name={"email"}
        regex={{ message: "Invalid email pattern!", pattern: emailRegex() }}
        placeholder={"Type here"}
        label="Email"
      />
    </div>
  );
};

export default _Email;
