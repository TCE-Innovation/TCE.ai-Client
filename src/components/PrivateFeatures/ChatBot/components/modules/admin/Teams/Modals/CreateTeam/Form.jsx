import React, { useMemo } from "react";

import { Field, CheckBox } from "../../../../../common";
import { MultiSelectField } from "../../../../../common/field";

import { useGetUsersQuery } from "../../../../../../hooks/queries/useGetUsers";
import {
  useFieldArray,
  useFieldValue,
} from "../../../../../contexts/FormContext";
const Form = () => {
  const { value, push, remove } = useFieldArray("userIds");
  const { resetError } = useFieldValue("userIds");
  const { loading, data } = useGetUsersQuery();

  const users = useMemo(() => {
    if (!data) return [];
    return data.data;
  }, [data]);

  return (
    <form>
      <div>
        <Field
          name={"name"}
          placeholder={"Type here"}
          label="Name"
          autoComplete="off"
          min={5}
        />
      </div>
      <div>
        <MultiSelectField
          name={"userIds"}
          items={users}
          values={value}
          handleRemove={remove}
          label="Select users"
          placeholder={"Select User"}
          extractor={(item) => ({
            label: [item.name, item.email].filter(Boolean).join("-"),
            value: item.id,
          })}
          onChange={() => resetError()}
          loading={loading}
          search={true}
          listRenderer={(item) => {
            const isChecked = value?.some((v) => v === item.value);
            const id = `list-item-${item.value}`;
            return (
              <div
                onClick={() =>
                  isChecked ? remove(item.value) : push(item.value)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: ".75em",
                  cursor: "pointer",
                }}
              >
                <CheckBox checked={isChecked} id={id} size={1.5} />
                <div>{item.label}</div>
              </div>
            );
          }}
        />
      </div>
      <div />
    </form>
  );
};

export default Form;
