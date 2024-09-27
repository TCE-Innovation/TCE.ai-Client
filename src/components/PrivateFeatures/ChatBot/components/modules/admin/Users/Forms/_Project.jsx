import React, { useEffect, useMemo } from "react";

import { MultiSelectField } from "../../../../common/field";

import { useFieldValue, useFieldArray } from "../../../../contexts/FormContext";

import { useGetProjectsQuery } from "../../../../../hooks/queries";
import { useGlobal, mutations } from "../../../../../hooks";

import { sleep } from "../../../../../utils/misc";
import { CheckBox } from "../../../../common";

const _Project = ({ name, shouldFetchProjects }) => {
  const { resetError, changeValue } = useFieldValue(name);
  const { value, push, remove } = useFieldArray(name);
  const { registerSubscriber, createAlert } = useGlobal();

  const { mutate: addUserToProjects } = mutations.useAddUsersToProject();

  const { data, loading: loadingProjects } = useGetProjectsQuery({
    disableRunOnMount: !shouldFetchProjects,
  });

  useEffect(() => {
    const unregister = registerSubscriber(
      `add-user-to-projects-${name}`,
      ({ userId, projectIds }) => {
        Promise.allSettled(
          projectIds.map(async (projectId, i) => {
            await sleep(i * 1000);
            await addUserToProjects({ userIds: [userId], projectId });
            return Promise.resolve({ userId, projectId });
          })
        )
          .then((results) => {
            results.forEach((result) => {
              if (result.status === "fulfilled") {
                createAlert({
                  message: [
                    "This user was added to project ",
                    result.value.projectId,
                  ].join(" "),
                  type: "success",
                });
              } else if (result.status === "rejected") {
                createAlert({
                  message: "Failed assigning user to project",
                  type: "danger",
                });
              }
            });
          })
          .then(() => unregister());
      }
    );
    // eslint-disable-next-line
  }, []);

  const projects = useMemo(() => {
    if (!data) return [];
    const projects = data.data;
    return projects.map((project) => ({
      ...project,
      label: project.name,
      value: project.id,
    }));
  }, [data]);

  const values = useMemo(() => {
    return value.map((value) => value.value);
  }, [value]);

  useEffect(() => {
    changeValue(values);
    // eslint-disable-next-line
  }, [values]);

  return (
    <MultiSelectField
      name={name}
      extractor={(item) => item}
      items={projects}
      values={values}
      loading={loadingProjects}
      search={projects.length >= 5}
      label="Projects"
      placeholder={"Assign Projects"}
      onChange={() => resetError()}
      listRenderer={(item) => {
        const isChecked = value?.some((v) => v.value === item.value);
        const id = `list-item-${item.value}`;
        return (
          <div
            onClick={() => (isChecked ? remove(item) : push(item))}
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
  );
};

export default _Project;
