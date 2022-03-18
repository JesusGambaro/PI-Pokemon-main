import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Pokemons from "./components/Pokemons";
import {HomePage} from "./components/HomePage";
import CreateNew from "./components/CreateNew";
import PageNotFound from "./components/PageNotFound";
import IndividualPage from "./components/IndividualPage";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/home/:id" element={[<Navbar />, <IndividualPage />]} />
        <Route path="/home" element={[<Navbar />, <Pokemons />]} />
        <Route path="/create" element={[<Navbar />, <CreateNew />]} />
        <Route path="*" exact={true} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
