import {
  getTranslatedMessages,
  getTriAppConfig,
} from "@tririga/tririga-react-components";
import messages from "./messages.json";
import errorMessages from "./errorMessages.json";
import buttonsMessages from "./buttonsMessages.json";

const VERSION = process.env.REACT_APP_VERSION;

const baseMessages = {
  ...messages,
  ...errorMessages,
  ...buttonsMessages,
};

let appMessages = null;

export const BUTTONS = {
  HOME: "HOME",
  CURRENT_USER: "CURRENT_USER",
  REFRESH: "REFRESH",
  LOGIN: "LOGIN",
};

export const ERRORS = {
  SESSION_EXPIRED_ERROR_TITLE: "SESSION_EXPIRED_ERROR_TITLE",
  SESSION_EXPIRED_ERROR_DESCRIPTION: "SESSION_EXPIRED_ERROR_DESCRIPTION",
  SECURITY_ERROR_TITLE: "SECURITY_ERROR_TITLE",
  SECURITY_ERROR_DESCRIPTION: "SECURITY_ERROR_DESCRIPTION",
  SECURITY_ERROR_ACTION: "SECURITY_ERROR_ACTION",
  GENERAL_ERROR_TITLE: "GENERAL_ERROR_TITLE",
  GENERAL_ERROR_DESCRIPTION: "GENERAL_ERROR_DESCRIPTION",
};

export const MESSAGES = {
  HOME_HEADER: "HOME_HEADER",
  CURRENT_HEADER: "CURRENT_HEADER",
  UNAUTHORIZED_TITLE: "UNAUTHORIZED_TITLE",
  UNAUTHORIZED_DESCRIPTION: "UNAUTHORIZED_DESCRIPTION",
};

export function getMessage(label) {
  return appMessages[label];
}

export async function initMessages(languageId) {
  if (!appMessages) {
    try {
      appMessages = await getTranslatedMessages(
        baseMessages,
        getTriAppConfig().appExposedName + VERSION,
        languageId
      );
    } catch (error) {
      appMessages = baseMessages;
    }
  }
}
