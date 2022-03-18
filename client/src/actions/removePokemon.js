import axios from "axios";

export const removePokemon = (id) => {
  return async (dispatch) => {
    await axios.delete(`http://localhost:3001/pokemons/${id}`);

    dispatch({type: "@pokemons/delete", payload: id});
  };
};
