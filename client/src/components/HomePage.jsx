import "../css/Homepage.css";
import {NavLink} from "react-router-dom";

export const HomePage = () => {
    return (
        <div className="main">
            <h1 className="tittle">POKEDÉX</h1>
            <div className="pokedex">
                <div className="circles-container">
                    <div className="circles-section">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                </div>
                <div className="door-section">
                    <div className="display2">
                        <div className="display">
                            <div className="dots">
                                <span></span>
                                <span></span>
                            </div>
                            <div className="display-glass">
                                <img
                                    className="image-p"
                                    src="/Images/pikachu.gif"
                                    alt="Wall"
                                />
                            </div>
                            <div className="buttons-apart">
                                <div className="btn"></div>
                                <div className="speaker">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="controllers-section">
                        <div className="round-btn"></div>

                        <div className="middle-section">
                            <div className="two-btns">
                                <span></span>
                                <span></span>
                            </div>
                            <NavLink style={{textDecoration: "none"}} to="/home">
                                <button className="green-display">
                                    <h1>EXPLORE</h1>
                                </button>
                            </NavLink>
                        </div>
                        <div className="plus-btn2">
                            <div className="plus-btn"></div>
                        </div>
                    </div>
                </div>
                <div className="cover">
                    <div className="front">
                        <div className="door-container">
                            <div className="triangle">
                                <div className="triangle2"></div>
                            </div>
                            <div className="footer-rectangle"></div>
                        </div>
                        <div className="hinges-section">
              <span>
                <div className="hinge1"></div>
              </span>
                            <span>
                <div className="hinge2"></div>
              </span>
                        </div>
                    </div>
                    <div className="back">
                        <div className="door-container">
                            <div className="command-container">
                                <div className="display-back">
                                    <h1>Gotta Catch 'Em All!</h1>
                                </div>
                                <div className="btns-back">
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                    <i></i>
                                </div>
                                <div className="mid-btns">
                                    <span></span>
                                    <span></span>
                                </div>
                                <div className="controlls-back">
                                    <div className="btn-divisor"></div>
                                    <div className="divisor">
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className="btns-down-back">
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                        <div className="hinges-section">
              <span>
                <div className="hinge1"></div>
              </span>
                            <span>
                <div className="hinge2"></div>
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};