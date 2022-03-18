import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../css/individualpage.css";
import Loading from "./Loading";
const IndividualPage = (props) => {
  const {id} = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      const {data} = await axios.get(`http://localhost:3001/pokemons/${id}`);
      setData(data);
    })();
  }, []);
  return (
    <div className="individual-container">
      {!Object.keys(data).length ? (
        <Loading />
      ) : (
        <div className="individual-card-container">
          <div className="body-individual-card">
            <h1>{data.name}</h1>
            <img src={data.sprites} alt="" />
          </div>
          <div className="stats-individual-card">
            <h2>STATS</h2>
            <ul>
              <li>HP: {data.stats.hp}</li>
              <li>Attack: {data.stats.attack}</li>
              <li>Defense: {data.stats.defense}</li>
              <li>Speed: {data.stats.speed}</li>
              <li>Height: {data.stats.height}</li>
              <li>Weight: {data.stats.weight}</li>
            </ul>
            <h2>TYPES</h2>
            {data.types.map((e) => (
              <p>{e}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualPage;
