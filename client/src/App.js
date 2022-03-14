import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Pokemons from "./components/Pokemons";
import {HomePage} from "./components/HomePage";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home" element={[<Navbar />, <Pokemons />]} />
      </Routes>
    </div>
  );
}

export default App;
