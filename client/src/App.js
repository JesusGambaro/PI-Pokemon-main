import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Pokemons from "./components/Pokemons";
import {HomePage} from "./components/HomePage";
import CreateNew from "./components/CreateNew";
import PageNotFound from "./components/PageNotFound";
import IndividualPage from "./components/IndividualPage";
import {BrowserRouter} from "react-router-dom";

function App() {
    const styles = {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        width: "100%",
    };
    return (
        <BrowserRouter>
            <div style={styles}>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route
                        path="/home/:id"
                        element={[<Navbar key={"nav"}/>, <IndividualPage key={"i"}/>]}
                    />
                    <Route
                        path="/home"
                        element={[<Navbar key={"nav"} detail={true}/>, <Pokemons key={"all"}/>]}
                    />
                    <Route
                        path="/create"
                        element={[<Navbar key={"nav"}/>, <CreateNew key={"create"}/>]}
                    />
                    <Route path="*" exact={true} element={<PageNotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
