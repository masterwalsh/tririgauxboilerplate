import { LoadingServices } from ".";
import { CurrentUserDS } from "../model";

let currentUser = null;

export async function getCurrentUser() {
  if (currentUser != null) return currentUser;
  try {
    LoadingServices.setLoading("currentUser", true);
    currentUser = await CurrentUserDS.getCurrentUser();
  } finally {
    LoadingServices.setLoading("currentUser", false);
  }
  return currentUser;
}
