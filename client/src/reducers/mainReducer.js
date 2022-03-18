export const mainReducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case "@pokemons/init":
      return action.payload;
    case "@pokemons/addPokemon":
      return [
        ...state,
        {...action.payload.newPokemon, id: action.payload.pokemonId},
      ];
    case "@pokemons/delete":
      return state.filter((pokemon) => pokemon.id !== action.payload);
    default:
      return state;
  }
};
