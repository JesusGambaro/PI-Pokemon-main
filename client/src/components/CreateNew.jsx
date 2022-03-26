import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addPokemon} from "../actions/addPokemon";
import "../css/createNew.css";
import Input from "./Input";
import {Types} from "./Types";

const CreateNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({
    name: false,
    hp: false,
    attack: false,
    defense: false,
    speed: false,
    height: false,
    weight: false,
    types: false,
    sprites: false,
  });
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    sprites: "",
  });

  const handleChange = (e) => {
    if (data.types.length < 2 && data.types.indexOf(e.target.value) < 0)
      setData({...data, types: [...data.types, e.target.value]});
  };

  const handleDeleteType = (type) => {
    console.log(
      data.types,
      data.types.filter((t) => t !== type)
    );
    setData({...data, types: data.types.filter((t) => t !== type)});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    if (
      Object.values(error).some((e) => {
        console.log(e);
        return e === true;
      }) ||
      Object.values(data)
        .slice(0, 8)
        .some((e) => e === "" || e.length === 0)
    ) {
      return;
    }
    dispatch(addPokemon(data));
    navigate("/home");
  };
  useEffect(() => {
    if (submit) {
      setError({
        name: !data.name,
        types: data.types.length < 1,
        weight: !data.weight,
        height: !data.height,
        speed: !data.speed,
        defense: !data.defense,
        attack: !data.attack,
        hp: !data.hp,
      });
    }
  }, [submit, data]);
  return (
    <div className="create-container">
      <div className="form-container">
       {/*  <h1 style={{color: "white"}}>Create new pokemon</h1> */}
        <form onSubmit={handleSubmit}>
          {Object.keys(data).map((el, i) => {
            if (el === "types") return null;
            return (
              <Input
                key={i}
                name={el}
                setData={(e) => setData({...data, [el]: e.target.value})}
                error={error}
              />
            );
          })}
          <div className="types">
            <Types
              handleChange={handleChange}
              disable={data.types.length >= 2}
            />
            <div className="selected-types">
              {data.types.map((type, i) => {
                return (
                  <span key={i} className="type">
                    {type}
                    <button
                      type="button"
                      onClick={() => handleDeleteType(type)}
                    >
                      X
                    </button>
                  </span>
                );
              })}
              {error.types ? <p>Types are required &#9888;</p> : null}
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateNew;
