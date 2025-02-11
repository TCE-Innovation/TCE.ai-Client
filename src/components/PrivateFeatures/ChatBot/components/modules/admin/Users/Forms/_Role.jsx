import React, { useEffect } from "react";
import { SelectField } from "../../../../common/field";
import { Badge } from "../../../../common";
import { useFieldValue } from "../../../../contexts/FormContext";

import { ROLES, ROLE_TO_COLORS } from "../../../../../constants/admin";

export const roles = [ROLES.ADMIN, ROLES.PM, ROLES.USER];

const _Role = ({ name, initialValue }) => {
  const { setError, changeValue } = useFieldValue(name);

  useEffect(() => {
    if (initialValue) {
      changeValue(initialValue);
    }
    // eslint-disable-next-line
  }, [initialValue]);

  return (
    <div>
      <SelectField
        name={name}
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
