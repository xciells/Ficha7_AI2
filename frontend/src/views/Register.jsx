import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/users/register', form);
      setSucesso(res.data.mensagem || 'Usuário criado com sucesso.');
      setErro('');
      setForm({ username: '', email: '', senha: '' });

      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      console.error('Erro ao registrar:', err);
      setErro(err.response?.data?.erro || 'Erro ao registrar.');
      setSucesso('');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Usuário</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      {sucesso && <div className="alert alert-success">{sucesso}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input name="username" value={form.username} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Senha:</label>
          <input type="password" name="senha" value={form.senha} onChange={handleChange} className="form-control" required />
        </div>
        <button className="btn btn-success mt-3">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
