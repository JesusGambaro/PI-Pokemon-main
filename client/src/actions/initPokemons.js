import axios from "axios";

export const initPokemons = () => {
    return async (dispatch) => {
        dispatch({type: "@pokemons/loading", payload: true});
        const {data} = await axios.get("http://localhost:3001/pokemons");
        dispatch({type: "@pokemons/init", payload: data});
        dispatch({type: "@backup/init", payload: data});
        dispatch({type: "@pokemons/loading", payload: false});
    };
};
