export const filterBy = (filter, by) => {
  return async (dispatch, getState) => {
    if (by === "reset")
      dispatch({type: "@pokemons/filterByType", payload: getState().backup});
    else {
      let filtered =
        filter === "types"
          ? [...getState().pokemons.data]
          : [...getState().backup];
      switch (filter) {
        case "name":
          if (by === "a-z")
            filtered.sort((a, b) => {
              let c = a.name.toLowerCase(),
                d = b.name.toLowerCase();
              return c < d ? -1 : d > c ? 1 : 0;
            });
          else
            filtered.sort((b, a) => {
              let c = a.name.toLowerCase(),
                d = b.name.toLowerCase();
              return c < d ? -1 : d > c ? 1 : 0;
            });
          break;
        case "attack":
          if (by === "more")
            filtered.sort((a, b) => {
              return a.attack - b.attack;
            });
          else
            filtered.sort((a, b) => {
              return b.attack - a.attack;
            });
          break;
        case "types":
          filtered = filtered.filter(
            (e) =>
              e.types.filter((i) => {
                return i.toLowerCase() === by.toLowerCase();
              }).length > 0
          );
          break;
        case "creation":
          if (by === "api") {
            filtered = filtered.filter((e) => {
              return !e.id.toString().includes("-");
            });
          } else {
            filtered = filtered.filter((e) => {
              return e.id.toString().includes("-");
            });
          }
          break;
        default:
          break;
      }
      dispatch({type: "@pokemons/filterByType", payload: filtered});
    }
  };
};
