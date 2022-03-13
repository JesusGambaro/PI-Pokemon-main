const {Router} = require("express");
const {
  getAllPokemons,
  getOneApiPokemonById,
  addPokemon,
  updatePokemon,
  delPokemon,
} = require("../controllers/pokemon.controller");

const router = Router();

router.get("/", getAllPokemons);
router.get("/:id", getOneApiPokemonById);
router.post("/", addPokemon);
router.put("/edit/:id", updatePokemon);
router.delete("/:id", delPokemon);

module.exports = router;
