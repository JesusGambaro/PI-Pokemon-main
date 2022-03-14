import {useState, useEffect} from "react";
import "../css/pokemons.css";
import PokemonCard from "./PokemonCard";
import axios from "axios";
const Pokemons = () => {
  const array = [1, 2, 3, 3, 4, 5, 6];
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    (async () => {
      await axios.get("http://localhost:3001/types");
      const {data} = await axios.get("http://localhost:3001/pokemons");
      if (data) {
        setPokemons(() => data);
      }
    })();
  }, []);
  return (
    <div className="pokemons-container">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} props={pokemon} />
      ))}
    </div>
  );
};

export default Pokemons;
