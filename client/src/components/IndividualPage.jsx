import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../css/individualpage.css";
import {NavLink} from "react-router-dom";
import Loading from "./Loading";
import {cardColors} from "./Types-colors";
const navLinkOff = {textDecoration: "none", color: "white"};
const IndividualPage = (props) => {
  const {id} = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const {data} = await axios.get(`http://localhost:3001/pokemons/${id}`);
      setData(data);
      setLoading(false);
    })();
  }, [id]);
  return (
    <div className="individual-container">
      {!Object.keys(data).length ? (
        <Loading />
      ) : (
        <div className="individual-card-container">
          {loading ? (
            <Loading />
          ) : (
            <>
              {" "}
              {!id.includes("-") && (
                <div className="poke-buttons">
                  <NavLink style={navLinkOff} to={`/home/${Number(id) - 1}`}>
                    <button
                      className="prev-pokemon"
                      disabled={Number(id) === 1}
                    >
                      &#8249; PREV
                    </button>
                  </NavLink>
                  <NavLink style={navLinkOff} to={`/home/${Number(id) + 1}`}>
                    <button
                      className="next-pokemon"
                      disabled={Number(id) === 898}
                    >
                      NEXT <span>&#8250;</span>
                    </button>
                  </NavLink>
                </div>
              )}
              <div className="body-individual-card">
                <h1>{data.name}</h1>
                <img src={data.sprites} alt="" />
              </div>
              <div className="stats-individual-card">
                <h2>STATS</h2>
                <ul>
                  <li>&#10084;&#65039;HP: {data.stats.hp}</li>
                  <li>&#9876;&#65039;Attack: {data.stats.attack}</li>
                  <li>&#128737;&#65039; Defense: {data.stats.defense}</li>
                  <li>&#x1F4A8;Speed: {data.stats.speed}</li>
                  <li>&#x1F4CF;Height: {data.stats.height / 10} m</li>
                  <li>&#x2696;&#xFE0F;Weight: {data.stats.weight / 10} kg</li>
                </ul>
                <div className="types-individual">
                  <h2>TYPES</h2>
                  <div className="each-type">
                    {data.types.map((e, i) => (
                      <p
                        style={{"--color": cardColors[e.toLowerCase()]}}
                        key={i}
                      >
                        {e}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IndividualPage;
