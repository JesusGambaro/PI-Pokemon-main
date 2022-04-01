import axios from "axios";

export const removePokemon = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3001/pokemons/${id}`);
        } catch (e) {
            console.log(e)
        }
        dispatch({type: "@pokemons/delete", payload: id});
        dispatch({type: "@backup/delete", payload: id});
    };
};
