const { sequelize, Filme, Genero } = require('./models');
const user = require('./models/user');

sequelize.sync({ force: false })
  .then(() => {
    console.log('📦 Base de dados sincronizada com sucesso.');
  })
  .catch((err) => {
    console.error('❌ Erro ao sincronizar:', err);
  });
