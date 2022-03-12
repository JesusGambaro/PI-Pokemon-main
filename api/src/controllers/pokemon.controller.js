const {default: axios} = require("axios");
const {json} = require("body-parser");
const {Pokemon, Types} = require("../db");

const getAllPokemons = async (req, res, next) => {
    try {
        const {name} = req.query;
        if (name) {
            const pokemon = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            res.send(pokemon.data);
        } else {
            const {data} = await axios.get("https://pokeapi.co/api/v2/pokemon");
            if (!data.results.length) throw new Error();
            res.json(data.results);
        }
    } catch (error) {
        next(error);
    }
};
const getOnePokemonById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!data) throw new Error();
        res.json({
            id: data.id,
            name: data.name,
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getAllTypes = async (req, res, next) => {
    try {
        const {data} = await axios.get("https://pokeapi.co/api/v2/type");
        if (!data.results.length) throw new Error();

        const exist = await Types.findAll();
        if (exist.length > 0) return res.end();
        const types = data.results.map((type) => type.name);

        for (const type_name of types) {
            await Types.create(
                {type_name},
                {fields: ["type_name"], restartIdentity: true}
            );
        }

        res.send(types);
    } catch (error) {
        next(error);
    }
};
const addPokemon = async (req, res, next) => {
    try {
        if (Object.keys(req.body).length < 7) throw new Error();
        const {name, hp, attack, defense, speed, height, weight, types} = req.body;
        const pokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
        });
        const typos = await Types.findAll({where: {type_name: types}});
        await typos.forEach((type) => pokemon.addTypes(type));
        res.send(pokemon);
    } catch (error) {
        next(error);
    }
};
const delPokemon = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
};
const updatePokemon = async (req, res, next) => {
    try {
        res.send("pepe");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPokemons,
    getOnePokemonById,
    getAllTypes,
    addPokemon,
    delPokemon,
    updatePokemon,
};
