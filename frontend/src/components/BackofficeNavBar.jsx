import React from 'react';
import { Link } from 'react-router-dom';

function BackofficeNavBar() {
  
  return (
    <nav className="navbar navbar-inverse navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/backoffice">MovieFans (Backoffice)</Link>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#BackoffNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        
        <div className="collapse navbar-collapse" id="BackoffNavbar">
        <ul className="nav navbar-nav">
          <li><Link to="/backoffice">Dashboard</Link></li>
          <li><Link to="/backoffice/filmes">Gerir Filmes</Link></li>
          <li><Link to="/backoffice/generos">Gerir Géneros</Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <button className="btn btn-danger btn-sm" onClick={() => {
            localStorage.removeItem('user');
            window.location.href = '/';
          }}>
            Sair
          </button>
          </li>
        </ul>
        </div>
      </div>
    </nav>
  );
}

export default BackofficeNavBar;