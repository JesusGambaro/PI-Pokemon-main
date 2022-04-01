const {default: axios} = require("axios");
const {Pokemon, Types} = require("../db");
const DEFAULT_IMAGE ="https://c.tenor.com/FoeHB1WMoVUAAAAd/whos-that-pokemon-charmander.gif";
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
    try {
        const {results} = (
            await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=40")
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
    } catch (e) {
        return e;
    }
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
            } else {
                throw {message: "Pokemon not exist", status: 404};
            }
        } else {
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
        if (error.response)
            next({message: error.response.statusText, status: error.response.status});
        else next(error);
    }
};

const addPokemon = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length < 8)
            throw  {message: "All parameters must be sent", status: 400};//Verificado en el front

        const {name, hp, attack, defense, speed, height, weight, types, sprites} =
            req.body;
        const typesInLower = types.map(e => e.toLowerCase());
        const newPokemon = await Pokemon.create({
                name,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                sprites: sprites || DEFAULT_IMAGE,
            })
        ;
        const matchTypes = await Types.findAll({where: {type_name: typesInLower}});
        const linkedTypes = await newPokemon.addTypes(matchTypes);
        res.send(linkedTypes);
    } catch (error) {
        next(error);
    }
};

const delPokemon = async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!id.toString().includes("-"))
            throw new {message: "Id must be a database id type", status: 206};//Innecesario

        const pokemonDel = await Pokemon.destroy({where: {id}, include: Types});
        if (!pokemonDel) throw {message: "Pokemon not found", status: 404};
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
