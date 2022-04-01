import {useState} from "react";
import {useDispatch} from "react-redux";
import {searchPokemon} from "../Redux/actions/searchPokemon";
import {Types} from "./Types";
import {filterBy} from "../Redux/actions/filterBy";
import "../css/Filter-search-bar.css";

const FilterSearchBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchPokemon(search));
        //setSearch(""); => Reset input field (optional)
    };

    const handleChange = (e) => {
        dispatch(filterBy(e.target.name, e.target.value));
    };

    return (
        <div className="filter-search-bar">
            <div className="filters-section">
                <select name="name" onChange={handleChange}>
                    <option value="reset">Filter by name</option>
                    <option value="a-z">Ascending</option>
                    <option value="z-a">Descending</option>
                </select>
                <select name="attack" onChange={handleChange}>
                    <option value="reset">Filter by attack</option>
                    <option value="more">Ascending</option>
                    <option value="less">Descending</option>
                </select>
                <Types handleChange={handleChange} filter={true}/>
                <select name="creation" onChange={handleChange}>
                    <option value="reset">Filter by creation</option>
                    <option value="own">Own</option>
                    <option value="api">Api</option>
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                <button title="Search Pokemon" type="submit">&#128269;</button>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </form>
        </div>
    );
};

export default FilterSearchBar;
