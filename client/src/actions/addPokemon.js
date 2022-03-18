import axios from "axios";

export const addPokemon = (newPokemon) => {
  return async (dispatch) => {
    const petition = await axios.post(
      "http://localhost:3001/pokemons",
      newPokemon
    );
    dispatch({
      type: "@pokemons/addPokemon",
      payload: {newPokemon, pokemonId: petition.data[0].pokemonId},
    });
  };
};
