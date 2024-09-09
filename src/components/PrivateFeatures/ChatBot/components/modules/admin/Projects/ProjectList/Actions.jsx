import React from "react";
import { DeleteProjectModal, EditProjectModal } from "../Modals";
import Actions from "../../Actions";
import { Loader } from "../../../../common";

import { mutations } from "../../../../../hooks";

const ProjectActions = ({ ...projectProps }) => {
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
      </Actions>
    </>
  );
};

export default ProjectActions;
