import React from "react";
import { SelectField } from "../../../../common/field";
import { Badge } from "../../../../common";
import { useFieldValue } from "../../../../contexts/FormContext";

import { ROLES, ROLE_TO_COLORS } from "../../../../../constants/admin";

export const roles = [ROLES.ADMIN, ROLES.PM, ROLES.USER];

const _Role = () => {
  const { setError } = useFieldValue("role");
  return (
    <div>
      <SelectField
        name={"role"}
        label={"Role"}
        placeholder={"Select Role"}
        extractor={(item) => ({ label: item, value: item })}
        items={roles}
        listRenderer={({ label, value }) => {
          return (
            <Badge key={value} label={label} accent={ROLE_TO_COLORS[value]} />
          );
        }}
        onChange={() => setError(null)}
      />
    </div>
  );
};

export default _Role;
