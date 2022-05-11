/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  standardTririgaLogin,
  fetchTriAppConfig,
  getAuthCheckerForCurrentApp,
} from "@tririga/tririga-react-components";
import { TririgaUXWebApp, AppErrorHandlers } from "./app";
import { createAppModel } from "./model";
import { UnauthorizedPage } from "./pages";
import { AppMsg } from "./utils";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

async function initApp() {
  console.log("running fetch triappconfig")
  const appConfig = await fetchTriAppConfig();
  console.log("running stadnardTRirigaLogin")
  const currentUser = await standardTririgaLogin();
  if (currentUser != null) {
    console.log("running getAuthCheckerForCurrentApp")
    const authChecker = await getAuthCheckerForCurrentApp();
    if (authChecker.hasMinimumAppPermission()) {
      console.log("hasMin permission true")
      renderApp(currentUser, appConfig);
    } else {
      console.log("else render unauth")
      renderUnauthorizedAccess(currentUser);
    }
  }
}

async function renderUnauthorizedAccess(currentUser) {
  const rootElement = document.getElementById("root");
  rootElement.dir = currentUser.userDirection;
  await AppMsg.initMessages(currentUser.languageId);
  ReactDOM.render(<UnauthorizedPage />, rootElement);
}

async function renderApp(currentUser, appConfig) {
  const rootElement = document.getElementById("root");
  rootElement.dir = currentUser.userDirection;
  console.log(currentUser.userDirection)
  createAppModel(AppErrorHandlers.handleModelErrors);
  console.log("running AppErrorHandlers")
  await AppMsg.initMessages(currentUser.languageId);
  ReactDOM.render(
    <BrowserRouter basename={appConfig.appPath}>
      <TririgaUXWebApp />
    </BrowserRouter>,
    rootElement
  );
  serviceWorker.register();
}

initApp();
