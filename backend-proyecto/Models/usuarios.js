const { DataTypes } = require("sequelize");
const sequelize = require('../db/Connection');


const Usuarios = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  contraseña: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: "usuarios",
  timestamps: false,
});

module.exports = Usuarios;
