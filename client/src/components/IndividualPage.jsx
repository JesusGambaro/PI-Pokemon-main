import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../css/Detail-page.css";
import {NavLink} from "react-router-dom";
import Loading from "./Loading";
import {typesColors} from "./typesColors";
import {MAIN_URL} from "../URLS";
const DEFAULT_IMAGE =
  "https://c.tenor.com/FoeHB1WMoVUAAAAd/whos-that-pokemon-charmander.gif";
const IndividualPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const navLinkOff = {textDecoration: "none", color: "white"};

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {data} = await axios.get(`${MAIN_URL}/pokemons/${id}`);
        setDetailData(data);
      } catch (e) {
        return navigate("404-page");
      }
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="individual-container">
      {!Object.keys(detailData).length ? (
        <Loading />
      ) : (
        <div className="individual-card-container">
          {loading ? (
            <Loading />
          ) : (
            <>
              {!id.includes("-") && (
                <div className="poke-buttons">
                  <NavLink style={navLinkOff} to={`/home/${Number(id) - 1}`}>
                    <button
                      className="prev-pokemon"
                      disabled={Number(id) === 1}
                    >
                      &#8249;
                    </button>
                  </NavLink>
                  <NavLink style={navLinkOff} to={`/home/${Number(id) + 1}`}>
                    <button
                      className="next-pokemon"
                      disabled={Number(id) === 898}
                    >
                      <span>&#8250;</span>
                    </button>
                  </NavLink>
                </div>
              )}
              <div className="body-individual-card">
              <h1 className="pokeId">
                  {typeof id === "string" && id.includes("-")
                    ? "#own"
                    : "#" + id}
                </h1>
                <h1>{detailData.name}</h1>
                <img src={detailData.sprites || DEFAULT_IMAGE} alt="" />
              </div>
              <div className="stats-individual-card">
                <h2>STATS</h2>
                <ul>
                  <li>&#10084;&#65039;HP: {detailData.stats.hp}</li>
                  <li>&#9876;&#65039;Attack: {detailData.stats.attack}</li>
                  <li>&#128737;&#65039; Defense: {detailData.stats.defense}</li>
                  <li>&#x1F4A8;Speed: {detailData.stats.speed}</li>
                  <li>&#x1F4CF;Height: {detailData.stats.height / 10} m</li>
                  <li>
                    &#x2696;&#xFE0F;Weight: {detailData.stats.weight / 10} kg
                  </li>
                </ul>
                <div className="types-individual">
                  <h2>TYPES</h2>
                  <div className="each-type">
                    {detailData.types.map((e, i) => (
                      <p
                        style={{"--color": typesColors[e.toLowerCase()]}}
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
