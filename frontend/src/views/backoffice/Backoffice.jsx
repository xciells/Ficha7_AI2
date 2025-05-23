import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

function Backoffice() {
  const [filmes, setFilmes] = useState(0);
  const [generos, setGeneros] = useState(0);
  const [usuarios, setUsuarios] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarDados() {
      try {
        const [f, g, u] = await Promise.all([
          api.get('/filmes/list'),
          api.get('/generos/list'),
          api.get('/users/list')
        ]);
        setFilmes(f.data.length);
        setGeneros(g.data.length);
        setUsuarios(u.data.length);
      } catch (err) {
        console.error('Erro ao carregar dados do backoffice:', err);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="text-center">Bem-vindo, {user?.username}!</h3>
      <p className="text-center">Veja abaixo as estatísticas gerais do sistema.</p>

      <br /><br />

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#e9f2fb', border: '2px solid #007bff' }}>
            <h4 className="text-primary">🎬 Filmes</h4>
            <h2 className="my-3">{filmes}</h2>
            <p>Total de filmes cadastrados</p>
            <button className="btn btn-primary" onClick={() => navigate('/backoffice/filmes')}>
              Gerir Filmes
            </button>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="p-4 rounded shadow-sm text-center" style={{ backgroundColor: '#eafbea', border: '2px solid #28a745' }}>
            <h4 className="text-success">📚 Gêneros</h4>
            <h2 className="my-3">{generos}</h2>
            <p>Total de gêneros cadastrados</p>
            <button className="btn btn-success" onClick={() => navigate('/backoffice/generos')}>
              Gerir Gêneros
            </button>
          </div>
        </div>
      </div>

      <br /><br />

      <div className="text-center text-muted mt-4">
        <p>👤 Total de usuários registrados: <strong>{usuarios}</strong></p>
      </div>
    </div>
  );
}

export default Backoffice;
