//import {useState, useEffect} from "react";
import "../css/pokemons.css";
import {useSelector, useDispatch} from "react-redux";
import {initPokemons} from "../actions/initPokemons";
import {useEffect} from "react";
import Pagination from "./Pagination";

const Pokemons = () => {
  const pokemons = useSelector((state) => state.pokemons);
  //const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initPokemons());
  }, []);
  return <Pagination data={pokemons} pageLimit={4} cardsPerPage={10} />;
};

export default Pokemons;
