const {default: axios} = require("axios");
const {Types} = require("../db");

const getAllTypes = async (req, res, next) => {
  try {
    const petition = await Types.findAll({});
    if (!petition.length) throw new Error("Cant get data from database");
    res.send(petition);
  } catch (error) {
    next(error);
  }
};
module.exports = {getAllTypes};
