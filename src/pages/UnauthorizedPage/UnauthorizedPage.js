import React from "react";
import { Button } from "carbon-components-react";
import { TriLoginApi } from "@tririga/tririga-react-components";
import { ReactComponent as NotAuthorized } from "./icons/Not-authorized.svg";
import { AppMsg } from "../../utils";

const cssBase = "unauthorizedPage";

export default class UnauthorizedPage extends React.PureComponent {
  render() {
    return (
      <div className={cssBase}>
        <NotAuthorized />
        <div className={`${cssBase}__header`}>
          {AppMsg.getMessage(AppMsg.MESSAGES.UNAUTHORIZED_TITLE)}
        </div>
        <div className={`${cssBase}__description`}>
          {AppMsg.getMessage(AppMsg.MESSAGES.UNAUTHORIZED_DESCRIPTION)}
        </div>
        <Button
          className={`${cssBase}__login`}
          kind="primary"
          onClick={this.handleLoginClick}
        >
          {AppMsg.getMessage(AppMsg.BUTTONS.LOGIN)}
        </Button>
      </div>
    );
  }

  handleLoginClick = async () => {
    await TriLoginApi.logout();
    location.reload();
  };
}
