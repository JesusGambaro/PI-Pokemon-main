import axios from "axios";

export const initPokemons = () => {
  return async (dispatch) => {
    //dispatch({type: "@loading/true"});
    const {data} = await axios.get("http://localhost:3001/pokemons");
    dispatch({type: "@pokemons/init", payload: data});
    //dispatch({type: "@loading/false"});
  };
};
