import React from "react";
import { createPortal } from "react-dom";
import { ToastNotification, Modal } from "carbon-components-react";
import PropTypes from "prop-types";
import { AppMsg } from "../utils";

const cssBase = "showAppMessages";

export default class ShowAppMessages extends React.PureComponent {
  static propTypes = {
    message: PropTypes.object,
    clearMessage: PropTypes.func,
  };

  render() {
    const { message, clearMessage } = this.props;
    return (
      <>
        {message != null &&
          message.kind === "session_expired" &&
          createPortal(
            <Modal
              className={`${cssBase}__modal`}
              modalHeading={AppMsg.getMessage(
                AppMsg.ERRORS.SESSION_EXPIRED_ERROR_TITLE
              )}
              modalAriaLabel={AppMsg.getMessage(
                AppMsg.ERRORS.SESSION_EXPIRED_ERROR_TITLE
              )}
              primaryButtonText={AppMsg.getMessage(AppMsg.BUTTONS.REFRESH)}
              onRequestSubmit={this.handleRefreshClick}
              open
              size="xs"
            >
              <p>
                {AppMsg.getMessage(
                  AppMsg.ERRORS.SESSION_EXPIRED_ERROR_DESCRIPTION
                )}
              </p>
            </Modal>,
            document.body
          )}
        {message != null &&
          message.kind !== "session_expired" &&
          createPortal(
            <ToastNotification
              className={`${cssBase}__toast`}
              kind={message.kind}
              title={message.title}
              statusIconDescription={message.title}
              subtitle={
                <div>
                  <div>{message.subtitle1}</div>
                  <div>{message.subtitle2}</div>
                </div>
              }
              caption={message.caption}
              hideCloseButton={message.hideCloseButton}
              lowContrast
              timeout={message.kind === "error" ? 0 : 5000}
              onCloseButtonClick={clearMessage}
            />,
            document.body
          )}
      </>
    );
  }

  handleRefreshClick = () => {
    window.location.reload();
  };
}
