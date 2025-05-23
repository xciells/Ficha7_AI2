const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'chave-super-secreta'; // ideal: usar process.env.SECRET_KEY

module.exports = {
  async login(req, res) {
  const { username, password } = req.body; 
  const user = await User.findOne({ where: { username } });

  if (!user) return res.status(401).json({ erro: 'Usuário não encontrado' });

  const valido = await bcrypt.compare(password, user.senha); 
  if (!valido) return res.status(401).json({ erro: 'Senha incorreta' });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({
    token,
    id: user.id,
    username: user.username
  });
  },

  async registar(req, res) {
    const { username, senha, email } = req.body;

    try {
      const existing = await User.findOne({ where: { username } });
      if (existing) return res.status(400).json({ erro: 'Usuário já existe' });

      const hashed = await bcrypt.hash(senha, 10);
      const novo = await User.create({ username, senha: hashed, email });

      res.status(201).json({ mensagem: 'Usuário criado com sucesso', user: novo });
    } catch (err) {
      console.error('Erro ao registrar:', err);
      res.status(500).json({ erro: 'Erro ao registrar usuário' });
    }
  },

  async listar(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'createdAt']
      });
      res.json(users);
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  },

  async detalhar(req, res) {
    try {
      const user = await User.findByPk(req.params.id, {
        attributes: ['id', 'username', 'email', 'createdAt']
      });
      if (user) res.json(user);
      else res.status(404).json({ erro: 'Usuário não encontrado' });
    } catch (err) {
      res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
  },

  async apagar(req, res) {
    try {
      const rowsDeleted = await User.destroy({ where: { id: req.params.id } });
      if (rowsDeleted === 0) return res.status(404).json({ erro: 'Usuário não encontrado' });
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao apagar usuário' });
    }
  }
};
