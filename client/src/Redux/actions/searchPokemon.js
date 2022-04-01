import axios from "axios";

export const searchPokemon = (name) => {
    return async (dispatch, getState) => {
        dispatch({type: "@pokemons/loading", payload: true});
        if (name === "") {
            dispatch({type: "@pokemons/init", payload: getState().backup});
        } else {
            try {
                const {data} = await axios.get(
                    `http://localhost:3001/pokemons/?name=${name.toLowerCase()}`
                );
                dispatch({
                    type: "@pokemons/searchByname",
                    payload: data,
                });
            } catch (e) {
                console.log(e)
            }
        }
        dispatch({type: "@pokemons/loading", payload: false});
    };
};
