const {Router} = require("express");
const {
  getAllPokemons,
  getOnePokemonById,
  addPokemon,
  //updatePokemon,
  delPokemon,
} = require("../controllers/pokemon.controller");
const axios = require("axios");

const router = Router();

router.get("/", getAllPokemons);
router.get("/:id", getOnePokemonById);
router.post("/", addPokemon);
//router.put("/edit/:id", updatePokemon);
router.delete("/:id", delPokemon);

module.exports = router;
