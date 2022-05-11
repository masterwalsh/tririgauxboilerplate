import React from "react";
import { UnorderedList, ListItem } from "carbon-components-react";
import { Routes, AppMsg } from "../../utils";
import { CurrentUserServices } from "../../services";
import { FooterButtons } from "../../components";

const cssBase = "currentUserPage";

export default class CurrentUserPage extends React.PureComponent {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    this.loadUser();
  }

  async loadUser() {
    let currentUser = null;
    try {
      currentUser = await CurrentUserServices.getCurrentUser();
    } catch (error) {
      currentUser = null;
    }
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className={cssBase}>
        <div className={`${cssBase}__header`}>
          {AppMsg.getMessage(AppMsg.MESSAGES.CURRENT_HEADER)}:
        </div>
        <UnorderedList className={`${cssBase}_list`}>
          <ListItem>First Name: {currentUser?.firstName}</ListItem>
          <ListItem>Last Name: {currentUser?.lastName}</ListItem>
          <ListItem>Language: {currentUser?._Language}</ListItem>
          <ListItem>Timezone: {currentUser?._TimeZoneId}</ListItem>
        </UnorderedList>
        <div className={`${cssBase}__content`} />
        <FooterButtons
          secondaryLabel={AppMsg.getMessage(AppMsg.BUTTONS.HOME)}
          secondaryRoute={Routes.HOME}
        />
      </div>
    );
  }
}
