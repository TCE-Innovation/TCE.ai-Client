import React from "react";
import { DeleteProjectModal, EditProjectModal } from "../Modals";
import Actions from "../../Actions";
import { Loader } from "../../../../common";

import { mutations } from "../../../../../hooks";
import { permissionService } from "../../../../../services";

const ProjectActions = ({ ...projectProps }) => {
  const hasDeletePermission = permissionService.getProjectPermission(
    permissionService.permission.DELETE
  );
  const hasEditPermission = permissionService.getProjectPermission(
    permissionService.permission.UPDATE
  );
  const deleteProject = mutations.useDeleteProject();
  const editProject = mutations.useEditProject();
  if (deleteProject.loading || editProject.loading)
    return (
      <div className="position-relative" style={{ width: "2.5em" }}>
        <Loader />
      </div>
    );
  return (
    <>
      <Actions>
        {hasDeletePermission && (
          <Actions.Delete
            disabled={deleteProject.loading}
            renderModal={(modalProps) => (
              <DeleteProjectModal
                {...modalProps}
                {...projectProps}
                deleteProject={deleteProject}
              />
            )}
          />
        )}
        {hasEditPermission && (
          <Actions.Edit
            disabled={editProject.loading}
            renderModal={(modalProps) => (
              <EditProjectModal
                {...modalProps}
                {...projectProps}
                editProject={editProject}
              />
            )}
          />
        )}
      </Actions>
    </>
  );
};

export default ProjectActions;
