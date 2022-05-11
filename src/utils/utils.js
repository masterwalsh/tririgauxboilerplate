export const computeLoading = (loadingMap) => {
  for (const loadingValue of loadingMap.values()) {
    if (loadingValue) return true;
  }
  return false;
};
