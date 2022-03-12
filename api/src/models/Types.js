const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("types", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
