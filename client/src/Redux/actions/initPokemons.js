import axios from "axios";
import {MAIN_URL} from "../../URLS";

export const initPokemons = () => {
    return async (dispatch) => {
        dispatch({type: "@pokemons/loading", payload: true});
        try {
            const {data} = await axios.get(`${MAIN_URL}/pokemons`);
            dispatch({type: "@pokemons/init", payload: data});
            dispatch({type: "@backup/init", payload: data});
        } catch (e) {
            dispatch({type: "@pokemons/init", payload: [{message: "Can't get pokemons"}]});
        }
        dispatch({type: "@pokemons/loading", payload: false});
    };
};
