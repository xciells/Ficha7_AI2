// src/App.js
import React from 'react';
import './assets/css/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import PublicLayout from './layouts/PublicLayout';
import BackofficeLayout from './layouts/BackofficeLayout';

import Home from './views/Home';
import Sobre from './views/Sobre';
import ListarFilmes from './views/ListarFilmes';
import DetalhesFilme from './views/DetalhesFilme';
import Login from './views/Login';
import Register from './views/Register';

import Backoffice from './views/backoffice/Backoffice';
import GerirFilmes from './views/backoffice/GerirFilmes';
import CriarFilme from './views/backoffice/CriarFilme';
import EditarFilme from './views/backoffice/EditarFilme';
import GerirGeneros from './views/backoffice/GerirGeneros';

function App() {
  return (
    <Router>
      <Routes>

        {/* Layout Público */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/sobre" element={<PublicLayout><Sobre /></PublicLayout>} />
        <Route path="/filmes" element={<PublicLayout><ListarFilmes /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/filmes/:id" element={<PublicLayout><DetalhesFilme /></PublicLayout>} />

        {/* Layout Privado - Backoffice */}
        <Route path="/backoffice" element={
          <PrivateRoute>
            <BackofficeLayout><Backoffice /></BackofficeLayout>
          </PrivateRoute>
        } />
        <Route path="/backoffice/filmes" element={
          <PrivateRoute>
            <BackofficeLayout><GerirFilmes /></BackofficeLayout>
          </PrivateRoute>
        } />
        <Route path="/backoffice/filmes/novo" element={
          <PrivateRoute>
            <BackofficeLayout><CriarFilme /></BackofficeLayout>
          </PrivateRoute>
        } />
        <Route path="/backoffice/filmes/:id" element={
          <PrivateRoute>
            <BackofficeLayout><EditarFilme /></BackofficeLayout>
          </PrivateRoute>
        } />
        <Route path="/backoffice/generos" element={
          <PrivateRoute>
            <BackofficeLayout><GerirGeneros /></BackofficeLayout>
          </PrivateRoute>
        } />


      </Routes>
    </Router>
  );
}

export default App;
