import axios from "axios";
import {MAIN_URL} from "../../URLS";

export const addPokemon = (newPokemon) => {
    return async (dispatch) => {
        try {
            const pokemonAdded = await axios.post(
                `${MAIN_URL}/pokemons`,
                newPokemon
            );
            dispatch({
                type: "@pokemons/addPokemon",
                payload: {newPokemon, pokemonId: pokemonAdded.data[0].pokemonId},
            });
            dispatch({
                type: "@backup/addPokemon",
                payload: {newPokemon, pokemonId: pokemonAdded.data[0].pokemonId},
            });
        } catch (e) {
            console.error(e)
        }
    };
};
