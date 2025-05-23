const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');


const Genero = sequelize.define('Genero', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Genero;
