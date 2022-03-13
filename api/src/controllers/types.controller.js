const {default: axios} = require("axios");
const {Types} = require("../db");

const getAllTypes = async (req, res, next) => {
  try {
    if ((await Types.findAll().length) > 0) return res.end(); //Verify if the data alredy exists in the database

    const {data} = await axios.get("https://pokeapi.co/api/v2/type");
    if (!data.results.length) throw new Error("Error retrieving data from API");

    const allTypes = data.results.map((type) => type.name);
    allTypes.forEach(async (type_name) => {
      await Types.create({type_name});
    });

    res.send(allTypes);
  } catch (error) {
    next(error);
  }
};
module.exports = {getAllTypes};
