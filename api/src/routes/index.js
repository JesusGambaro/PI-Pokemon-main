const {Router} = require("express");
const {
  getAllPokemons,
  getOnePokemonById,
  getAllTypes,
  addPokemon,
  updatePokemon,
  delPokemon,
} = require("../controllers/pokemon.controller");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getAllPokemons);
router.get("/pokemons/:id", getOnePokemonById);
router.get("/types", getAllTypes);
router.post("/pokemons", addPokemon);
router.put("/pokemons/edit/:id", updatePokemon);
router;
module.exports = router;
