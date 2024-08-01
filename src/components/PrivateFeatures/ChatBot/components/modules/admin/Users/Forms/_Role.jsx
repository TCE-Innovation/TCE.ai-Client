import React from "react";
import { SelectField } from "../../../../common/field";
import { Badge } from "../../../../common";

export const roles = ["Admin", "Project Manager", "User"];
const colors = ["purple", "blue", "green"];

const _Role = () => {
  return (
    <div>
      <SelectField
        name={"role"}
        label={"Role"}
        placeholder={"Select Role"}
        extractor={(item, i) => ({ label: item, value: i })}
        items={roles}
        listRenderer={({ label, value }) => {
          return <Badge key={value} label={label} accent={colors[value]} />;
        }}
      />
    </div>
  );
};

export default _Role;
