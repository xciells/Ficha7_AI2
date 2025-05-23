// src/components/FilmesDestaque.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';

function FilmesDestaque() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function carregarDestaques() {
      try {
        const response = await api.get('/filmes/list');
        const apenasDestaques = response.data.filter(f => f.destaque);
        setFilmes(apenasDestaques.slice(0, 6)); // Limita a 6
      } catch (err) {
        console.error('Erro ao carregar destaques:', err);
      }
    }

    carregarDestaques();
  }, []);

  if (filmes.length === 0) return null;

  return (
    <div className="container text-center">
      <h3>Filmes em destaque</h3><br />
      <div className="row">
        {filmes.map((filme, index) => (
          <div className="col-sm-4" key={index}><Link to={`/filmes/${filme.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={filme.foto} alt={filme.titulo} className="img-responsive" style={{ width: '100%' }} />
            <p>{filme.titulo}</p></Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilmesDestaque;
