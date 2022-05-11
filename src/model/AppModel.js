import { TriModel, getTriAppConfig } from "@tririga/tririga-react-components";

let appModel = null;

export function createAppModel(onError) {
  const { modelAndView, instanceId } = getTriAppConfig();
  return (appModel = new TriModel(modelAndView, instanceId, onError));
}

export function getAppModel() {
  return appModel;
}
