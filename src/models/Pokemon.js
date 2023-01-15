const { DataTypes, STRING } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hp: {
        type: DataTypes.INTEGER,
      },
      attack: {
        type: DataTypes.INTEGER,
      },
      defense: {
        type: DataTypes.INTEGER,
      },
      special_attack: {
        type: DataTypes.INTEGER,
      },
      special_defense: {
        type: DataTypes.INTEGER,
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      types1: {
        type: DataTypes.STRING,
      },
      types2: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
