import React, { useEffect, useState } from 'react';
import api from '../api/api';
import FilmeCard from '../components/FilmeCard';

function ListarFilmes() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const response = await api.get('/filmes/list');
        setFilmes(response.data);
      } catch (err) {
        console.error('Erro ao carregar filmes:', err);
      }
    }

    carregarFilmes();
  }, []);

  return (
    <div className="container text-center">
      <h3>Todos os Filmes</h3><br />
      <div className="row">
        {filmes.map(filme => (
          <FilmeCard key={filme.id} filme={filme} />
        ))}
      </div>
    </div>
  );
}

export default ListarFilmes;
