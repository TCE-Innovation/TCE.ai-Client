import React from "react";
import { Overlay, Modal } from "../../../../../common";

import EmailFragment from "../../../Users/Forms/_Email";
import RoleFragment from "../../../Users/Forms/_Role";
import NameFragment from "../../../Users/Forms/_Name";

const AddUser = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <Overlay>
      <Modal
        onCancel={onClose}
        title="Add User to Project"
        buttonLabels={{
          submit: "Add User",
        }}
        styles={{
          submit: {
            color: "white",
            backgroundColor: "var(--chatbot-primary) important!",
          },
          cancel: {
            color: "black",
            backgroundColor: "transparent",
          },
        }}
      >
        <div className="projects-modal-wrapper">
          <form>
            <div>
              <EmailFragment />
            </div>
            <div>
              <NameFragment />
            </div>
            <div>
              <RoleFragment />
            </div>
            <div />
          </form>
        </div>
      </Modal>
    </Overlay>
  );
};

export default AddUser;
