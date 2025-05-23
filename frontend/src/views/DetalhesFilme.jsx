import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

function DetalhesFilme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchFilme() {
      try {
        const res = await api.get(`/filmes/get/${id}`);
        setFilme(res.data);
      } catch (err) {
        console.error('Erro ao buscar filme:', err);
        setErro('Filme não encontrado.');
      }
    }

    fetchFilme();
  }, [id]);

  if (erro) return <p className="text-danger text-center">{erro}</p>;
  if (!filme) return <p className="text-center">Carregando...</p>;

  return (
    <div className="container text-center" style={{ maxWidth: '500px' }}>

        <h3 className="text-center mb-4">{filme.titulo}</h3>
        <br />
        <div className="text-center mb-3">
          <img
            src={filme.foto}
            alt={filme.titulo}
            className="img-fluid rounded"
            style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
          />
        </div>
        <br />
        
        <p><strong>Descrição:</strong> {filme.descricao}</p>
        <p><strong>Gênero:</strong> {filme.Genero?.descricao || 'Não especificado'}</p>

        <br />
        <div className="text-center mt-4">
          <Link to="/filmes" className="btn btn-outline-primary">← Voltar para a lista</Link>
      </div>
    </div>
  );
}

export default DetalhesFilme;
