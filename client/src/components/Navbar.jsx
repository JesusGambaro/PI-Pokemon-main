import {NavLink} from "react-router-dom";
import "../css/navbar.css";
const Navbar = () => {
  const navLinkOff = {textDecoration: "none", color: "white"};
  return (
    <div className="navbar">
      <NavLink to={"/"} style={navLinkOff}>
        <h1>HOME</h1>
      </NavLink>
      <NavLink to={"/home"} style={navLinkOff}>
        <img src="./PosibleImages/logo.png" alt="logo" />
      </NavLink>
      <NavLink to={"/create"} style={navLinkOff}>
        <h1>CREATE</h1>
      </NavLink>
    </div>
  );
};

export default Navbar;
