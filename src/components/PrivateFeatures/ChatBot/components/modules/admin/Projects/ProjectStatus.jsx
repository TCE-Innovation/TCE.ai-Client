import { useEffect } from "react";
import { useAdmin, useGlobal, useDebounce } from "../../../../hooks";
import { PROFILES } from "../../../../constants/admin";
import { TabContext } from "../../../common";
import SwitchMode from "./SwitchMode";

const ProjectStatus = () => {
  const { editProjectStatus } = useAdmin();
  const { mutate: handleToggleProjectStatus, loading } = editProjectStatus;
  const { query } = useGlobal();
  const { params,push } = query;

  const { is_live, project_id } = params;

  const [handleChangeProjectStatus, cancel] = useDebounce(
    (isLive) => {
      if (loading || is_live.toString() === isLive.toString()) return;
      handleToggleProjectStatus({
        projectId: project_id,
        projectIsLiveStatus: !(is_live.toString() === isLive.toString()),
      });
    },
    2);

  useEffect(() => {
    return () => cancel();
    // eslint-disable-next-line
  }, []);
 
  const tabs = [
    {
      title: "Live",
      handleClick: () => {
        handleChangeProjectStatus(true);
        push({is_live:true})
      },
      value: PROFILES.LIVE_MODE,
    },
    {
      title: "Pursuit",
      handleClick: () => {
        handleChangeProjectStatus(false);
        push({is_live:false})
      },
      value: PROFILES.PROPOSAL_MODE,
    },
  ];
  return (
    <TabContext defaultActive={is_live ? 0 : 1} tabs={tabs}>
      <SwitchMode />
    </TabContext>
  );
};

export default ProjectStatus;
