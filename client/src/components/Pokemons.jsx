//import {useState, useEffect} from "react";
import "../css/Pokemons.css";
import {useSelector, useDispatch} from "react-redux";
import {initPokemons} from "../Redux/actions/initPokemons";
import {useEffect} from "react";
import Pagination from "./Pagination";

const Pokemons = () => {
  const pokemons = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pokemons.data.length) dispatch(initPokemons());
  }, []);
  
  return <Pagination state={pokemons} pageLimit={4} cardsPerPage={12} />;
};

export default Pokemons;
