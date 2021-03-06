import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import {removePokemon} from "../Redux/actions/removePokemon";
import "../css/Pokemon-card.css";
import {typesColors} from "./typesColors";

const DEFAULT_IMAGE =
  "https://c.tenor.com/FoeHB1WMoVUAAAAd/whos-that-pokemon-charmander.gif";

const PokemonCard = ({props}) => {
  const dispatch = useDispatch();

  const navLinkOff = {textDecoration: "none", color: "white"};

  const duplicates = props.types.filter((e) => {
    return Object.keys(typesColors).indexOf(e.toLowerCase()) !== -1;
  });
  const col = typesColors[duplicates[0].toString().toLowerCase()];

  let col2 = "transparent";
  if (duplicates.length > 1) {
    col2 = typesColors[duplicates[1].toString().toLowerCase()];
  }

  const style = {"--card-color": col, "--card-color2": col2};
  return (
    <div
      className={`card-container ${
        duplicates.length > 1 ? "two-types" : "one-type"
      }`}
      style={style}
    >
      <h3 className="pokeId">
        {typeof props.id === "string" && props.id.includes("-")
          ? "#own"
          : "#" + props.id}
      </h3>
      <span>
        <NavLink style={navLinkOff} to={`/home/${props.id}`}>
          <h1>{props.name}</h1>
        </NavLink>
        {typeof props.id === "string" && props.id.includes("-") && (
          <button onClick={() => dispatch(removePokemon(props.id))}>X</button>
        )}
      </span>
      <NavLink style={navLinkOff} to={`/home/${props.id}`}>
        <img src={props.sprites || DEFAULT_IMAGE} alt="" />
      </NavLink>
      <div className="types" style={{color: "white"}}>
        {props.types.map((type, i) => (
          <p key={i}>{type.charAt(0).toUpperCase() + type.substring(1)}</p>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
