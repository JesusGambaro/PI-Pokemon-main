export const backupReducer = (state = [], action) => {
    switch (action.type) {
        case "@backup/init":
            return action.payload;
        case "@backup/addPokemon":
            return [
                ...state,
                {...action.payload.newPokemon, id: action.payload.pokemonId},
            ]
        case "@backup/delete":
            return state.filter((pokemon) => pokemon.id !== action.payload);
        default:
            return state;
    }
};
