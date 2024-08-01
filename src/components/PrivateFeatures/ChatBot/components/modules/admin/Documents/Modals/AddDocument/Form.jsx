import React from "react";

import { SelectField } from "../../../../../common/field";

import UploadDocument from "../../Forms/_Upload";

const Form = () => {
  return (
    <div>
      <UploadDocument />
      <div>
        <SelectField
          name={"projectId"}
          label={"Project"}
          placeholder={"Select Project"}
          items={[]}
          extractor={(item) => item}
        />
      </div>
    </div>
  );
};

export default Form;
