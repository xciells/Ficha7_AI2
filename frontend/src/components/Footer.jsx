import React from 'react';

function Footer() {
  return (
    <footer className="container-fluid text-center">
      <p>
        <img src="/images/logo_black.png" alt="logo MovieFans" width="20%" />
      </p>
      <p>
        <a href="#top">
          <button type="button" className="btn btn-default btn-sm">
            <span className="glyphicon glyphicon-circle-arrow-up"></span> Voltar ao topo
          </button>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
