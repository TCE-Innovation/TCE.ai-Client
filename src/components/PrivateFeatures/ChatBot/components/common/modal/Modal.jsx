import React from "react";

import Wrapper from "./style";
import { CloseIcon } from "../../icons";
import { Loader } from "../../common";

import Portal from "../Portal";

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
  isSubmitting = false,
  showCloseBtn = false,
  isDisabled = false,
}) => {
  return (
    <Portal>
      <Wrapper>
        <div className="chatbot-modal-wrapper">
          <div className="chatbot-modal-header d-flex align-items-center justify-content-between">
            <div style={{ maxWidth: "80%" }}>{title}</div>
            {showCloseBtn && (
              <button className="chat-button" onClick={onCancel}>
                <CloseIcon />
              </button>
            )}
          </div>
          <div className="chatbot-modal-body">{children}</div>
          <div className="chatbot-modal-footer">
            {renderFooter ? (
              renderFooter
            ) : (
              <div className="chatbot-modal-buttons">
                <button
                  type="button"
                  onClick={onCancel}
                  style={styles.cancel}
                  disabled={isSubmitting}
                  className={`chat-button modal-cancel-btn`}
                >
                  {buttonLabels.cancel || buttonLabelsDefault.cancel}
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  style={styles.submit}
                  disabled={isSubmitting || isDisabled}
                  className={`chat-button modal-submit-btn`}
                >
                  <span style={{ flex: 1 }}>
                    {buttonLabels.submit || buttonLabelsDefault.submit}
                  </span>
                  {isSubmitting && (
                    <div className="position-relative" style={{ width: "2em" }}>
                      <>&zwnj;</>
                      {<Loader color={"var(--chatbot-grey)"} />}
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
    </Portal>
  );
};

export default Modal;
