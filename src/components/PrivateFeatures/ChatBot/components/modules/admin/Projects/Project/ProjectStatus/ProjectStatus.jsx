import { useEffect } from "react";
import { useAdmin, useGlobal, useDebounce } from "../../../../../../hooks";
import { PROFILES } from "../../../../../../constants/admin";
import { TabContext } from "../../../../../common";
import Switcher from "./Switcher";
import { permissionService } from "../../../../../../services";

const ProjectStatus = () => {
  const hasUpdatePermission = permissionService.getProjectStatusPermission(
    permissionService.permission.UPDATE
  );
  const { editProjectStatus } = useAdmin();
  const { mutate: handleToggleProjectStatus, loading } = editProjectStatus;
  const { query } = useGlobal();
  const { params, push } = query;

  const { is_live, project_id } = params;

  const [handleChangeProjectStatus, cancel] = useDebounce((isLive) => {
    const newIsLiveStatus = is_live === "true" ? "false" : "true";
    if (loading || newIsLiveStatus === is_live.toString()) return;
    handleToggleProjectStatus({
      projectId: project_id,
      projectIsLiveStatus: isLive,
    });
  }, 2);

  useEffect(() => {
    return () => cancel();
    // eslint-disable-next-line
  }, []);

  const tabs = [
    {
      title: "Live",
      handleClick: () => {
        handleChangeProjectStatus(true);
        push({ ...params, is_live: true }, { replace: true });
      },
      value: PROFILES.LIVE_MODE,
    },
    {
      title: "Pursuit",
      handleClick: () => {
        handleChangeProjectStatus(false);
        push({ ...params, is_live: false }, { replace: true });
      },
      value: PROFILES.PROPOSAL_MODE,
    },
  ];
  if (!hasUpdatePermission) return null;
  return (
    <TabContext defaultActive={is_live ? 0 : 1} tabs={tabs}>
      <Switcher />
    </TabContext>
  );
};

export default ProjectStatus;
