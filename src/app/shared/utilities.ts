export const checkIfEmptyObject = obj => {
  if (obj === undefined || Object.entries(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};
