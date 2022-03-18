import {NavLink} from "react-router-dom";
import "../css/pagenotfound.css";

const PageNotFound = () => {
  return (
    <div className="error-container">
      <div className="error-card">
        <h2>Oops! U seem to be lost.</h2>
        <img
          src="https://www.pngplay.com/wp-content/uploads/11/Luxio-Pokemon-PNG-HD-Images.png"
          alt=""
        />
        <h1>404</h1>
        <NavLink to={"/"}>
          <button>Redirect</button>
        </NavLink>
      </div>
    </div>
  );
};

export default PageNotFound;
