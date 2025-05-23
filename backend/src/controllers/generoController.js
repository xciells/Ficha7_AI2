const { Genero } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const generos = await Genero.findAll();
      res.json(generos);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar gêneros' });
    }
  },

  async detalhar(req, res) {
    try {
      const genero = await Genero.findByPk(req.params.id);
      if (genero) res.json(genero);
      else res.status(404).json({ erro: 'Gênero não encontrado' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar gênero' });
    }
  },

  async criar(req, res) {
  try {
    const novo = await Genero.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    console.error('Erro ao criar gênero:', err);
    res.status(400).json({ erro: 'Erro ao criar gênero' });
  }
    },


  async atualizar(req, res) {
    try {
      const [rowsUpdated] = await Genero.update(req.body, { where: { id: req.params.id } });
      if (rowsUpdated === 0) return res.status(404).json({ erro: 'Gênero não encontrado' });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao atualizar gênero' });
    }
  },

  async apagar(req, res) {
    try {
      const rowsDeleted = await Genero.destroy({ where: { id: req.params.id } });
      if (rowsDeleted === 0) return res.status(404).json({ erro: 'Gênero não encontrado' });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao apagar gênero' });
    }
  }
};
