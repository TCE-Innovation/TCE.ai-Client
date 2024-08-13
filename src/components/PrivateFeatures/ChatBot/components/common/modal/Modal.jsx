import React from "react";

import Wrapper from "./style";

const buttonLabelsDefault = {
  cancel: "Cancel",
  submit: "Submit",
};

const Modal = ({
  children,
  title,
  renderFooter,
  onCancel = () => {},
  onSubmit = () => {},
  buttonLabels = buttonLabelsDefault,
  styles = {
    cancel: {},
    submit: {},
  },
}) => {
  return (
    <Wrapper>
      <div className="chatbot-modal-wrapper">
        <div className="chatbot-modal-header">{title}</div>
        <div className="chatbot-modal-body">{children}</div>
        <div className="chatbot-modal-footer">
          {renderFooter ? (
            renderFooter
          ) : (
            <div className="chatbot-modal-buttons">
              <button
                onClick={onCancel}
                style={styles.cancel}
                className={`chat-button modal-cancel-btn`}
              >
                {buttonLabels.cancel || buttonLabelsDefault.cancel}
              </button>
              <button
                onClick={onSubmit}
                style={styles.submit}
                className={`chat-button modal-submit-btn`}
              >
                {buttonLabels.submit || buttonLabelsDefault.submit}
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Modal;
