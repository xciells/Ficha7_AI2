import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Link, Navigate } from 'react-router-dom';

function GerirFilmes() {
  const [filmes, setFilmes] = useState([]);
  const [erro, setErro] = useState('');
  const [ordenarPor, setOrdenarPor] = useState(null);
  const [ascendente, setAscendente] = useState(true);
  const [autenticado, setAutenticado] = useState(true);

  useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.token) {
      setAutenticado(false);
    } else {
      carregarFilmes();
    }
  }, []);

  const carregarFilmes = async () => {
    try {
      const response = await api.get('/filmes/list'); // rota pública
      setFilmes(response.data);
    } catch (err) {
      console.error('Erro ao carregar filmes:', err);
      setErro('Erro ao carregar filmes: ' + err.message);
    }
  };

  const deletarFilme = async (id) => {
    try {
      await api.delete(`/filmes/delete/${id}`);
      setFilmes(filmes.filter(f => f.id !== id));
    } catch (err) {
      console.error('Erro ao deletar:', err);
      setErro('Erro ao apagar filme.');
    }
  };

  const toggleCampo = async (filme, campo) => {
    try {
      const atualizado = { ...filme, [campo]: !filme[campo] };
      await api.put(`/filmes/update/${filme.id}`, atualizado);

      setFilmes(filmes.map(f =>
        f.id === filme.id ? { ...f, [campo]: !f[campo] } : f
      ));
    } catch (err) {
      console.error(`Erro ao atualizar campo ${campo}:`, err);
      setErro('Erro ao atualizar filme.');
    }
  };

  const ordenar = (campo) => {
    const novaOrdem = campo === ordenarPor ? !ascendente : true;
    const ordenados = [...filmes].sort((a, b) => {
      const valorA = a[campo] ?? '';
      const valorB = b[campo] ?? '';

      if (campo === 'Genero') {
        return novaOrdem
          ? (a.Genero?.descricao || '').localeCompare(b.Genero?.descricao || '')
          : (b.Genero?.descricao || '').localeCompare(a.Genero?.descricao || '');
      }

      if (typeof valorA === 'boolean') {
        return novaOrdem ? valorB - valorA : valorA - valorB;
      }

      return novaOrdem ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    });

    setFilmes(ordenados);
    setOrdenarPor(campo);
    setAscendente(novaOrdem);
  };

  const seta = (campo) => {
    if (ordenarPor !== campo) return '';
    return ascendente ? ' ▲' : ' ▼';
  };

  // Proteção de rota
  if (!autenticado) return <Navigate to="/login" replace />;

  return (
    <div className="container">
      <h2>Gerir Filmes</h2>
      {erro && <div className="alert alert-danger">{erro}</div>}
      <Link to="/backoffice/filmes/novo" className="btn btn-success">+ Adicionar Filme</Link>

      {filmes.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th onClick={() => ordenar('titulo')} style={{ cursor: 'pointer' }}>Título{seta('titulo')}</th>
              <th onClick={() => ordenar('Genero')} style={{ cursor: 'pointer' }}>Gênero{seta('Genero')}</th>
              <th onClick={() => ordenar('carrossel')} style={{ cursor: 'pointer' }}>Carrossel{seta('carrossel')}</th>
              <th onClick={() => ordenar('destaque')} style={{ cursor: 'pointer' }}>Destaque{seta('destaque')}</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.map(filme => (
              <tr key={filme.id}>
                <td>{filme.titulo}</td>
                <td>{filme.Genero?.descricao || '—'}</td>
                <td>
                  <button
                    className={`btn btn-sm ${filme.carrossel ? 'btn-success' : 'btn-secondary'}`}
                    onClick={() => toggleCampo(filme, 'carrossel')}
                  >
                    {filme.carrossel ? 'Sim' : 'Não'}
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${filme.destaque ? 'btn-warning' : 'btn-secondary'}`}
                    onClick={() => toggleCampo(filme, 'destaque')}
                  >
                    {filme.destaque ? 'Sim' : 'Não'}
                  </button>
                </td>
                <td>
                  <Link to={`/backoffice/filmes/${filme.id}`} className="btn btn-primary btn-sm">Editar</Link>{' '}
                  <button onClick={() => deletarFilme(filme.id)} className="btn btn-danger btn-sm">Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GerirFilmes;
