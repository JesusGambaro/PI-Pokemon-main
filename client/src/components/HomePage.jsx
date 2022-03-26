import "../css/homepage.css";
import {NavLink} from "react-router-dom";

export const HomePage = () => {
  return (
    <div className="main">
      <h1 className="tittle">POKEDÉX</h1>
      <div class="pokedex">
        <div class="circles-container">
          <div class="circles-section">
            <div class="circle1"></div>
            <div class="circle2"></div>
            <div class="circle3"></div>
            <div class="circle4"></div>
          </div>
        </div>
        <div class="door-section">
          <div class="display2">
            <div class="display">
              <div class="dots">
                <span></span>
                <span></span>
              </div>
              <div className="display-glass">
                <img
                  class="image-p"
                  src="PosibleImages/pikachu.gif"
                  alt="Wall"
                />
              </div>
              <div class="buttons-apart">
                <div class="btn"></div>
                <div class="speaker">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="controllers-section">
            <div className="round-btn"></div>

            <div class="middle-section">
              <div class="two-btns">
                <span></span>
                <span></span>
              </div>
              <NavLink style={{textDecoration: "none"}} to="/home">
                <button class="green-display">
                  <h1>EXPLORE</h1>
                </button>
              </NavLink>
            </div>
            <div class="plus-btn2">
              <div class="plus-btn"></div>
            </div>
          </div>
        </div>
        <div class="cover">
          <div class="front">
            <div class="door-container">
              <div class="triangle">
                <div class="triangle2"></div>
              </div>
              <div class="footer-rectangle"></div>
            </div>
            <div class="hinges-section">
              <span>
                <div class="hinge1"></div>
              </span>
              <span>
                <div class="hinge2"></div>
              </span>
            </div>
          </div>
          <div class="back">
            <div class="door-container">
              <div class="command-container">
                <div class="display-back">
                  <h1>Gotta Catch 'Em All!</h1>
                </div>
                <div class="btns-back">
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
                <div class="mid-btns">
                  <span></span>
                  <span></span>
                </div>
                <div class="controlls-back">
                  <div class="btn-divisor"></div>
                  <div class="divisor">
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div class="btns-down-back">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <div class="hinges-section">
              <span>
                <div class="hinge1"></div>
              </span>
              <span>
                <div class="hinge2"></div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
