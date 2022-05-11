import { getAppModel } from "../AppModel";
import { DatasourceNames } from "../../utils";

export async function getCurrentUser() {
  const response = await getAppModel().getRecord(
    DatasourceNames.CURRENT_USER_DS_NAME
  );
  const currentUser = response.data;
  return currentUser && currentUser._id ? currentUser : null;
}
