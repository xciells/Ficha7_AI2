const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');



const Filme = sequelize.define('Filme', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  foto: {
    type: DataTypes.STRING
  },
  generoId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Generos',
      key: 'id'
    }
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  carrossel: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Filme;
