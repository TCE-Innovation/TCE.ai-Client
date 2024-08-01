import { Field } from "../../../../../common";
import { SelectField } from "../../../../../common/field";

import React from "react";

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
        <Field name={"name"} placeholder={"Type here"} label="Name" />
      </div>
      <div>
        <SelectField
          name={"projects"}
          label={"Projects assigned to"}
          placeholder={"Projects assigned to"}
          extractor={(item) => item}
          items={[]}
        />
      </div>
      <div />
    </form>
  );
};

export default Form;
