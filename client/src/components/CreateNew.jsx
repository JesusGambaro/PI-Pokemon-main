import axios from "axios";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addPokemon} from "../actions/addPokemon";
import "../css/createNew.css";
import {useSelector} from "react-redux";
import Input from "./Input";
const CreateNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [types, setTypes] = useState([]);
  const [error, setError] = useState(true);
  const [data, setData] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    types: [],
    sprites: "",
  });
  useEffect(() => {
    setError(
      Object.values(data).every((e) => e.length && typeof e !== "undefined") &&
        !pokemons.find((e) => e.name === data.name)
    );
  }, [data]);
  useEffect(() => {
    (async () => {
      const {data} = await axios.get("http://localhost:3001/types");
      setTypes(() => data);
    })();
  }, []);

  const handleChange = (e) => {
    setData({...data, types: [...data.types, e.target.value]});
  };

  const handleDeleteType = (type) => {
    setData({...data, types: data.types.filter((t) => t !== type)});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPokemon(data));
    navigate("/home");
  };
  return (
    <div className="create-container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {Object.keys(data).map((el) => {
            if (el === "types") return null;
            return (
              <Input
                name={el}
                setData={(e) => setData({...data, [el]: e.target.value})}
              />
            );
          })}
          <button disabled={!error} type="submit">
            Save
          </button>
        </form>
        <select name="OS" onChange={handleChange}>
          {types.map((type) => (
            <option key={type.id} value={type.type_name}>
              {type.type_name}
            </option>
          ))}
        </select>
        <div className="selected-types">
          {data.types.map((type) => {
            return (
              <div className="type">
                {type}
                <button onClick={() => handleDeleteType(type)}>X</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
