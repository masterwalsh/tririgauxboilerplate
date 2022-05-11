import React from "react";
import { createPortal } from "react-dom";
import { Route, Switch } from "react-router-dom";
import { Loading } from "carbon-components-react";
import { HomePage, CurrentUserPage } from "../pages";
import { Routes } from "../utils";
import { LoadingServices, MessageServices } from "../services";
import ShowAppMessages from "./ShowAppMessages";

const cssBase = "tririgaUXWebApp";

export default class TririgaUXWebApp extends React.PureComponent {
  componentDidMount() {
    MessageServices.addSubscriber(this.onMessageChange);
    LoadingServices.addSubscriber(this.onLoadingChange);
  }

  state = {
    message: null,
    loading: false,
  };

  render() {
    const { loading, message } = this.state;
    return (
      <div className={cssBase}>
        <Switch>
          <Route path={Routes.CURRENT_USER}>
            <CurrentUserPage />
          </Route>
          <Route path={Routes.HOME}>
            <HomePage />
          </Route>
        </Switch>
        <ShowAppMessages message={message} clearMessage={this.clearMessage} />
        {createPortal(<Loading active={loading} withOverlay />, document.body)}
      </div>
    );
  }

  onLoadingChange = (loading) => {
    this.setState({ loading });
  };

  onMessageChange = (message) => {
    this.setState({ message });
  };

  clearMessage = () => {
    MessageServices.clearMessage();
  };
}
