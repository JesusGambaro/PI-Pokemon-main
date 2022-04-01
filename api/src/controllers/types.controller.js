const {Type} = require("../db");

const getAllTypes = async (req, res, next) => {
  try {
    const dbTypes = await Type.findAll({});
    const upper = dbTypes.map(({dataValues}) => {
      return {
        ...dataValues,
        type_name:
          dataValues.type_name.charAt(0).toUpperCase() +
          dataValues.type_name.slice(1),
      };
    });

    if (!dbTypes.length) throw new Error("Can't get data from database");
    res.send(upper);
  } catch (error) {
    next(error);
  }
};
module.exports = {getAllTypes};
