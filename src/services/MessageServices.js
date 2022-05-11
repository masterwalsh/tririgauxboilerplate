import { AppMsg } from "../utils";

const subscribers = [];
let message = null;

export function addSubscriber(subscriber) {
  subscribers.push(subscriber);
}

function setMessage({
  kind,
  title,
  subtitle1 = "",
  subtitle2 = "",
  caption = "",
  hideCloseButton = false,
}) {
  message =
    kind != null
      ? {
          kind,
          title,
          subtitle1,
          subtitle2,
          caption,
          hideCloseButton,
        }
      : null;
  subscribers.forEach((subscriber) => {
    subscriber(message);
  });
}

export function clearMessage() {
  setMessage({
    kind: null,
  });
}

export function showSessionExpiredError() {
  setMessage({
    kind: "session_expired",
  });
}

export function showSecurityError() {
  setMessage({
    kind: "error",
    title: AppMsg.getMessage(AppMsg.ERRORS.SECURITY_ERROR_TITLE),
    subtitle1: AppMsg.getMessage(AppMsg.ERRORS.SECURITY_ERROR_DESCRIPTION),
    subtitle2: AppMsg.getMessage(AppMsg.ERRORS.SECURITY_ERROR_ACTION),
  });
}

export function showGeneralError() {
  setMessage({
    kind: "error",
    title: AppMsg.getMessage(AppMsg.ERRORS.GENERAL_ERROR_TITLE),
    subtitle1: AppMsg.getMessage(AppMsg.ERRORS.GENERAL_ERROR_DESCRIPTION),
  });
}
