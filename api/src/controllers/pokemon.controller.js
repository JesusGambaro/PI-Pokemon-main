const {default: axios} = require("axios");
const {Pokemon, Types} = require("../db");
const DEFAULT_IMAGE =
  "https://th.bing.com/th/id/R.59dea9fdb6df1ba48c78f9f15313e18c?rik=eCryW%2b%2bKu6aVkA&riu=http%3a%2f%2f3.bp.blogspot.com%2f-41nAAVDLCf8%2fTdpa5in-1eI%2fAAAAAAAAACI%2f4QECNPqOt2s%2fs1600%2fWhos_that_pokemon_meme_by_CosmoJames.jpg&ehk=3R85PH9sY3XbnNTm6FYgBoV2guzcE5G2W3h4QdEkE18%3d&risl=&pid=ImgRaw&r=0";
const getFromDb = async () => {
  const dbData = await Pokemon.findAll({include: Types});
  const pokemons = dbData.map((e) => ({
    id: e.id,
    name: e.name.substring(0, 1).toUpperCase() + e.name.substring(1),
    types: e.types.map(
      (t) =>
        t.type_name.substring(0, 1).toUpperCase() + t.type_name.substring(1)
    ),
    sprites: e.sprites,
  }));
  return pokemons;
};
const allPokemonsMerge = async () => {
  const {data} = await axios.get(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
  );
  /*  const apiInfo = await axios.get(url);
  const pokePromises = await axios.all(
    apiInfo.data.results.map((p) => axios.get(p.url))
  );
  axios.spread((data) => {
    console.log(data);
  }); */
  /* const pokemon = pokePromises.map((p) => {
    return {
      id: p.id,
      name: p.name,
      types: p.types.map((type) => type["type"]["name"]),
      sprites: p.sprites.other["official-artwork"].front_default,
    };
  }); */
  const dataServer = await Promise.all(
    data.results.map(async (e) => (await axios.get(e.url)).data)
  );

  const pokemonsFromApi = dataServer.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1),
    types: pokemon.types.map(
      (type) =>
        type["type"]["name"].charAt(0).toUpperCase() +
        type["type"]["name"].substring(1)
    ),
    sprites: pokemon.sprites.other["official-artwork"].front_default,
  }));
  const pokemonsFromDb = await getFromDb();
  return pokemonsFromDb
    ? [...pokemonsFromApi, ...pokemonsFromDb]
    : pokemonsFromApi;
};

const getAllPokemons = async (req, res, next) => {
  try {
    const {name} = req.query;
    if (name) {
      const pokemonFounded = await (
        await getFromDb()
      ).find((el) => el.name === name);
      if (pokemonFounded) {
        return res.send({
          id: pokemonFounded.id,
          name: pokemonFounded.name,
          types: pokemonFounded.types.map((type) => type.type_name),
          sprites: pokemonFounded.sprites,
        });
      } else {
        const {data} = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        return res.send({
          id: data.id,
          name: data.name,
          types: data.types.map(
            (type) =>
              type["type"]["name"].charAt(0).toUpperCase() +
              type["type"]["name"].substring(1)
          ),
          sprites:
            data.sprites.versions["generation-v"]["black-white"].animated
              .front_default ??
            data.sprites.other["official-artwork"].front_default,
          //change official-artworl to home to get a diferrent picture
        });
      }
    }
    const pokemons = await allPokemonsMerge();
    if (pokemons instanceof Error) throw pokemons;
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
};
const getOnePokemonById = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (id.toString().includes("-")) {
      const pokemonFounded = await Pokemon.findByPk(id, {include: Types});
      console.log("Founded==>", pokemonFounded.stats);
      if (pokemonFounded) {
        return res.send({
          id: pokemonFounded.id,
          name:
            pokemonFounded.name.charAt(0).toUpperCase() +
            pokemonFounded.name.substring(1),
          stats: {
            hp: pokemonFounded.hp,
            attack: pokemonFounded.attack,
            defense: pokemonFounded.defense,
            speed: pokemonFounded.speed,
            height: pokemonFounded.height,
            weight: pokemonFounded.weight,
          },
          types: pokemonFounded.types.map(
            (type) =>
              type.type_name.charAt(0).toUpperCase() +
              type.type_name.substring(1)
          ),
          sprites: pokemonFounded.sprites,
        });
      }
    }
    const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!data) throw new Error("Pokemon not found");
    res.json({
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.substring(1),
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        speed: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
      },
      types: data.types.map(
        (type) =>
          type["type"]["name"].charAt(0).toUpperCase() +
          type["type"]["name"].substring(1)
      ),
      sprites:
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default ??
        data.sprites.other["official-artwork"].front_default,
    });
  } catch (error) {
    next(error);
  }
};

const addPokemon = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length < 8)
      throw new Error("All parameters must be sent");

    const {name, hp, attack, defense, speed, height, weight, types, sprites} =
      req.body;

    const newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      sprites: sprites || DEFAULT_IMAGE,
    });
    const matchTypes = await Types.findAll({where: {type_name: types}});
    const petition = await newPokemon.addTypes(matchTypes);

    res.send(petition);
  } catch (error) {
    next(error);
  }
};

const delPokemon = async (req, res, next) => {
  try {
    const {id} = req.params;
    if (!id.toString().includes("-"))
      throw new Error("Id must be a database id type");
    const petition = await Pokemon.destroy({where: {id}, include: Types});
    if (!petition) throw new Error("Pokemon not found");
    res.send({message: "Pokemon deleted succesfully"});
  } catch (error) {
    next(error);
  }
};
/* ------------------------------- WORKING IN ------------------------------- */
const updatePokemon = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {name, hp, attack, defense, speed, height, weight, types, sprites} =
      req.body;
    await Pokemon.removeTypes({where: {id}});
    await Pokemon.update(
      {name, hp, attack, defense, speed, height, weight, types, sprites},
      {where: {id}}
    );
    const matchTypes = await Types.findAll({where: {type_name: types}});
    const petition = await newPokemon.addTypes(matchTypes);
    res.send(petition);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPokemons,
  getOnePokemonById,
  addPokemon,
  delPokemon,
  updatePokemon,
};
