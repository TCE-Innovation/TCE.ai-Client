import React from "react";
import { DeleteProjectModal, EditProjectModal } from "./Modals";
import Actions from "../Actions";

import { mutations } from "../../../../hooks";

const ProjectActions = ({ ...projectProps }) => {
  const deleteProject = mutations.useDeleteProject();
  const editProject = mutations.useEditProject();
  return (
    <>
      <Actions>
        <Actions.Delete
          disabled={editProject.loading}
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
