// src/views/backoffice/GerirGeneros.jsx
import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Navigate } from 'react-router-dom';

function GerirGeneros() {
  const [generos, setGeneros] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editarId, setEditarId] = useState(null);
  const [ordenarPor, setOrdenarPor] = useState(null);
  const [ascendente, setAscendente] = useState(true);
  const [autenticado, setAutenticado] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.token) {
      setAutenticado(false);
    } else {
      carregarGeneros(); 
    }
  }, []);

  const carregarGeneros = async () => {
    try {
      const response = await api.get('/generos/list');
      setGeneros(response.data);
    } catch (err) {
      console.error('Erro ao carregar géneros:', err);
      setMensagem('Erro ao carregar géneros: ' + err.message);
    }
  };

  const apagarGenero = async (id) => {
    try {
      await api.delete(`/generos/delete/${id}`);
      setGeneros(generos.filter(g => g.id !== id));
      setMensagem('Género apagado com sucesso.');
    } catch (err) {
      setMensagem('Não é possível apagar este género. Verifique se há filmes associados.');
    }
  };

  const guardarGenero = async () => {
    if (!descricao.trim()) return;
    try {
      if (editarId) {
        await api.put(`/generos/update/${editarId}`, { descricao });
        setMensagem('Género atualizado com sucesso.');
      } else {
        await api.post('/generos/create', { descricao });
        setMensagem('Género criado com sucesso.');
      }
      setDescricao('');
      setEditarId(null);
      carregarGeneros();
    } catch (err) {
      setMensagem('Erro ao guardar género.');
    }
  };

  const editarGenero = (genero) => {
    setDescricao(genero.descricao);
    setEditarId(genero.id);
  };

  const cancelarEdicao = () => {
    setDescricao('');
    setEditarId(null);
    setMensagem('');
  };

  const ordenar = (campo) => {
    const novaOrdem = campo === ordenarPor ? !ascendente : true;
    const ordenados = [...generos].sort((a, b) => {
      const valorA = a[campo] ?? '';
      const valorB = b[campo] ?? '';
      return novaOrdem ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
    });
    setGeneros(ordenados);
    setOrdenarPor(campo);
    setAscendente(novaOrdem);
  };

  const seta = (campo) => {
    if (ordenarPor !== campo) return '';
    return ascendente ? ' ▲' : ' ▼';
  };

  if (!autenticado) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="container">
        <h2>Gerir Géneros</h2>
        {mensagem && <div className="alert alert-info mb-3">{mensagem}</div>}

        <div className="mb-4">
          <div className="mb-3">
            <input
              type="text"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Nome do género"
              className="form-control"
            />
          </div>
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-success" onClick={guardarGenero}>
              {editarId ? 'Atualizar' : '+ Criar'} Género
            </button>
            {editarId && <button className="btn btn-secondary" onClick={cancelarEdicao}>Cancelar</button>}
          </div>
        </div>

        {generos.length === 0 ? (
          <p>Nenhum género encontrado.</p>
        ) : (
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th onClick={() => ordenar('descricao')} style={{ cursor: 'pointer' }}>Descrição{seta('descricao')}</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {generos.map(genero => (
                <tr key={genero.id}>
                  <td>{genero.descricao}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button onClick={() => editarGenero(genero)} className="btn btn-primary btn-sm">Editar</button>
                      <button onClick={() => apagarGenero(genero.id)} className="btn btn-danger btn-sm">Apagar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default GerirGeneros;
