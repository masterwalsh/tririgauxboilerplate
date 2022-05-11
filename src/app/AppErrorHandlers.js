import { MessageServices } from "../services";

export function handleModelErrors(modelError, dispatch = true) {
  console.error(modelError);
  const { responseError, responseStatus } = modelError;
  if (
    responseStatus === 403 &&
    responseError &&
    responseError.errorType === "SecurityException"
  ) {
    MessageServices.showSecurityError();
  } else if (responseStatus === 401) {
    MessageServices.showSessionExpiredError();
  } else {
    MessageServices.showGeneralError();
  }
}
