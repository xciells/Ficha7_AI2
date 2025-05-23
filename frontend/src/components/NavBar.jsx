// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-inverse navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">MovieFans</Link>
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#mainNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/filmes">Filmes</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/login"><span className="glyphicon glyphicon-log-in"></span> Administrador</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
