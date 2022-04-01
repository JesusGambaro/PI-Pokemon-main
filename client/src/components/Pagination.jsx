import {useEffect, useState} from "react";
import PokemonCard from "./PokemonCard";
import Loading from "./Loading";
import FilterSearchBar from "../components/FilterSearchBar";

const Pagination = ({state, pageLimit, cardsPerPage}) => {
  const {data, loading} = state;
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(data.length / cardsPerPage);

  const nextPage = () => setCurrentPage((currentPage) => currentPage + 1);

  const prevPage = () => setCurrentPage((currentPage) => currentPage - 1);

  const goPage = (e) => setCurrentPage(Number(e.target.textContent));

  useEffect(() => {
    if (data.length < 40) setCurrentPage(1);
  }, [data]);

  const dataPerPage = () => {
    const start = currentPage * cardsPerPage - cardsPerPage,
      end = start + cardsPerPage;
    return data.slice(start, end);
  };

  const dividedGroups = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, i) => {
      let limit = start + i + 1;
      return limit <= pages && limit;
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <>
      <FilterSearchBar />
      <div className="home-container">
        <div className="pokemons-container">
          {loading ? (
            <Loading />
          ) : data.length > 0 ? (
            dataPerPage().map((pokemon, i) =>
              pokemon.hasOwnProperty("message") ? (
                <h1 key={i}>{pokemon.message}</h1>
              ) : (
                <PokemonCard key={i} props={pokemon} change={currentPage} />
              )
            )
          ) : (
            <h1 style={{color: "black"}}>There are no pokemons</h1>
          )}
        </div>
      </div>
      {data.length > 1 && (
        <div className="pagination-container">
          <div className="selection">
            <button
              className="btn prev"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              &#8249;
            </button>

            {dividedGroups().map((e, i) => {
              return (
                e && (
                  <button
                    className={currentPage === i + 1 ? "btn active" : "btn"}
                    key={i}
                    onClick={goPage}
                  >
                    {e}
                  </button>
                )
              );
            })}

            <button
              className="btn next"
              onClick={nextPage}
              disabled={currentPage === pages}
            >
              &#8250;
            </button>
          </div>
        </div>
      )}
      )
    </>
  );
};
export default Pagination;
