const { Filme, Genero } = require('../models');

module.exports = {
  async listar(req, res) {
    try {
      const filmes = await Filme.findAll({ include: Genero });
      res.json(filmes);
    } catch (err) {
      console.error('Erro ao listar filmes:', err);
      res.status(500).json({ erro: 'Erro ao listar filmes' });
    }
  },

  async detalhar(req, res) {
  try {
    const { id } = req.params;
    const filme = await Filme.findByPk(id, { include: Genero });

    if (!filme) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    res.json(filme);
  } catch (err) {
    console.error('Erro ao obter filme:', err);
    res.status(500).json({ erro: 'Erro interno ao obter filme' });
  }
},


  async criar(req, res) {
    try {
      const novo = await Filme.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar filme:', err);
      res.status(400).json({ erro: 'Erro ao criar filme' });
    }
  },

  async atualizar(req, res) {
  try {
    const { id } = req.params;
    const [atualizados] = await Filme.update(req.body, { where: { id } });

    if (atualizados === 0) {
      return res.status(404).json({ erro: 'Filme não encontrado ou sem alterações' });
    }

    res.status(200).json({ mensagem: 'Filme atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar filme:', err);
    res.status(500).json({ erro: 'Erro interno ao atualizar filme' });
  }
},

async apagar(req, res) {
  try {
    const { id } = req.params;
    const filme = await Filme.findByPk(id);
    if (!filme) {
      return res.status(404).json({ erro: 'Filme não encontrado' });
    }

    await filme.destroy();
    res.sendStatus(204); // No content
  } catch (err) {
    console.error('Erro ao apagar filme:', err);
    res.status(500).json({ erro: 'Erro ao apagar filme' });
  }
}

};
