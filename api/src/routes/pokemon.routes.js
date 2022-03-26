const {Router} = require("express");
const {
  getAllPokemons,
  getDbPokemons,
  getOnePokemonById,
  addPokemon,
  updatePokemon,
  delPokemon,
} = require("../controllers/pokemon.controller");
const axios = require("axios");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const {name} = req.query;
    if (name) {
      const dataFromDb = await getDbPokemons();
      const founded = dataFromDb.find((e) => e.name.toLowerCase() === name.toLowerCase());
      if (founded) {
        return res.send({
          id: founded.id,
          name: founded.name,
          types: founded.types,
          sprites: founded.sprites,
        });
      } else {
        try {
          const {data} = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          console.log(data.sprites.other["dream_world"]);
          return res.send({
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            types: data.types.map(
              (type) =>
                type["type"]["name"].charAt(0).toUpperCase() +
                type["type"]["name"].substring(1)
            ),
            sprites:
              data.sprites.other["dream_world"].front_default ||
              data.sprites.other["official-artwork"].front_default,
          });
        } catch (e) {
          return res.send({message: "Pokemon not found"});
        }
      }
    } else {
      const data = await getAllPokemons();
      res.send(data);
    }
  } catch (e) {
    next(e);
  }
});
router.get("/:id", getOnePokemonById);
router.post("/", addPokemon);
router.put("/edit/:id", updatePokemon);
router.delete("/:id", delPokemon);

module.exports = router;
