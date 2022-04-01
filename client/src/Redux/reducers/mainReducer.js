const initialState = {
  data: [],
  loading: false,
};

export const mainReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "@pokemons/init":
      return {
        ...state,
        data: action.payload,
      };
    case "@pokemons/addPokemon":
      return {
        ...state,
        data: [
          ...state.data,
          {...action.payload.newPokemon, id: action.payload.pokemonId},
        ],
      };
    case "@pokemons/delete":
      return {
        ...state,
        data: state.data.filter((pokemon) => pokemon.id !== action.payload),
      };
    case "@pokemons/searchByname":
      return {...state, data: [action.payload]};
    case "@pokemons/loading":
      return {...state, loading: action.payload};
    case "@pokemons/filterByType":
      return {...state, data: action.payload};
    default:
      return state;
  }
};
