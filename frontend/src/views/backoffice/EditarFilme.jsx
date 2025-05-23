// src/views/backoffice/EditarFilme.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

function EditarFilme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [filmeRes, generosRes] = await Promise.all([
          api.get(`/filmes/get/${id}`),
          api.get('/generos/list')
        ]);
        setFilme(filmeRes.data);
        setGeneros(generosRes.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setErro('Erro ao carregar filme ou gêneros');
      }
    }

    fetchData();
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFilme({ ...filme, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.put(`/filmes/update/${id}`, filme);
      navigate('/backoffice/filmes');
    } catch (err) {
      console.error('Erro ao atualizar filme:', err);
      setErro('Erro ao atualizar filme');
    }
  };

  if (!filme) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2>Editar Filme</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input className="form-control" name="titulo" value={filme.titulo} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea className="form-control" name="descricao" value={filme.descricao} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Foto (URL)</label>
          <input className="form-control" name="foto" value={filme.foto} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Gênero</label>
          <select className="form-control" name="generoId" value={filme.generoId || ''} onChange={handleChange} required>
            <option value="">Selecione um gênero</option>
            {generos.map(g => (
              <option key={g.id} value={g.id}>{g.descricao}</option>
            ))}
          </select>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="carrossel" checked={filme.carrossel} onChange={handleChange} />
          <label className="form-check-label">Mostrar no Carrossel</label>
        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="destaque" checked={filme.destaque} onChange={handleChange} />
          <label className="form-check-label">Mostrar como Destaque</label>
        </div>

        <button className="btn btn-primary mt-3" type="submit">Atualizar Filme</button>
      </form>
    </div>
  );
}

export default EditarFilme;
