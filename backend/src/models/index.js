require('dotenv').config();
const sequelize = require('./sequelize');

// Testar conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com PostgreSQL estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao PostgreSQL:', err);
  });

//models
const Filme = require('./filme');
const Genero = require('./genero');
const User = require('./user');
  
//Associações
Filme.belongsTo(Genero, { foreignKey: 'generoId' });
Genero.hasMany(Filme, { foreignKey: 'generoId' });

// Exportar
module.exports = {
  sequelize,
  Filme,
  Genero,
  User
};