import axios from "axios";
import {MAIN_URL} from "../../URLS";

export const removePokemon = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${MAIN_URL}/pokemons/${id}`);
        } catch (e) {
            console.error(e)
        }
        dispatch({type: "@pokemons/delete", payload: id});
        dispatch({type: "@backup/delete", payload: id});
    };
};
