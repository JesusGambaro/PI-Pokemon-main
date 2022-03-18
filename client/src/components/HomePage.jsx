import "../css/homepage.css";
import {NavLink} from "react-router-dom";

export const HomePage = () => {
  
  return (
    <div className="main">
      <div className="image">
        <img src="PosibleImages/pikachu-running.gif" alt="" />
      </div>
      <div className="text">
        <h1>Gotta Catch 'Em All!</h1>
        <NavLink to="/home">
          <button>Explore</button>
        </NavLink>
      </div>
    </div>
  );
};
