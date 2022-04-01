const {Types} = require("../db");

const getAllTypes = async (req, res, next) => {
    try {
        const petition = await Types.findAll({});
        const upper = petition.map(({dataValues}) => {
            return {
                ...dataValues,
                type_name:
                    dataValues.type_name.charAt(0).toUpperCase() +
                    dataValues.type_name.slice(1),
            };
        });

        if (!petition.length) throw new Error("Cant get data from database");

        res.send(upper);
    } catch (error) {
        next(error);
    }
};
module.exports = {getAllTypes};
