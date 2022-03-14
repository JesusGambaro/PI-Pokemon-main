export const getAllPokemons = (state, payload) => {
  switch (payload.action) {
    case "getAll":
      return;
    default:
      return state;
  }
};
