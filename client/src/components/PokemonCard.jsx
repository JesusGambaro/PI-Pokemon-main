import React from "react";
import "../css/pokemoncard.css";
const PokemonCard = ({props}) => {
  console.log("Soy las props: ", props);
  return (
    <div className="card-container">
      <h1>{props.name}</h1>
      <img src={props.sprites} alt="" />
      {props.types.map((type) => {
        if (type.type_name) return <p>{type.type_name}</p>;
        return <p>{type}</p>;
      })}
    </div>
  );
};

export default PokemonCard;
