import {NavLink} from "react-router-dom";
import "../css/Navbar.css";
import {useDispatch, useSelector} from "react-redux";

const Navbar = ({detail}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.backup);
    const navLinkOff = {textDecoration: "none", color: "white"};

    return (
        <div className="navbar">
            <NavLink to={"/"} style={navLinkOff}>
                <h1>POKEDÉX</h1>
            </NavLink>
            <div className="middle-btns" style={{boxShadow: detail ? "inset 0 -.2rem 0 #fff" : ""}}>
                <NavLink to={"/home"} style={navLinkOff}>
                    <h1>HOME</h1>
                </NavLink>
                {detail && <div className="poke-reset">
                    <img title={"RESET"} onClick={() => dispatch({type: "@pokemons/init", payload: data})}
                         src="/Images/logo.png" alt="logo"/>
                </div>}
            </div>
            <NavLink to={"/create"} style={navLinkOff}>
                <h1>CREATE</h1>
            </NavLink>
        </div>
    );
};

export default Navbar;
