const {default: axios} = require("axios");
const {Pokemon, Types} = require("../db");
const DEFAULT_IMAGE =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f4ada126-ebc6-4d66-9554-908abb7d6eae/d9n0y7l-b28bbb02-9c6c-4d13-88be-33a735ab17cd.jpg/v1/fill/w_1024,h_748,q_75,strp/whos_that_pokemon_by_desenhosdoreu_d9n0y7l-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzQ4IiwicGF0aCI6IlwvZlwvZjRhZGExMjYtZWJjNi00ZDY2LTk1NTQtOTA4YWJiN2Q2ZWFlXC9kOW4weTdsLWIyOGJiYjAyLTljNmMtNGQxMy04OGJlLTMzYTczNWFiMTdjZC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.EL5j7wp8AiNAOcCeW0NwTaH1o2xPGABf8z78sH9uFR0";

const getAllPokemons = async () => {
  try {
    const pokemonsApi = await getApiPokemons();
    const pokemonsDb = await getDbPokemons();
    return [...pokemonsApi, ...pokemonsDb];
  } catch (e) {
    console.error(e);
  }
};
const getApiPokemons = async () => {
  const {results} = (
    await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30")
  ).data;
  const prom = await Promise.all(results.map((e) => axios.get(e.url)));
  return prom.map(({data}) => {
    return {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.substring(1),
      attack: data.stats[1].base_stat,
      types: data.types.map(
        (type) =>
          type["type"]["name"].charAt(0).toUpperCase() +
          type["type"]["name"].substring(1)
      ),
      sprites:
      data.sprites.other["dream_world"].front_default ||
      data.sprites.other["official-artwork"].front_default,
    };
  });
};
const getDbPokemons = async () => {
  const dbData = await Pokemon.findAll({
    include: [{model: Types, attributes: ["type_name"]}],
  });
  return dbData.map(({dataValues}) => {
    return {
      id: dataValues.id,
      attack: dataValues.attack,
      name:
        dataValues.name.substring(0, 1).toUpperCase() +
        dataValues.name.substring(1),
      types: dataValues.types.map(
        ({dataValues}) =>
          dataValues.type_name.substring(0, 1).toUpperCase() +
          dataValues.type_name.substring(1)
      ),
      sprites: dataValues.sprites,
    };
  });
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
    } else {
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
              data.sprites.other["dream_world"].front_default ||
              data.sprites.other["official-artwork"].front_default,
      });
    }
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
      const typesInLower=types.map(e=>e.toLowerCase());
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
    const matchTypes = await Types.findAll({where: {type_name: typesInLower}});
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
  getDbPokemons,
  updatePokemon,
};
