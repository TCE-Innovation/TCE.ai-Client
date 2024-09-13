import React, { useEffect, useMemo } from "react";
import { CheckBox } from "../../../../../common";
import { MultiSelectField } from "../../../../../common/field";
import {
  useFieldArray,
  useFieldValue,
} from "../../../../../contexts/FormContext";
import {
  useGetTeamsQuery,
  useGetTeamsByProjectQuery,
} from "../../../../../../hooks/queries";
import { useGlobal } from "../../../../../../hooks";

const Form = () => {
  const { query } = useGlobal();
  const { params } = query;
  const { project_id: projectId = null } = params;
  const { value, push, remove } = useFieldArray("teams");
  const { resetError } = useFieldValue("teams");
  const { changeValue: updateTeamDetails } = useFieldValue("teamDetails");
  const { loading, data } = useGetTeamsQuery();
  const {
    data: projectTeamsData,
    loading: loadingProjectTeams,
  } = useGetTeamsByProjectQuery(
    { projectId },
    { disableRunOnMount: projectId === null }
  );

  const teams = useMemo(() => {
    if (!data || !projectTeamsData) return [];
    const teams = data.data;
    const projectTeams = projectTeamsData.data?.teams || [];
    return teams.filter(
      (team) => !projectTeams.some((projectTeam) => projectTeam.id === team.id)
    );
  }, [data, projectTeamsData]);

  const values = useMemo(() => {
    return value.map((value) => value.value);
  }, [value]);

  useEffect(() => {
    updateTeamDetails(value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <form>
      <div>
        <MultiSelectField
          name={"teams"}
          items={teams}
          values={values}
          handleRemove={remove}
          placeholder={"Select Teams"}
          extractor={(item) => ({
            ...item,
            label: item.teamName,
            value: item.id,
          })}
          onChange={() => resetError()}
          loading={loading || loadingProjectTeams}
          search={true}
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
      </div>
      <div />
    </form>
  );
};

export default Form;
