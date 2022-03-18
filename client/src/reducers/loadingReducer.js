export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case "@loading/true":
      return true;
    case "@loading/false":
      return false;
    default:
      return state;
  }
};
