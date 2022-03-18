import React from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {removePokemon} from "../actions/removePokemon";
import "../css/pokemoncard.css";
const PokemonCard = ({props}) => {
  const dispatch = useDispatch();
  const navLinkOff = {textDecoration: "none", color: "white"};
  return (
    <div className="card-container">
      <span style={{display: "flex"}}>
        <NavLink style={navLinkOff} to={`/home/${props.id}`}>
          <h1>{props.name}</h1>
        </NavLink>
        {typeof props.id === "string" && props.id.includes("-") && (
          <button onClick={() => dispatch(removePokemon(props.id))}>X</button>
        )}
      </span>
      <img src={props.sprites} alt="" />
      {props.types.map((type) => (
        <p key={Math.floor(Math.random() * 9999)}>{type}</p>
      ))}
    </div>
  );
};

export default PokemonCard;
