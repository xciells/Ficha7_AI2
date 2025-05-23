// src/views/backoffice/CriarFilme.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

function CriarFilme() {
  const navigate = useNavigate();
  const [generos, setGeneros] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    foto: '',
    generoId: '',
    destaque: false,
    carrossel: false
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregarGeneros() {
      try {
        const res = await api.get('/generos/list');
        setGeneros(res.data);
      } catch (err) {
        console.error('Erro ao carregar gêneros:', err);
      }
    }
    carregarGeneros();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/filmes/create', form);
      navigate('/backoffice/filmes');
    } catch (err) {
      console.error('Erro ao criar filme:', err);
      setErro('Erro ao criar filme. Verifique os campos.');
    }
  };

  return (
    <div className="container">
      <h2>Adicionar Filme</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Descrição</label>
          <textarea name="descricao" value={form.descricao} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Foto (URL)</label>
          <input name="foto" value={form.foto} onChange={handleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Gênero</label>
          <select name="generoId" value={form.generoId} onChange={handleChange} className="form-control" required>
            <option value="">-- Selecione --</option>
            {generos.map(gen => (
              <option key={gen.id} value={gen.id}>{gen.descricao}</option>
            ))}
          </select>
        </div>
        <div className="form-check">
          <input type="checkbox" name="carrossel" checked={form.carrossel} onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">Exibir no carrossel</label>
        </div>
        <div className="form-check">
          <input type="checkbox" name="destaque" checked={form.destaque} onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">Exibir em destaque</label>
        </div>
        <button className="btn btn-success mt-3" type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default CriarFilme;
