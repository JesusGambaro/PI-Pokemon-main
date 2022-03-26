
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {removePokemon} from "../actions/removePokemon";
import "../css/pokemoncard.css";
import { cardColors } from "./Types-colors";
const PokemonCard = ({props}) => {
  const dispatch = useDispatch();
  const navLinkOff = {textDecoration: "none", color: "white"};
  
  const duplicates = props.types.filter((e) => {
    return Object.keys(cardColors).indexOf(e) !== 1;
  });
  const col = cardColors[duplicates[0].toString().toLowerCase()];
  let col2 = "transparent";
  if (duplicates.length > 1) {
    col2 = cardColors[duplicates[1].toString().toLowerCase()];
  }

  const style = {"--card-color": col, "--card-color2": col2};
  return (
    <div
      className={`card-container ${
        duplicates.length > 1 ? "two-types" : "one-type"
      }`}
      style={style}
    >
      <span>
        <NavLink style={navLinkOff} to={`/home/${props.id}`}>
          <h1>{props.name}</h1>
        </NavLink>
        {typeof props.id === "string" && props.id.includes("-") && (
          <button onClick={() => dispatch(removePokemon(props.id))}>X</button>
        )}
      </span>
      <NavLink style={navLinkOff} to={`/home/${props.id}`}>
        <img src={props.sprites} alt="" />
      </NavLink>
      <div className="types" style={{"color":"white"}}>
        {props.types.map((type) => (
          <p key={Math.floor(Math.random() * 9999)}>{type}</p>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
