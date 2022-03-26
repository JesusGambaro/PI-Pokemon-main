//import {useState, useEffect} from "react";
import "../css/pokemons.css";
import {useSelector, useDispatch} from "react-redux";
import {initPokemons} from "../actions/initPokemons";
import {useEffect} from "react";
import Pagination from "./Pagination";

const Pokemons = () => {
    const pokemons = useSelector((state) => {
        //console.log("All States=>,", state);
        return state.pokemons;
    });
    //const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!pokemons.data.length)
            dispatch(initPokemons());
        //console.log("Se renderiza el componente")
    }, []);

    return <Pagination state={pokemons} pageLimit={4} cardsPerPage={12}/>;
};

export default Pokemons;
