import {useState} from "react";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";
const Pagination = ({data, pageLimit, cardsPerPage}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(data.length / pageLimit);
  console.log("Limit=>", pages);
  const nextPage = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };
  const goPage = (e) => {

  };
  const dataPerPage = () => {
      const start
  };
  const dividedGroups = () => {};
  return (
    <div className="pokemons-container">
      {!data.length && <Loading />}
      {data.map((pokemon) => (
        <PokemonCard key={pokemon.id} props={pokemon} />
      ))}
    </div>
  );
};

export default Pagination;
