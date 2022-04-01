import axios from "axios";

export const initPokemons = () => {
    return async (dispatch) => {
        dispatch({type: "@pokemons/loading", payload: true});
        try {
            const {data} = await axios.get("http://localhost:3001/pokemons");
            dispatch({type: "@pokemons/init", payload: data});
            dispatch({type: "@backup/init", payload: data});
        } catch (e) {
            dispatch({type: "@pokemons/init", payload: [{message: "Can´t get pokemons"}]});
        }
        dispatch({type: "@pokemons/loading", payload: false});
    };
};
