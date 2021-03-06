const {DataTypes} = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      hp: {
        type: DataTypes.INTEGER,
        //allowNull: false
      },
      attack: {
        type: DataTypes.INTEGER,
        //allowNull: false
      },
      defense: {
        type: DataTypes.INTEGER,
        //allowNull: false
      },
      speed: {
        type: DataTypes.INTEGER,
        //allowNull: false
      },
      height: {
        type: DataTypes.INTEGER,
        //allowNull: false
      },
      weight: {
        type: DataTypes.INTEGER,
        //allowNull: false
      },
      sprites: {
        type: DataTypes.TEXT,
        //allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
