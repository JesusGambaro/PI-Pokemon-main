import axios from "axios";

export const searchPokemon = (name) => {
    return async (dispatch, getState) => {
        dispatch({type: "@pokemons/loading", payload: true});
        if (name === "") {
            dispatch({type: "@pokemons/init", payload: getState().backup});
        } else {
            const {data} = await axios.get(
                `http://localhost:3001/pokemons/?name=${name.toLowerCase()}`
            );
            dispatch({
                type: "@pokemons/searchByname",
                payload: data,
            });
        }
        dispatch({type: "@pokemons/loading", payload: false});
    };
};
