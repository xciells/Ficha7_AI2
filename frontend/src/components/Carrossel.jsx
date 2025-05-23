import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function Carrossel() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function carregarCarrossel() {
      try {
        const response = await api.get('/filmes/list');
        const apenasCarrossel = response.data.filter(f => f.carrossel);
        setFilmes(apenasCarrossel);
      } catch (err) {
        console.error('Erro ao carregar carrossel:', err);
      }
    }

    carregarCarrossel();
  }, []);

  if (filmes.length === 0) return null;

  return (
    <div className="container text-center">
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      <ol className="carousel-indicators">
        {filmes.map((_, i) => (
          <li key={i} data-target="#myCarousel" data-slide-to={i} className={i === 0 ? 'active' : ''}></li>
        ))}
      </ol>

      <div className="carousel-inner" role="listbox">
        {filmes.map((filme, i) => (
          <div key={filme.id} className={`item ${i === 0 ? 'active' : ''}`}>
            <Link to={`/filmes/${filme.id}`}>
              <img src={filme.foto} alt={filme.titulo} />
              <div className="carousel-overlay"></div>
              <div className="carousel-caption">
                <h3>{filme.titulo}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <a className="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left"></span>
      </a>
      <a className="right carousel-control" href="#myCarousel" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right"></span>
      </a>
    </div></div>
  );
}

export default Carrossel;
