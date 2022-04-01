import {NavLink} from "react-router-dom";
import "../css/Page-not-found.css";

const PageNotFound = () => {
    return (
        <div className="error-container">
            <div className="error-card">
                <h2>Oops! U seem to be lost.</h2>
                <img
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/404.svg"
                    alt="404"
                />
                <h1>404</h1>
                <NavLink to={"/home"}>
                    <button>Redirect</button>
                </NavLink>
            </div>
        </div>
    );
};

export default PageNotFound;
