import React from 'react';
import BackofficeNavBar from '../components/BackofficeNavBar';

function BackofficeLayout({ children }) {
  return (
    <>
      <BackofficeNavBar />
      <div className="container mt-4">{children}</div>
    </>
  );
}

export default BackofficeLayout;
