import React from 'react';
import { Link } from 'react-router-dom';

function FilmeCard({ filme }) {
  return (
    <div className="col-sm-4 mb-4">
      <Link to={`/filmes/${filme.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img
          src={filme.foto}
          alt={filme.titulo}
          className="img-responsive"
          style={{ width: '100%' }}
        />
        <p>{filme.titulo}</p>
      </Link>
    </div>
  );
}

export default FilmeCard;
