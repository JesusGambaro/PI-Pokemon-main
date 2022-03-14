import {NavLink} from "react-router-dom";
import "../css/navbar.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to={"/"} style={{textDecoration: "none", color: "white"}}>
        <h1>POKEMON</h1>
      </NavLink>
    </div>
  );
};

export default Navbar;
