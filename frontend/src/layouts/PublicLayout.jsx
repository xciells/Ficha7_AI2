import React from 'react';
import NavBar from '../components/NavBar';

function PublicLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="container mt-4">{children}</div>
    </>
  );
}

export default PublicLayout;
