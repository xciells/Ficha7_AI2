// src/views/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../api/api';


function Login() {
  const [credenciais, setCredenciais] = useState({ username: '', password: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciais({ ...credenciais, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', credenciais);

      // salva token, username e id no localStorage
      localStorage.setItem('user', JSON.stringify({
        token: response.data.token,
        username: response.data.username,
        id: response.data.id
      }));

      navigate('/backoffice');
    } catch (err) {
      console.error('Erro no login:', err);
      setErro('Login inválido. Verifique seu nome de usuário e senha.');
    }
  };

  return (
    <div className="container text-center" style={{ maxWidth: '300px' }}>
      <h3>Login de Administrador</h3>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Usuário</label>
          <input
            type="text"
            name="username"
            className="form-control"
            onChange={handleChange}
            value={credenciais.username}
            required
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={credenciais.password}
            autoComplete="current-password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Entrar</button>
        
        <Link to="/register" className="btn btn-danger mt-3">Registar-se</Link>
      
      </form>
    </div>
  );
}

export default Login;
