import axios from "axios";
import {MAIN_URL} from "../../URLS";

export const searchPokemon = (name) => {
    return async (dispatch, getState) => {
        dispatch({type: "@pokemons/loading", payload: true});
        if (name === "") {
            dispatch({type: "@pokemons/init", payload: getState().backup});
        } else {
            try {
                const {data} = await axios.get(
                    `${MAIN_URL}/pokemons/?name=${name.toLowerCase()}`
                );
                dispatch({
                    type: "@pokemons/searchByname",
                    payload: data,
                });
            } catch (e) {
                console.error(e)
            }
        }
        dispatch({type: "@pokemons/loading", payload: false});
    };
};
