require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log('📦 Conexão com PostgreSQL estabelecida!'))
  .catch((err) => console.error('❌ Erro ao conectar ao PostgreSQL:', err));

module.exports = sequelize;
